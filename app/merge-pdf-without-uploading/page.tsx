import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-pdf-without-uploading";

export const metadata: Metadata = {
  title: "Merge a PDF without uploading it",
  description:
    "Combine PDF files without sending them to a server. How in-browser merging works, how to check for yourself that nothing is uploaded, and when it actually matters.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "How can I check that nothing is uploaded?",
    a: "Open your browser's developer tools before you merge, go to the Network tab, and clear it. Add your files and press Merge. You will see no request carrying your file — the only entries are the page's own scripts, which loaded before you picked anything. The file names never appear in a request body.",
  },
  {
    q: "Does it work with no internet connection?",
    a: "Yes, once the page has loaded. Load the page, then turn off your wi-fi, then merge. It works because the code that does the merging is already in your browser. That is also the simplest proof that nothing is being sent anywhere.",
  },
  {
    q: "Is there a file size limit?",
    a: "Nothing we impose. The limit is your device's memory, because the whole stack is held in the tab while it merges. Phones handle a few hundred megabytes comfortably; laptops handle far more. Very large merges may make the tab unresponsive for a few seconds.",
  },
  {
    q: "Do you keep a copy of the merged file?",
    a: "There is nowhere to keep one. The site is a set of static files with no backend. The merged PDF exists as a temporary object in your browser until you download it, and is gone when you close the tab.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Merge a PDF without uploading it"
      lede="Most free PDF tools are upload sites: your documents travel to a machine you do not control, get merged there, and sit in storage for some period afterwards. Merging does not actually require any of that."
      faq={faq}
    >
      <GuideSection heading="What &ldquo;without uploading&rdquo; means here">
        <p>
          The merge runs as code inside the page you are looking at, using your
          own device&rsquo;s processor and memory. Your files are opened by the
          browser, combined, and handed back to you as a download. No request
          carrying your documents is ever made, because there is no server on
          the other end to receive one — this site is static files on a CDN.
        </p>
        <p>
          This is not a privacy policy promising good behaviour. It is a
          different architecture: the capability to send your file somewhere
          does not exist in the page.
        </p>
      </GuideSection>

      <GuideSection heading="Check it yourself in thirty seconds">
        <p>
          You do not have to take our word for it, and you should not take any
          site&rsquo;s word for it.
        </p>
        <p>
          Press F12 to open developer tools and select the Network tab. Clear
          the list. Now add your PDFs and press Merge. Watch what appears:
          nothing, beyond what the page already loaded. Compare that with any
          upload-based merger, where you will see a large POST request carrying
          your document the moment you add it.
        </p>
        <p>
          The offline test is even simpler. Load this page, disconnect from the
          internet, and merge anyway. It still works.
        </p>
      </GuideSection>

      <GuideSection heading="When this actually matters">
        <p>
          For a cat photo, it does not. For documents that identify you or
          commit you to something, it does: passport and ID scans, signed
          contracts, tax returns, payslips, medical letters, anything with an
          account number on it.
        </p>
        <p>
          The risk with upload-based tools is rarely malice. It is retention and
          breach — your file sitting on a server for hours or days, backed up,
          logged, and occasionally exposed when that company has a bad week. A
          document that never leaves your laptop cannot be included in someone
          else&rsquo;s data breach.
        </p>
        <p>
          Many workplaces also forbid putting client or patient documents
          through third-party web services at all. In-browser processing
          sidesteps that, because nothing is disclosed to a third party.
        </p>
      </GuideSection>

      <GuideSection heading="What this does not protect you from">
        <p>
          Being honest about the boundaries: in-browser merging protects the
          file in transit and at rest on someone else&rsquo;s server. It does
          not protect you from malware on your own machine, from a malicious
          browser extension that can read page contents, or from whoever you
          send the merged file to afterwards.
        </p>
        <p>
          It also does not encrypt anything. The merged PDF is an ordinary file
          on your computer. If the contents are sensitive, how you store and
          send it next is still your problem to solve.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
