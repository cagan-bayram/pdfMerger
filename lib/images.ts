/** Shares pdf-lib's lazy load with lib/merge.ts: neither is needed on first paint. */
const loadPdfLib = () => import("pdf-lib");

export type Picture = {
  id: string;
  file: File;
  name: string;
  width: number;
  height: number;
};

export type PageMode = "a4" | "match";

/** A4 in PDF points. */
const A4_SHORT = 595.28;
const A4_LONG = 841.89;

const JPEG = [0xff, 0xd8, 0xff];
const PNG = [0x89, 0x50, 0x4e, 0x47];

function startsWith(bytes: Uint8Array, signature: number[]): boolean {
  return signature.every((byte, index) => bytes[index] === byte);
}

/** HEIC and friends carry their brand at offset 4, after the box length. */
function isHeif(bytes: Uint8Array): boolean {
  const brand = new TextDecoder("latin1").decode(bytes.slice(4, 12));
  return (
    brand.startsWith("ftyp") &&
    /heic|heix|hevc|heim|heis|hevm|mif1|msf1/.test(brand.slice(4))
  );
}

/**
 * Confirms the browser can actually decode the image and reports its pixel
 * size. Decoding here rather than at conversion time means a file the browser
 * cannot read is refused while the person is still choosing files.
 */
export async function inspectImage(
  file: File,
): Promise<{ width: number; height: number } | { reason: string }> {
  try {
    const bitmap = await createImageBitmap(file);
    const { width, height } = bitmap;
    bitmap.close();
    if (width === 0 || height === 0) {
      return { reason: `${file.name} has no image data.` };
    }
    return { width, height };
  } catch {
    const head = new Uint8Array(await file.slice(0, 16).arrayBuffer());
    if (isHeif(head)) {
      return {
        reason: `${file.name} is a HEIC photo, which this browser cannot read. Safari can, or set iPhone Settings → Camera → Formats to "Most Compatible" and take it again.`,
      };
    }
    return { reason: `${file.name} isn't an image this browser can read.` };
  }
}

/**
 * Re-encodes anything that is not already JPEG or PNG — WebP, GIF, AVIF, or
 * HEIC on a browser that decodes it — because pdf-lib embeds only those two.
 */
async function toEmbeddable(
  file: File,
): Promise<{ bytes: Uint8Array; kind: "jpg" | "png" }> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (startsWith(bytes, JPEG)) return { bytes, kind: "jpg" };
  if (startsWith(bytes, PNG)) return { bytes, kind: "png" };

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no 2d context");
  context.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.92),
  );
  if (!blob) throw new Error("re-encode failed");
  return { bytes: new Uint8Array(await blob.arrayBuffer()), kind: "jpg" };
}

/**
 * One image per page, in list order. Runs entirely in the tab — the pictures
 * are never uploaded, same as the merger.
 */
export async function imagesToPdf(
  pictures: Picture[],
  pageMode: PageMode,
  onProgress?: (done: number, total: number) => void,
): Promise<Blob> {
  const { PDFDocument } = await loadPdfLib();
  const out = await PDFDocument.create();

  for (const [index, picture] of pictures.entries()) {
    const { bytes, kind } = await toEmbeddable(picture.file);
    const image =
      kind === "jpg" ? await out.embedJpg(bytes) : await out.embedPng(bytes);

    if (pageMode === "match") {
      const page = out.addPage([image.width, image.height]);
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
    } else {
      // Portrait or landscape A4 to match the photo, then fit inside it.
      const landscape = image.width > image.height;
      const pageWidth = landscape ? A4_LONG : A4_SHORT;
      const pageHeight = landscape ? A4_SHORT : A4_LONG;
      const page = out.addPage([pageWidth, pageHeight]);
      const scale = Math.min(pageWidth / image.width, pageHeight / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      page.drawImage(image, {
        x: (pageWidth - width) / 2,
        y: (pageHeight - height) / 2,
        width,
        height,
      });
    }

    onProgress?.(index + 1, pictures.length);
    // Yield so the progress label repaints between images.
    await new Promise((resolve) => setTimeout(resolve, 0));
  }

  out.setCreator("Stack PDF");
  out.setModificationDate(new Date());
  const bytes = await out.save();
  return new Blob([bytes as BlobPart], { type: "application/pdf" });
}

export function formatDimensions(picture: Picture): string {
  return `${picture.width} × ${picture.height}`;
}
