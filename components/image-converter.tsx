"use client";

import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";
import { Stack, type StackItem } from "@/components/stack";
import { DropZone, Rejections, Result, useObjectUrl } from "@/components/tool-ui";
import { formatBytes, type Rejection } from "@/lib/merge";
import {
  formatDimensions,
  imagesToPdf,
  inspectImage,
  type PageMode,
  type Picture,
} from "@/lib/images";

export function ImageConverter() {
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [rejections, setRejections] = useState<Rejection[]>([]);
  const [outputName, setOutputName] = useState("scan");
  const [pageMode, setPageMode] = useState<PageMode>("a4");
  const [phase, setPhase] = useState<"idle" | "reading" | "working">("idle");
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

      const accepted: Picture[] = [];
      const refused: Rejection[] = [];

      for (const file of incoming) {
        const seen = await inspectImage(file);
        if ("reason" in seen) {
          refused.push({ name: file.name, reason: seen.reason });
          continue;
        }
        accepted.push({
          id: crypto.randomUUID(),
          file,
          name: file.name,
          width: seen.width,
          height: seen.height,
        });
      }

      setPictures((current) => [...current, ...accepted]);
      setRejections(refused);
      setPhase("idle");
    },
    [clearResult],
  );

  const convert = async () => {
    clearResult();
    setPhase("working");
    setProgress({ done: 0, total: pictures.length });
    try {
      const blob = await imagesToPdf(pictures, pageMode, (done, total) =>
        setProgress({ done, total }),
      );
      publish(blob, `${outputName.trim() || "scan"}.pdf`, {
        pages: pictures.length,
      });
    } catch {
      setRejections([
        {
          name: "",
          reason:
            "The conversion stopped partway. Remove the image you added last, then try again.",
        },
      ]);
    } finally {
      setPhase("idle");
    }
  };

  const items: StackItem[] = pictures.map((picture, index) => ({
    id: picture.id,
    name: picture.name,
    aside: formatBytes(picture.file.size),
    meta: formatDimensions(picture),
    position: `p. ${index + 1}`,
    thickness: 1,
  }));

  return (
    <section className="flex flex-col gap-5">
      <DropZone
        accept="image/*"
        onFiles={(files) => void addFiles(files)}
        title="Drop images here"
      />

      <Rejections items={rejections} />

      <Stack
        items={items}
        heading="Pages"
        summary={
          pictures.length === 0
            ? "empty"
            : `${pictures.length} ${pictures.length === 1 ? "image" : "images"}`
        }
        empty="Add your photos or scans. Each becomes one page, in the order you set here."
        onReorder={(from, to) => {
          clearResult();
          setPictures((current) =>
            to < 0 || to >= current.length ? current : arrayMove(current, from, to),
          );
        }}
        onRemove={(id) => {
          clearResult();
          setPictures((current) => current.filter((picture) => picture.id !== id));
        }}
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-rule pt-4">
        <button
          type="button"
          onClick={() => void convert()}
          disabled={pictures.length === 0 || busy}
          className="rounded-sheet bg-stamp px-5 py-2.5 text-sm font-semibold text-sheet hover:bg-stamp-deep disabled:bg-desk-deep disabled:text-ink-soft"
        >
          {phase === "working"
            ? `Converting ${progress.done} of ${progress.total}`
            : pictures.length === 0
              ? "Convert to PDF"
              : `Convert ${pictures.length} ${pictures.length === 1 ? "image" : "images"}`}
        </button>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Page size
          <select
            value={pageMode}
            onChange={(event) => {
              clearResult();
              setPageMode(event.target.value as PageMode);
            }}
            className="rounded-sheet border border-rule bg-sheet px-2 py-1.5 text-ink"
          >
            <option value="a4">A4</option>
            <option value="match">Match the image</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Save as
          <input
            value={outputName}
            onChange={(event) => setOutputName(event.target.value)}
            spellCheck={false}
            aria-label="Name for the converted file"
            className="w-32 rounded-sheet border border-rule bg-sheet px-2 py-1.5 text-ink"
          />
          .pdf
        </label>

        {pictures.length > 0 && (
          <button
            type="button"
            onClick={() => {
              clearResult();
              setPictures([]);
              setRejections([]);
            }}
            className="text-sm text-ink-soft underline decoration-rule hover:text-ink"
          >
            Clear
          </button>
        )}
      </div>

      <Result result={result} verb="Converted" />
    </section>
  );
}
