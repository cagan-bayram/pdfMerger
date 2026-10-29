"use client";

import { useCallback, useRef, useState } from "react";
import { formatBytes, type Rejection } from "@/lib/merge";

/** Shared drop zone: click to browse, or drag files onto it. */
export function DropZone({
  accept,
  onFiles,
  title,
  note = "They stay on your device. Nothing is uploaded.",
}: {
  accept: string;
  onFiles: (files: File[]) => void;
  title: string;
  note?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsOver(true);
      }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsOver(false);
        onFiles(Array.from(event.dataTransfer.files));
      }}
      className={`rounded-sheet border-2 border-dashed px-6 py-10 text-center transition-colors ${
        isOver ? "border-stamp bg-sheet" : "border-desk-deep bg-sheet/60"
      }`}
    >
      <p className="text-base font-medium">{title}</p>
      <p className="mt-1 text-sm text-ink-soft">{note}</p>
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
        accept={accept}
        multiple
        hidden
        onChange={(event) => {
          onFiles(Array.from(event.target.files ?? []));
          event.target.value = "";
        }}
      />
    </div>
  );
}

/** Files we could not use, listed so the person can act on each one. */
export function Rejections({ items }: { items: Rejection[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-col gap-1 border-l-2 border-alert pl-3 text-sm text-alert">
      {items.map((rejection, index) => (
        <li key={`${rejection.name}-${index}`}>{rejection.reason}</li>
      ))}
    </ul>
  );
}

export type ToolResult = {
  url: string;
  name: string;
  size: number;
  pages: number;
};

/**
 * Holds the finished file's object URL and revokes the previous one, so a tool
 * never leaks blobs as the person reruns it.
 */
export function useObjectUrl() {
  const [result, setResult] = useState<ToolResult | null>(null);
  const current = useRef<string | null>(null);

  const clear = useCallback(() => {
    if (current.current) URL.revokeObjectURL(current.current);
    current.current = null;
    setResult(null);
  }, []);

  const publish = useCallback(
    (blob: Blob, name: string, extra: { pages: number }) => {
      if (current.current) URL.revokeObjectURL(current.current);
      const url = URL.createObjectURL(blob);
      current.current = url;
      setResult({ url, name, size: blob.size, pages: extra.pages });
    },
    [],
  );

  return { result, publish, clear };
}

export function Result({
  result,
  verb,
}: {
  result: ToolResult | null;
  verb: string;
}) {
  if (!result) return null;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-sheet border border-stamp bg-sheet px-4 py-3">
      <p className="text-sm">
        <span className="font-semibold">{verb}.</span>{" "}
        <span className="text-ink-soft">
          {result.pages} {result.pages === 1 ? "page" : "pages"},{" "}
          {formatBytes(result.size)}
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
  );
}
