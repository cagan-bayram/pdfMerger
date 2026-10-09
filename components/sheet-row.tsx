"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { formatBytes, type Sheet } from "@/lib/merge";

/** How thick the sheet looks: more pages, more stacked edges behind the row. */
function edgeCount(pageCount: number): number {
  if (pageCount >= 25) return 3;
  if (pageCount >= 8) return 2;
  if (pageCount >= 2) return 1;
  return 0;
}

type SheetRowProps = {
  sheet: Sheet;
  position: number;
  range: { start: number; end: number };
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
};

export function SheetRow({
  sheet,
  position,
  range,
  onRemove,
  onMove,
  isFirst,
  isLast,
}: SheetRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: sheet.id });

  const edges = edgeCount(sheet.pageCount);

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`relative ${isDragging ? "z-10" : ""}`}
    >
      {/* The thickness of the document, drawn as sheet edges behind the row. */}
      {Array.from({ length: edges }, (_, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute inset-x-0 top-0 z-0 h-full rounded-sheet border border-rule bg-sheet"
          style={{
            transform: `translate(${(i + 1) * 3}px, ${(i + 1) * 3}px)`,
          }}
        />
      ))}

      <div
        className={`relative z-10 flex items-center gap-3 rounded-sheet border bg-sheet px-2 py-2.5 sm:px-3 ${
          isDragging
            ? "border-stamp shadow-[0_8px_20px_rgba(22,40,61,0.18)]"
            : "border-rule"
        }`}
      >
        <button
          type="button"
          className="shrink-0 cursor-grab touch-none rounded p-1 text-ink-soft hover:text-ink active:cursor-grabbing"
          aria-label={`Reorder ${sheet.name}`}
          {...attributes}
          {...listeners}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" aria-hidden>
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <circle
                  key={`${row}-${col}`}
                  cx={1.5 + col * 7}
                  cy={3 + row * 5}
                  r="1.4"
                  fill="currentColor"
                />
              )),
            )}
          </svg>
        </button>

        <span className="w-4 shrink-0 text-right text-sm text-ink-soft">
          {position}
        </span>

        <span className="min-w-0 flex-1 truncate text-sm font-medium" title={sheet.name}>
          {sheet.name}
        </span>

        <span className="hidden shrink-0 text-xs text-ink-soft sm:block">
          {formatBytes(sheet.file.size)}
        </span>

        <span className="hidden shrink-0 text-xs text-ink-soft sm:block">
          {sheet.pageCount} {sheet.pageCount === 1 ? "page" : "pages"}
        </span>

        {/* Where this document lands in the merged file. Kept at every width:
            it is the one number you cannot work out by looking at the files. */}
        <span className="w-[4.5rem] shrink-0 text-right text-xs text-stamp">
          {range.start === range.end
            ? `p. ${range.start}`
            : `p. ${range.start}–${range.end}`}
        </span>

        <span className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={isFirst}
            aria-label={`Move ${sheet.name} earlier`}
            className="rounded p-1 text-ink-soft hover:text-ink disabled:opacity-25"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M6 2.5 L10 7.5 H2 Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => onMove(1)}
            disabled={isLast}
            aria-label={`Move ${sheet.name} later`}
            className="rounded p-1 text-ink-soft hover:text-ink disabled:opacity-25"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M6 9.5 L2 4.5 H10 Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${sheet.name}`}
            className="ml-1 rounded p-1 text-ink-soft hover:text-alert"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path
                d="M2 2 L10 10 M10 2 L2 10"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </span>
      </div>
    </li>
  );
}
