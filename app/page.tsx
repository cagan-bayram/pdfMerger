import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ad-slot";
import { Merger } from "@/components/merger";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merge PDFs in your browser",
  description:
    "Combine PDF files into one without uploading them. Set the page order, merge, download. Free, no sign-up, no file size limit.",
};

const faq = [
  {
    q: "Are my files uploaded anywhere?",
    a: "No. The merge runs in your browser using WebAssembly, so the documents never leave your device. You can check for yourself: open your browser's network tab and merge a file — there are no upload requests. The site has no server to send them to.",
  },
  {
    q: "Is there a file size limit?",
    a: "There is no limit we impose. The ceiling is your device's memory, since the whole stack is held in the tab while it merges. Phones manage a few hundred megabytes comfortably; laptops handle far more.",
  },
  {
    q: "Can it merge a password-protected PDF?",
    a: "Not while it is locked. Open it in a PDF reader, save an unlocked copy, then add that copy to the stack.",
  },
  {
    q: "Does the merged file keep form fields and bookmarks?",
    a: "Page content, text, images and vector graphics are copied exactly. Interactive form fields and bookmarks are not carried over — the merged file is flat. Signatures on the source documents are invalidated by any merge, in every tool, because the bytes they signed have changed.",
  },
  {
    q: "What happens to the page order?",
    a: "Documents merge top to bottom in the order shown in the stack. Drag a row, or use the arrows, and the page range beside each file updates to show where it lands in the finished document.",
  },
];

export default function Home() {
  return (
    <>
      <header className="border-b border-rule bg-sheet">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="font-display text-xl font-extrabold tracking-[-0.03em]"
          >
            {SITE_NAME}
          </Link>
          <nav className="flex gap-5 text-sm text-ink-soft">
            <a href="#faq" className="hover:text-ink">
              Questions
            </a>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <div className="min-w-0">
            <h1 className="max-w-[22ch] font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
              Combine PDFs without uploading them.
            </h1>
            <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink-soft">
              Pick your files, set the order, download one PDF. The merge
              happens in this tab — your documents are never sent to a server,
              because there is no server.
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

            <section className="mt-14 max-w-[68ch]">
              <h2 className="border-b border-rule pb-2 text-lg font-bold tracking-tight">
                Why do it in the browser
              </h2>
              <div className="mt-4 flex flex-col gap-4 text-sm leading-relaxed text-ink-soft">
                <p>
                  Most free PDF tools upload your files, merge them on a
                  machine you do not control, and hold the result for a while
                  afterwards. For a tax return, a passport scan or a signed
                  contract, that is a lot of trust for a one-off job.
                </p>
                <p>
                  Merging a PDF is mechanical: copy the pages of each document
                  into a new one, in order. Browsers have been able to do that
                  locally for years. Doing it here means no queue, no upload
                  wait on a slow connection, and no copy of your documents
                  sitting in someone else&apos;s storage bucket.
                </p>
              </div>
            </section>

            <section id="faq" className="mt-14 max-w-[68ch] scroll-mt-6">
              <h2 className="border-b border-rule pb-2 text-lg font-bold tracking-tight">
                Questions
              </h2>
              <dl className="mt-4 flex flex-col divide-y divide-rule">
                {faq.map((item) => (
                  <div key={item.q} className="py-4">
                    <dt className="text-sm font-semibold">{item.q}</dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
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

      <footer className="border-t border-rule bg-sheet">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-ink-soft">
          <p>
            {SITE_NAME} — merging stays on your device.
          </p>
          <nav className="flex gap-5">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </nav>
        </div>
      </footer>

      <script
        type="application/ld+json"
        // Static, build-time JSON from the array above: nothing user-supplied.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebApplication",
                name: SITE_NAME,
                url: SITE_URL,
                applicationCategory: "UtilitiesApplication",
                operatingSystem: "Any browser",
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@type": "FAQPage",
                mainEntity: faq.map((item) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
            ],
          }),
        }}
      />
    </>
  );
}
