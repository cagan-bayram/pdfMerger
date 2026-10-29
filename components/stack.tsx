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
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { StackRow } from "@/components/stack-row";

/**
 * One row of the stack. `thickness` drives the stacked-sheet edges behind the
 * row — page count for a PDF, always 1 for a single image.
 */
export type StackItem = {
  id: string;
  name: string;
  /** Quiet detail, e.g. "10 pages" or "3024 × 4032". */
  meta?: string;
  /** Where this lands in the output, e.g. "p. 3–12". Shown in the accent. */
  position?: string;
  /** Secondary detail hidden on small screens, e.g. a file size. */
  aside?: string;
  thickness?: number;
};

type StackProps = {
  items: StackItem[];
  heading: string;
  summary: string;
  empty: string;
  onReorder: (from: number, to: number) => void;
  onRemove: (id: string) => void;
};

/**
 * The shared file list: drag or arrow reordering, removal, and the paper
 * metaphor. Every tool on the site works on an ordered stack of files, so the
 * list lives here and each tool supplies its own rows and actions.
 */
export function Stack({
  items,
  heading,
  summary,
  empty,
  onReorder,
  onRemove,
}: StackProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const from = items.findIndex((item) => item.id === active.id);
    const to = items.findIndex((item) => item.id === over.id);
    if (from !== -1 && to !== -1) onReorder(from, to);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-baseline justify-between border-b border-rule pb-2">
        <h2 className="text-lg font-bold tracking-tight">{heading}</h2>
        <p className="text-sm text-ink-soft">{summary}</p>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-sm text-ink-soft">{empty}</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {/* Gap clears the stacked edges that trail each row. */}
            <ul className="flex flex-col gap-3.5">
              {items.map((item, index) => (
                <StackRow
                  key={item.id}
                  item={item}
                  position={index + 1}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  onMove={(direction) => onReorder(index, index + direction)}
                  onRemove={() => onRemove(item.id)}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
