import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

type ArticleLayoutProps = {
  title: string;
  standfirst: string;
  /** Shown under the title, e.g. "3 November 2026". */
  dateline: string;
  children: ReactNode;
};

/**
 * Prose-first, unlike GuideLayout: a piece of research should open with the
 * research, not with a drop zone. The tool is offered at the end, once the
 * reader has a reason to care.
 */
export function ArticleLayout({
  title,
  standfirst,
  dateline,
  children,
}: ArticleLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto w-full max-w-[74ch] flex-1 px-5 py-10 lg:py-14">
        <article>
          <h1 className="font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {standfirst}
          </p>
          <p className="mt-4 text-sm text-ink-soft">{dateline}</p>

          <div className="mt-10 flex flex-col gap-10">{children}</div>
        </article>

        <aside className="mt-14 rounded-sheet border border-stamp bg-sheet px-5 py-4">
          <p className="text-sm leading-relaxed">
            <span className="font-semibold">The tool this site runs.</span>{" "}
            <Link
              href="/"
              className="text-stamp underline decoration-rule underline-offset-2 hover:decoration-stamp"
            >
              Stack PDF
            </Link>{" "}
            merges PDFs in the browser, which is the architecture described
            above. It is in the table like everything else, and the method
            section explains how to check the claim rather than take it.
          </p>
        </aside>
      </main>

      <SiteFooter />
    </>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="border-b border-rule pb-2 font-display text-xl font-bold tracking-tight">
        {heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4 text-[15px] leading-relaxed text-ink-soft">
        {children}
      </div>
    </section>
  );
}

export type Finding = {
  tool: string;
  /** Observed: does the file leave the device? */
  uploads: "yes" | "no" | "pending";
  /** What happened when the page was loaded and then taken offline. */
  offline: string;
  /** The company's own stated retention, with the source linked separately. */
  stated: string;
  note?: string;
};

export function FindingsTable({ rows }: { rows: Finding[] }) {
  const label = (value: Finding["uploads"]) =>
    value === "yes"
      ? "Uploads"
      : value === "no"
        ? "Stays local"
        : "Not yet tested";

  const tone = (value: Finding["uploads"]) =>
    value === "no"
      ? "text-stamp"
      : value === "pending"
        ? "text-ink-soft"
        : "text-ink";

  return (
    <div className="-mx-5 overflow-x-auto px-5">
      <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-rule text-xs text-ink-soft">
            <th className="py-2 pr-4 font-semibold">Tool</th>
            <th className="py-2 pr-4 font-semibold">File leaves device?</th>
            <th className="py-2 pr-4 font-semibold">Works offline?</th>
            <th className="py-2 font-semibold">Stated retention</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.tool} className="border-b border-rule align-top">
              <td className="py-3 pr-4 font-medium text-ink">
                {row.tool}
                {row.note ? (
                  <span className="mt-1 block text-xs font-normal text-ink-soft">
                    {row.note}
                  </span>
                ) : null}
              </td>
              <td className={`py-3 pr-4 font-medium ${tone(row.uploads)}`}>
                {label(row.uploads)}
              </td>
              <td className="py-3 pr-4 text-ink-soft">{row.offline}</td>
              <td className="py-3 text-ink-soft">{row.stated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
