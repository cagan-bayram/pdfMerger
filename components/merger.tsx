"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useCallback, useEffect, useRef, useState } from "react";
import { SheetRow } from "@/components/sheet-row";
import {
  formatBytes,
  inspectPdf,
  mergePdfs,
  pageRanges,
  totalPages,
  type Rejection,
  type Sheet,
} from "@/lib/merge";

type Result = { url: string; name: string; size: number; pages: number };

export function Merger() {
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const [outputName, setOutputName] = useState("merged");
  const [phase, setPhase] = useState<"idle" | "reading" | "merging">("idle");
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [result, setResult] = useState<Result | null>(null);
  const [isOver, setIsOver] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const resultUrl = useRef<string | null>(null);

  const clearResult = useCallback(() => {
    if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
    resultUrl.current = null;
    setResult(null);
  }, []);

  // Release the last blob when the page goes away.
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    clearResult();
    setSheets((current) => {
      const from = current.findIndex((sheet) => sheet.id === active.id);
      const to = current.findIndex((sheet) => sheet.id === over.id);
      return from === -1 || to === -1 ? current : arrayMove(current, from, to);
    });
  };

  const move = (index: number, direction: -1 | 1) => {
    clearResult();
    setSheets((current) => {
      const to = index + direction;
      if (to < 0 || to >= current.length) return current;
      return arrayMove(current, index, to);
    });
  };

  const remove = (id: string) => {
    clearResult();
    setSheets((current) => current.filter((sheet) => sheet.id !== id));
  };

  const merge = async () => {
    clearResult();
    setPhase("merging");
    setProgress({ done: 0, total: sheets.length });
    try {
      const blob = await mergePdfs(sheets, (done, total) =>
        setProgress({ done, total }),
      );
      const url = URL.createObjectURL(blob);
      resultUrl.current = url;
      setResult({
        url,
        name: `${outputName.trim() || "merged"}.pdf`,
        size: blob.size,
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
  const busy = phase !== "idle";

  return (
    <section className="flex flex-col gap-5">
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsOver(true);
        }}
        onDragLeave={() => setIsOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsOver(false);
          void addFiles(Array.from(event.dataTransfer.files));
        }}
        className={`rounded-sheet border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isOver ? "border-stamp bg-sheet" : "border-desk-deep bg-sheet/60"
        }`}
      >
        <p className="text-base font-medium">Drop PDFs here</p>
        <p className="mt-1 text-sm text-ink-soft">
          They stay on your device. Nothing is uploaded.
        </p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-4 rounded-sheet border border-ink px-4 py-2 text-sm font-medium hover:bg-ink hover:text-sheet"
        >
          Choose files
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          multiple
          hidden
          onChange={(event) => {
            void addFiles(Array.from(event.target.files ?? []));
            event.target.value = "";
          }}
        />
      </div>

      {rejections.length > 0 && (
        <ul className="flex flex-col gap-1 border-l-2 border-alert pl-3 text-sm text-alert">
          {rejections.map((rejection, index) => (
            <li key={`${rejection.name}-${index}`}>{rejection.reason}</li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-baseline justify-between border-b border-rule pb-2">
          <h2 className="text-lg font-bold tracking-tight">Stack</h2>
          <p className="text-sm text-ink-soft">
            {sheets.length === 0
              ? "empty"
              : `${sheets.length} ${
                  sheets.length === 1 ? "file" : "files"
                }, ${pages} ${pages === 1 ? "page" : "pages"}`}
          </p>
        </div>

        {sheets.length === 0 ? (
          <p className="py-6 text-sm text-ink-soft">
            Add two or more PDFs. They merge in the order you set here, top to
            bottom.
          </p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={sheets}
              strategy={verticalListSortingStrategy}
            >
              {/* Gap clears the stacked edges that trail each row. */}
              <ul className="flex flex-col gap-3.5">
                {sheets.map((sheet, index) => (
                  <SheetRow
                    key={sheet.id}
                    sheet={sheet}
                    position={index + 1}
                    range={ranges[index]}
                    isFirst={index === 0}
                    isLast={index === sheets.length - 1}
                    onMove={(direction) => move(index, direction)}
                    onRemove={() => remove(sheet.id)}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </div>

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

      {result && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-sheet border border-stamp bg-sheet px-4 py-3">
          <p className="text-sm">
            <span className="font-semibold">Merged.</span>{" "}
            <span className="text-ink-soft">
              {result.pages} pages, {formatBytes(result.size)}
            </span>
          </p>
          <a
            href={result.url}
            download={result.name}
            className="rounded-sheet bg-ink px-4 py-2 text-sm font-semibold text-sheet hover:bg-stamp"
          >
            Download {result.name}
          </a>
        </div>
      )}
    </section>
  );
}
