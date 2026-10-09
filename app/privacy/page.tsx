import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Stack PDF does and does not collect. Your PDFs are processed in your browser and never uploaded.",
};

// Keep this accurate: an ad network reviewer reads it, and so do people
// deciding whether to trust the tool. If the site starts collecting anything
// it does not collect today, say so here and bump the date.
export default function Privacy() {
  return (
    <main className="mx-auto w-full max-w-[68ch] flex-1 px-5 py-12">
      <Link href="/" className="text-sm text-ink-soft hover:text-ink">
        Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.03em]">
        Privacy
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated 9 October 2026. Contact:
        cagansoftwareengineering@outlook.com.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold">Your documents</h2>
          <p className="mt-2 text-ink-soft">
            The PDFs you add are opened, merged and saved entirely inside your
            browser. They are not uploaded, not stored, and not transmitted
            anywhere. {SITE_NAME} is a set of static files with no backend, so
            there is no system on our side that could receive a document. When
            you close or reload the tab, everything you added is gone.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Advertising</h2>
          <p className="mt-2 text-ink-soft">
            This site shows ads served by Google AdSense. Google and its
            partners may set cookies or read device identifiers to measure and
            personalise the ads you see, and that data is collected by Google
            rather than by us. You can review and change what Google collects
            at{" "}
            <a
              className="underline decoration-rule hover:text-ink"
              href="https://myadcenter.google.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              My Ad Center
            </a>
            . If you are in the EEA, UK or Switzerland, you will be asked for
            consent before personalised ads load, and you can change that
            choice at any time from the link in the footer.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Hosting</h2>
          <p className="mt-2 text-ink-soft">
            The site is hosted on Vercel, which keeps standard server logs of
            requests for the pages and scripts themselves, including IP address
            and user agent. Those logs cover page requests only — your
            documents are never part of a request.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Your rights</h2>
          <p className="mt-2 text-ink-soft">
            We hold no account, no email address and no document, so there is
            nothing on our side to export or delete. For ad data held by
            Google, use the Google controls linked above. Questions about this
            page: cagansoftwareengineering@outlook.com.
          </p>
        </section>
      </div>
    </main>
  );
}
