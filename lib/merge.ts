/**
 * pdf-lib is ~400 kB and nothing needs it until a file is added, so it is
 * imported on first use rather than on first paint. Browsers cache the module
 * after the first call, so later calls pay nothing.
 */
const loadPdfLib = () => import("pdf-lib");

export type Sheet = {
  id: string;
  file: File;
  name: string;
  /** Pages in this document, counted when it was added. */
  pageCount: number;
};

/** A file we could not read, shown in place so the person can act on it. */
export type Rejection = { name: string; reason: string };

const PDF_MAGIC = "%PDF-";

/**
 * Reads just enough of the file to tell whether it is really a PDF, then
 * counts its pages. Extensions lie; the leading bytes are the honest signal.
 */
export async function inspectPdf(
  file: File,
): Promise<{ pageCount: number } | { reason: string }> {
  const head = new Uint8Array(await file.slice(0, 1024).arrayBuffer());
  const headText = new TextDecoder("latin1").decode(head);
  if (!headText.startsWith(PDF_MAGIC)) {
    return { reason: `${file.name} isn't a PDF.` };
  }

  try {
    const { PDFDocument } = await loadPdfLib();
    const doc = await PDFDocument.load(await file.arrayBuffer(), {
      ignoreEncryption: false,
      updateMetadata: false,
    });
    const pageCount = doc.getPageCount();
    if (pageCount === 0) {
      return { reason: `${file.name} has no pages.` };
    }
    return { pageCount };
  } catch (error) {
    const { EncryptedPDFError } = await loadPdfLib();
    if (error instanceof EncryptedPDFError) {
      return {
        reason: `${file.name} is password-protected. Unlock it, then add it again.`,
      };
    }
    return { reason: `${file.name} is damaged and can't be read.` };
  }
}

/**
 * Copies every page of every sheet into one document, in list order.
 * Runs entirely on the main thread in the user's tab — no upload, no server.
 */
export async function mergePdfs(
  sheets: Sheet[],
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const { PDFDocument } = await loadPdfLib();
  const out = await PDFDocument.create();

  for (const [index, sheet] of sheets.entries()) {
    const source = await PDFDocument.load(await sheet.file.arrayBuffer(), {
      ignoreEncryption: false,
      updateMetadata: false,
    });
    const pages = await out.copyPages(source, source.getPageIndices());
    for (const page of pages) out.addPage(page);

    onProgress?.(index + 1, sheets.length);
    // Yield so the progress label repaints between documents.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  // pdf-lib overwrites Producer with its own name at save time, so only
  // Creator is ours to set.
  out.setCreator("Stack PDF");
  out.setModificationDate(new Date());
  const bytes = await out.save();
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const mb = bytes / 1024 / 1024;
  if (mb < 1) return `${Math.round(bytes / 1024)} KB`;
  return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`;
}

/** Where each sheet lands in the merged file: the collation information. */
export function pageRanges(sheets: Sheet[]): { start: number; end: number }[] {
  let cursor = 1;
  return sheets.map((sheet) => {
    const start = cursor;
    cursor += sheet.pageCount;
    return { start, end: cursor - 1 };
  });
}

export function totalPages(sheets: Sheet[]): number {
  return sheets.reduce((sum, sheet) => sum + sheet.pageCount, 0);
}
