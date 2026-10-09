import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms of use for Stack PDF.",
};

// A plain-language starting point, not legal advice — worth having checked if
// the site ever earns real money. Bump the date above whenever this changes.
export default function Terms() {
  return (
    <main className="mx-auto w-full max-w-[68ch] flex-1 px-5 py-12">
      <Link href="/" className="text-sm text-ink-soft hover:text-ink">
        Back to {SITE_NAME}
      </Link>

      <h1 className="mt-6 font-display text-3xl font-extrabold tracking-[-0.03em]">
        Terms
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated 9 October 2026. Contact:
        cagansoftwareengineering@outlook.com.
      </p>

      <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-base font-bold">What this is</h2>
          <p className="mt-2 text-ink-soft">
            {SITE_NAME} is a free tool that merges PDF files inside your
            browser. There is no account and no payment. Using the site means
            you accept these terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Your files are your
            responsibility</h2>
          <p className="mt-2 text-ink-soft">
            You keep every right in the documents you merge, and you confirm
            you are allowed to use them. Because the merge runs on your device,
            the result exists only on your device — keep your own copies of the
            originals. We cannot recover anything for you.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">No warranty</h2>
          <p className="mt-2 text-ink-soft">
            The tool is provided as is. It may be unavailable, and a merge may
            fail or produce a file that does not meet your needs — check the
            result before you rely on it. To the extent the law allows, we are
            not liable for any loss arising from using the site, including lost
            or corrupted documents.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Acceptable use</h2>
          <p className="mt-2 text-ink-soft">
            Do not use the site to break the law or to infringe anyone&apos;s
            rights, and do not attempt to interfere with how it is served to
            other people.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold">Changes</h2>
          <p className="mt-2 text-ink-soft">
            These terms may change; the date above shows the current version.
            They are governed by the laws of the UK.
          </p>
        </section>
      </div>
    </main>
  );
}
