import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/is-it-safe-to-merge-pdfs-online";

export const metadata: Metadata = {
  title: "Is it safe to merge PDFs online?",
  description:
    "What actually happens to a document you upload to a free PDF tool, how to tell whether a site uploads your files at all, and when it is worth caring.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Do free PDF sites keep my files?",
    a: "Most keep them for a window — commonly one to twenty-four hours — then delete them. The deletion is usually real, but it is a promise rather than a guarantee, and it does not cover backups, server logs, or the period before deletion. Read the privacy policy rather than the homepage badge: the policy is the part that is legally binding.",
  },
  {
    q: "How can I tell whether a tool uploads my file?",
    a: "Open developer tools (F12), go to the Network tab, clear it, then add a file. An upload-based tool makes an immediate POST or PUT request of roughly your file's size. A tool that works locally makes none. A second test: load the page, disconnect from the internet, and try the operation. If it still works, nothing is being sent.",
  },
  {
    q: "Is HTTPS enough to make it safe?",
    a: "No. HTTPS protects the file while it travels, which stops someone on your wi-fi reading it. It says nothing about what the company at the other end does with the file once it arrives, how long they keep it, or who they share it with. Almost every site has HTTPS now; it is a floor, not a feature.",
  },
  {
    q: "Does it matter for ordinary documents?",
    a: "Usually not. For a recipe, a manual or a lecture handout, upload-based tools are fine and the convenience is worth it. The calculation changes for anything that identifies you or commits you: ID documents, contracts, bank statements, medical letters, tax filings, anything with an account number.",
  },
  {
    q: "Are desktop apps safer than websites?",
    a: "Not automatically. A desktop app has more access to your machine than a web page does, and plenty of free PDF utilities upload to a cloud service behind the scenes or bundle adware. A local desktop tool from a source you trust is excellent; an unknown free download is a worse bet than a reputable website.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Is it safe to merge PDFs online?"
      lede="It depends entirely on where the merging happens, and most tools do not make that obvious. Here is what to look for, and how to check rather than trust."
      faq={faq}
    >
      <GuideSection heading="Three kinds of tool, hiding behind similar pages">
        <p>
          Search for a PDF merger and you get results that look identical but
          work in completely different ways.
        </p>
        <p>
          <strong>Upload-based services</strong> send your file to a server,
          merge it there, and give you a link to the result. This is the most
          common model and the one most people assume they are using.
        </p>
        <p>
          <strong>Desktop software</strong> works on your machine, with no
          network involved — but installs code with far broader access than a
          web page gets, which makes the source matter more.
        </p>
        <p>
          <strong>In-browser tools</strong> run the merge as code inside the
          page, using your own processor. Nothing is transmitted. This is the
          category this site is in, and the reason the distinction is worth
          explaining at all.
        </p>
      </GuideSection>

      <GuideSection heading="What &ldquo;we delete your files after an hour&rdquo; is worth">
        <p>
          Usually it is true, and usually it is irrelevant to the actual risk.
        </p>
        <p>
          The exposure is not that a company is reading your documents for fun.
          It is that for some window your file existed on hardware you do not
          control, probably replicated across a storage service, possibly
          referenced in request logs that live far longer than the file. If that
          provider has a bad month and a bucket is misconfigured, your document
          is in the set that leaks, regardless of the deletion policy.
        </p>
        <p>
          Deletion promises also say nothing about jurisdiction, subprocessors,
          or what happens to the data when the company is acquired. None of
          those questions arise for a file that never left your laptop.
        </p>
      </GuideSection>

      <GuideSection heading="Check it rather than trust it">
        <p>
          You do not have to take any site&rsquo;s word, including this one. The
          two tests in the questions below take under a minute and settle it
          definitively: watch the Network tab while you add a file, or pull the
          plug and see whether the tool still works.
        </p>
        <p>
          That second test is the one worth remembering. A page that merges
          documents with your wi-fi switched off is, provably, not sending them
          anywhere.
        </p>
      </GuideSection>

      <GuideSection heading="Being straight about this site">
        <p>
          The merge here happens entirely in your browser, and there is no
          server to receive a document even if the code tried. That part is
          architectural rather than a policy you have to believe.
        </p>
        <p>
          What this site does collect: page views, via a cookieless analytics
          service that records the page address, the referring site, and coarse
          country and device information. It never sees file names or contents.
          If advertising is added later, the advertising network will set its
          own cookies, and the privacy page will say so before it happens.
        </p>
        <p>
          In-browser processing is also not a cure-all. It does not protect you
          from malware on your own machine, from a browser extension that can
          read page contents, or from however you send the merged file
          afterwards.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
