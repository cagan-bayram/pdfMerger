import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-pdfs-without-acrobat";

export const metadata: Metadata = {
  title: "Combine PDFs without Adobe Acrobat",
  description:
    "Acrobat Reader cannot merge files — that needs a paid subscription. The free alternatives on Windows, macOS, Linux and in the browser, and when Acrobat is genuinely worth paying for.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Can Adobe Acrobat Reader merge PDFs?",
    a: "No. The free Reader opens, prints and annotates PDFs but cannot combine them. Merging is a feature of Acrobat Pro, or of Adobe's paid online tools — which is why the Combine Files button leads to a subscription prompt rather than a result.",
  },
  {
    q: "Does Windows have a built-in way to merge PDFs?",
    a: "No, and this surprises people. Microsoft Print to PDF prints one document at a time, so it cannot combine two existing PDFs into one. Windows has no native merge, which is why Windows users end up searching for this in the first place.",
  },
  {
    q: "What about on a Mac?",
    a: "macOS can do it natively, and well. Open one PDF in Preview, show the thumbnail sidebar from the View menu, then drag the second PDF file into the sidebar where you want its pages to land. Save, and you are done. No download required.",
  },
  {
    q: "Is there a command-line option?",
    a: "Yes, and it is the best choice for repeat or scripted work. With qpdf: qpdf --empty --pages first.pdf second.pdf -- out.pdf. With poppler-utils: pdfunite first.pdf second.pdf out.pdf. Both are free, available on every Linux distribution, and installable on macOS via Homebrew and on Windows via winget or Scoop.",
  },
  {
    q: "So when is Acrobat actually worth it?",
    a: "When you need the things only a full PDF suite does well: proper OCR on scanned documents, genuine redaction that removes the underlying text rather than drawing a black box over it, interactive form creation, PDF/A archival output, and preflight for print. For merging alone it is comfortably more than the job requires.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Combine PDFs without Adobe Acrobat"
      lede="Most people arrive at this question the same way: they click Combine Files in Acrobat Reader and hit a subscription wall. Merging is one of the easiest things you can do to a PDF, and none of the free routes below cost anything."
      faq={faq}
    >
      <GuideSection heading="Why Reader will not do it">
        <p>
          Adobe splits PDF handling across two products. Reader is free and
          deliberately limited to viewing, printing and commenting. Anything
          that changes a document&rsquo;s structure — merging, splitting,
          reordering, exporting to Word — belongs to Acrobat Pro, which is a
          monthly subscription.
        </p>
        <p>
          That is a reasonable business, and Acrobat Pro is a genuinely good
          tool. It is simply a lot of product for the specific job of putting
          two files together.
        </p>
      </GuideSection>

      <GuideSection heading="The free routes, by platform">
        <p>
          <strong>Any platform, nothing installed:</strong> the merger at the
          top of this page. It runs in the browser on your own device, so the
          files are not uploaded, and it works the same on Windows, macOS,
          Linux, Android and iOS.
        </p>
        <p>
          <strong>macOS:</strong> Preview does it natively — open a PDF, show
          the thumbnail sidebar, and drag another PDF into it at the position
          you want. This is the best option if you are on a Mac and only ever
          merge occasionally.
        </p>
        <p>
          <strong>Windows:</strong> nothing is built in. Print to PDF cannot
          combine existing files, so your options are a browser tool, a
          command-line utility, or installing something.
        </p>
        <p>
          <strong>Command line, anywhere:</strong> <code>qpdf</code> or{" "}
          <code>pdfunite</code>, both free and scriptable. Worth setting up if
          you merge regularly or need it inside an automated workflow — see the
          exact commands in the questions below.
        </p>
      </GuideSection>

      <GuideSection heading="What to watch for in free online tools">
        <p>
          The majority of &ldquo;free PDF merger&rdquo; sites upload your
          documents to their servers, process them there, and delete them after
          some window. That is fine for a lecture handout and a poor idea for a
          contract or an ID scan.
        </p>
        <p>
          The quick test: open developer tools, watch the Network tab, and add a
          file. If a request the size of your document goes out, the tool is
          upload-based. Or simply disconnect from the internet and try — a tool
          that still works is not sending anything anywhere.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
