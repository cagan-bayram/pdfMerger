"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  /** AdSense ad unit id, from the unit you create in the AdSense dashboard. */
  slot: string;
  width: number;
  height: number;
  label: string;
  className?: string;
};

/**
 * Reserves its space whether or not an ad fills it, so the layout never
 * shifts when the ad script arrives late or a blocker drops it entirely.
 */
export function AdSlot({ slot, width, height, label, className }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle ?? []).push({});
    } catch {
      // A blocked or missing script is not an error worth surfacing.
    }
  }, []);

  return (
    <aside
      aria-label={label}
      className={className}
      style={{ width, height, maxWidth: "100%" }}
    >
      {ADSENSE_CLIENT ? (
        <ins
          className="adsbygoogle block"
          style={{ display: "block", width, height }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center border border-dashed border-rule bg-sheet/50 text-[11px] text-ink-soft">
          {width} × {height}
        </div>
      )}
    </aside>
  );
}
