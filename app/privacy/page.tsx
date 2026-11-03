import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What Stack PDF does and does not collect. Your PDFs are processed in your browser and never uploaded.",
  alternates: { canonical: "/privacy" },
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
            This site currently shows no ads, and loads no advertising code. No
            advertising cookie is set and no ad network receives anything about
            your visit.
          </p>
          <p className="mt-2 text-ink-soft">
            That may change. If advertising is added, this page will say so
            before the first ad appears, and visitors in the EEA, UK and
            Switzerland will be asked for consent before any personalised ad
            loads.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Analytics</h2>
          <p className="mt-2 text-ink-soft">
            We count page views with Vercel Web Analytics, to see which pages
            people find useful. It records the page address, the site you
            arrived from, and coarse details like country, device type and
            browser. It sets no cookie, does not use your device&rsquo;s
            storage, and does not follow you across other sites. To count
            returning visits within a day it derives a one-way hash from your
            IP address and browser, which is discarded daily and cannot be
            turned back into either. It never sees the documents you merge,
            because those are never sent anywhere.
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
