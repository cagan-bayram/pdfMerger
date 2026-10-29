"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { DropZone, Result, Rejections, useObjectUrl } from "@/components/tool-ui";
import { Stack, type StackItem } from "@/components/stack";
import {
  formatBytes,
  inspectPdf,
  mergePdfs,
  pageRanges,
  totalPages,
  type Rejection,
  type Sheet,
} from "@/lib/merge";

export function Merger() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const [outputName, setOutputName] = useState("merged");
  const [phase, setPhase] = useState<"idle" | "reading" | "merging">("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const { result, publish, clear } = useObjectUrl();
  const busy = phase !== "idle";

  const clearResult = useCallback(() => clear(), [clear]);
  useEffect(() => clearResult, [clearResult]);

  const addFiles = useCallback(
    async (incoming: File[]) => {
      if (incoming.length === 0) return;
      clearResult();
      setRejections([]);
      setPhase("reading");

      const accepted: Sheet[] = [];
      const refused: Rejection[] = [];

      for (const file of incoming) {
        const seen = await inspectPdf(file);
        if ("reason" in seen) {
          refused.push({ name: file.name, reason: seen.reason });
          continue;
        }
        accepted.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          pageCount: seen.pageCount,
        });
      }

      setSheets((current) => [...current, ...accepted]);
      setRejections(refused);
      setPhase("idle");
    },
    [clearResult],
  );

  const merge = async () => {
    clearResult();
    setPhase("merging");
    setProgress({ done: 0, total: sheets.length });
    try {
      const blob = await mergePdfs(sheets, (done, total) =>
        setProgress({ done, total }),
      );
      publish(blob, `${outputName.trim() || "merged"}.pdf`, {
        pages: totalPages(sheets),
      });
    } catch {
      setRejections([
        {
          name: "",
          reason:
            "The merge stopped partway. Remove the file you added last, then try again.",
        },
      ]);
    } finally {
      setPhase("idle");
    }
  };

  const ranges = pageRanges(sheets);
  const pages = totalPages(sheets);

  const items: StackItem[] = sheets.map((sheet, index) => ({
    id: sheet.id,
    name: sheet.name,
    aside: formatBytes(sheet.file.size),
    meta: `${sheet.pageCount} ${sheet.pageCount === 1 ? "page" : "pages"}`,
    position:
      ranges[index].start === ranges[index].end
        ? `p. ${ranges[index].start}`
        : `p. ${ranges[index].start}–${ranges[index].end}`,
    thickness: sheet.pageCount,
  }));

  return (
    <section className="flex flex-col gap-5">
      <DropZone
        accept="application/pdf,.pdf"
        onFiles={(files) => void addFiles(files)}
        title="Drop PDFs here"
      />

      <Rejections items={rejections} />

      <Stack
        items={items}
        heading="Stack"
        summary={
          sheets.length === 0
            ? "empty"
            : `${sheets.length} ${sheets.length === 1 ? "file" : "files"}, ${pages} ${
                pages === 1 ? "page" : "pages"
              }`
        }
        empty="Add two or more PDFs. They merge in the order you set here, top to bottom."
        onReorder={(from, to) => {
          clearResult();
          setSheets((current) =>
            to < 0 || to >= current.length ? current : arrayMove(current, from, to),
          );
        }}
        onRemove={(id) => {
          clearResult();
          setSheets((current) => current.filter((sheet) => sheet.id !== id));
        }}
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-rule pt-4">
        <button
          type="button"
          onClick={() => void merge()}
          disabled={sheets.length < 2 || busy}
          className="rounded-sheet bg-stamp px-5 py-2.5 text-sm font-semibold text-sheet hover:bg-stamp-deep disabled:bg-desk-deep disabled:text-ink-soft"
        >
          {phase === "merging"
            ? `Merging ${progress.done} of ${progress.total}`
            : sheets.length < 2
              ? "Merge PDFs"
              : `Merge ${sheets.length} PDFs`}
        </button>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Save as
          <input
            value={outputName}
            onChange={(event) => setOutputName(event.target.value)}
            spellCheck={false}
            aria-label="Name for the merged file"
            className="w-36 rounded-sheet border border-rule bg-sheet px-2 py-1.5 text-ink"
          />
          .pdf
        </label>

        {sheets.length > 0 && (
          <button
            type="button"
            onClick={() => {
              clearResult();
              setSheets([]);
              setRejections([]);
            }}
            className="text-sm text-ink-soft underline decoration-rule hover:text-ink"
          >
            Clear stack
          </button>
        )}
      </div>

      <Result result={result} verb="Merged" />
    </section>
  );
}
