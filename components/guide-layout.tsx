import type { ReactNode } from "react";
import { AdSlot } from "@/components/ad-slot";
import { Merger } from "@/components/merger";
import {
  Faq,
  MoreGuides,
  SiteFooter,
  SiteHeader,
  type QA,
} from "@/components/site-chrome";

type GuideLayoutProps = {
  href: string;
  title: string;
  lede: string;
  /** Prose sections, rendered above the questions. */
  children: ReactNode;
  faq: QA[];
};

/**
 * Every guide carries the working tool, not just a link to it. A page that
 * answers the question and then does the job is worth landing on; one that
 * only points elsewhere is a doorway page, and gets treated as one.
 */
export function GuideLayout({
  href,
  title,
  lede,
  children,
  faq,
}: GuideLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            <h1 className="max-w-[24ch] font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-4xl">
              {title}
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink-soft">
              {lede}
            </p>

            <div className="mt-8">
              <Merger />
            </div>

            <AdSlot
              slot="0000000000"
              width={320}
              height={100}
              label="Advertisement"
              className="mx-auto mt-10 lg:hidden"
            />

            <div className="mt-14 flex max-w-[68ch] flex-col gap-10">
              {children}
            </div>

            <Faq items={faq} />
            <MoreGuides exclude={href} />
          </div>

          <div className="hidden lg:block">
            <AdSlot
              slot="0000000000"
              width={300}
              height={600}
              label="Advertisement"
              className="sticky top-8"
            />
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/** One prose section of a guide. */
export function GuideSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="border-b border-rule pb-2 text-lg font-bold tracking-tight">
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}
