"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { StackItem } from "@/components/stack";

/** How thick the sheet looks: more pages, more stacked edges behind the row. */
function edgeCount(thickness: number): number {
  if (thickness >= 25) return 3;
  if (thickness >= 8) return 2;
  if (thickness >= 2) return 1;
  return 0;
}

type StackRowProps = {
  item: StackItem;
  position: number;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  isFirst: boolean;
  isLast: boolean;
};

export function StackRow({
  item,
  position,
  onRemove,
  onMove,
  isFirst,
  isLast,
}: StackRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const edges = edgeCount(item.thickness ?? 1);

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
          aria-label={`Reorder ${item.name}`}
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

        <span className="min-w-0 flex-1 truncate text-sm font-medium" title={item.name}>
          {item.name}
        </span>

        {item.aside ? (
          <span className="hidden shrink-0 text-xs text-ink-soft sm:block">
            {item.aside}
          </span>
        ) : null}

        {item.meta ? (
          <span className="hidden shrink-0 text-xs text-ink-soft sm:block">
            {item.meta}
          </span>
        ) : null}

        {/* Where this file lands in the output. Kept at every width: it is the
            one number you cannot work out by looking at the files. */}
        {item.position ? (
          <span className="w-[4.5rem] shrink-0 text-right text-xs text-stamp">
            {item.position}
          </span>
        ) : null}

        <span className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={() => onMove(-1)}
            disabled={isFirst}
            aria-label={`Move ${item.name} earlier`}
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
            aria-label={`Move ${item.name} later`}
            className="rounded p-1 text-ink-soft hover:text-ink disabled:opacity-25"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
              <path d="M6 9.5 L2 4.5 H10 Z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${item.name}`}
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
