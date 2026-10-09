import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const guides = [
  {
    href: "/merge-pdf-without-uploading",
    title: "Merge a PDF without uploading it",
  },
  {
    href: "/merge-scanned-passport-pages",
    title: "Merge scanned passport pages",
  },
  {
    href: "/merge-bank-statements",
    title: "Merge bank statements into one PDF",
  },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-rule bg-sheet">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="font-display text-xl font-extrabold tracking-[-0.03em]"
        >
          {SITE_NAME}
        </Link>
        <nav className="flex gap-5 text-sm text-ink-soft">
          <Link href="/#faq" className="hover:text-ink">
            Questions
          </Link>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-rule bg-sheet">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 text-sm text-ink-soft sm:flex-row sm:justify-between">
        <div>
          <p className="text-ink">{SITE_NAME}</p>
          <p className="mt-1">Merging stays on your device.</p>
        </div>

        <nav className="flex flex-col gap-2">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="hover:text-ink">
              {guide.title}
            </Link>
          ))}
        </nav>

        <nav className="flex gap-5 sm:flex-col sm:gap-2">
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export type QA = { q: string; a: string };

/**
 * Renders the questions and the matching FAQPage structured data from one
 * source, so the markup and what search engines read can never drift apart.
 */
export function Faq({ items, id = "faq" }: { items: QA[]; id?: string }) {
  return (
    <section id={id} className="mt-14 max-w-[68ch] scroll-mt-6">
      <h2 className="border-b border-rule pb-2 text-lg font-bold tracking-tight">
        Questions
      </h2>
      <dl className="mt-4 flex flex-col divide-y divide-rule">
        {items.map((item) => (
          <div key={item.q} className="py-4">
            <dt className="text-sm font-semibold">{item.q}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
              {item.a}
            </dd>
          </div>
        ))}
      </dl>

      <script
        type="application/ld+json"
        // Built from the array above at build time; nothing user-supplied.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </section>
  );
}

/** Links to the other guides, so each page has a way out that is not the tool. */
export function MoreGuides({ exclude }: { exclude: string }) {
  const others = guides.filter((guide) => guide.href !== exclude);
  return (
    <section className="mt-14 max-w-[68ch]">
      <h2 className="border-b border-rule pb-2 text-lg font-bold tracking-tight">
        Related
      </h2>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {others.map((guide) => (
          <li key={guide.href}>
            <Link
              href={guide.href}
              className="text-stamp underline decoration-rule underline-offset-2 hover:decoration-stamp"
            >
              {guide.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
