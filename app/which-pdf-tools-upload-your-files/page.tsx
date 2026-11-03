import type { Metadata } from "next";
import {
  ArticleLayout,
  FindingsTable,
  Section,
  type Finding,
} from "@/components/article-layout";

const href = "/which-pdf-tools-upload-your-files";

// Unlisted and noindexed until the findings column is filled in from a real
// testing session. Remove `robots` and add the page to `articles` in
// site-chrome once the table carries observations rather than "pending".
export const metadata: Metadata = {
  title: "Which free PDF tools upload your files?",
  description:
    "Some browser PDF tools send your document to a server. Some never do. A method anyone can repeat in thirty seconds, and what it showed across a dozen tools.",
  alternates: { canonical: href },
  robots: { index: false, follow: false },
};

const rows: Finding[] = [
  { tool: "Stack PDF", uploads: "pending", offline: "—", stated: "No server to retain anything", note: "This site. See the disclosure below." },
  { tool: "iLovePDF", uploads: "pending", offline: "—", stated: "Deleted automatically within about 2 hours; a Delete it now button on the download page" },
  { tool: "Smallpdf", uploads: "pending", offline: "—", stated: "14 days for eSign documents; window for the ordinary tools not stated in the sources found" },
  { tool: "PDF24 (web tools)", uploads: "pending", offline: "—", stated: "Server copy deleted after 1 hour, per its terms" },
  { tool: "PDF2Go", uploads: "pending", offline: "—", stated: "Deleted after 24 hours or 10 downloads, whichever is first" },
  { tool: "Sejda (web)", uploads: "pending", offline: "—", stated: "2 hours per a third-party review; not confirmed from Sejda's own policy", note: "Its desktop app is said not to upload at all" },
  { tool: "Adobe Acrobat online", uploads: "pending", offline: "—", stated: "Not checked yet" },
  { tool: "CoolPDF", uploads: "pending", offline: "—", stated: "Claims no backend at all", note: "Open source, AGPL-3.0" },
  { tool: "PDFyogi", uploads: "pending", offline: "—", stated: "Claims browser-only processing" },
  { tool: "PDFTasker", uploads: "pending", offline: "—", stated: "Claims browser-only processing" },
  { tool: "localbench", uploads: "pending", offline: "—", stated: "Static, open source, CSP blocks outbound requests" },
];

export default function Page() {
  return (
    <ArticleLayout
      title="Which free PDF tools upload your files?"
      standfirst="Two tools can look identical and work completely differently: one sends your document to a company's server, the other never lets it leave your laptop. Nothing on either page tells you which you are using. Here is a test that takes thirty seconds, and what it showed."
      dateline="Draft — findings pending a testing session"
    >
      <Section heading="A disclosure, before anything else">
        <p>
          I built one of the tools in the table below. That is a conflict of
          interest and you should read everything here with it in mind.
        </p>
        <p>
          It is also why the method matters more than my results. Every claim
          in this piece is something you can check yourself in under a minute,
          including the claims I make about my own site — and the table
          includes several tools that do the same thing mine does, some of them
          better. If this read as an advert dressed up as research, it would
          deserve to be ignored.
        </p>
      </Section>

      <Section heading="Two architectures wearing the same clothes">
        <p>
          A free PDF tool is built one of two ways, and the page gives almost
          no hint which.
        </p>
        <p>
          <strong>Server-side</strong> is the common model. Your file is
          uploaded, processed on hardware the company controls, and held for
          some period before deletion — usually an hour or a day. The company
          is not doing anything sinister; it is the straightforward way to
          build the thing, and it is the only way to offer the heavier
          operations like OCR or conversion to Word.
        </p>
        <p>
          <strong>Client-side</strong> means the work happens in your browser,
          on your own processor, using JavaScript or WebAssembly the page has
          already downloaded. No request carrying your document is ever made,
          because there is nothing on the other end expecting one.
        </p>
        <p>
          Both can be perfectly reasonable. The problem is that you cannot tell
          them apart by looking, and the marketing on both tends toward the
          same reassuring vocabulary: secure, private, encrypted, deleted.
        </p>
      </Section>

      <Section heading="The thirty-second test">
        <p>
          <strong>Load the page, then disconnect from the internet, then try
          the operation.</strong> If it still works, nothing is being sent
          anywhere — the code is already in your browser and has no way to
          reach a server. If it fails or hangs, the tool needs the network,
          which means your file goes somewhere.
        </p>
        <p>
          That single test settles it, needs no technical knowledge, and cannot
          be gamed by marketing copy.
        </p>
        <p>
          To see the detail, open developer tools before you start — F12, then
          the Network tab, with Preserve log ticked — and clear the list. Add
          your file and watch. An upload appears as a request roughly the size
          of your document, usually a POST. A tool working locally produces
          nothing at all. Two further details worth noting: whether the upload
          happens the moment you pick the file or only when you press the
          action button, and whether the finished file downloads from the
          company&rsquo;s domain or from a <code>blob:</code> address, which
          means it
          was assembled in your own tab.
        </p>
      </Section>

      <Section heading="What the test showed">
        <p>
          Each tool was given the same two-page PDF and put through its merge
          function, with the offline test first and the Network tab as
          confirmation. The stated retention column comes from each
          company&rsquo;s own published material, linked in the sources at the
          end, not from the test.
        </p>
        <FindingsTable rows={rows} />
      </Section>

      <Section heading="What this proves, and what it does not">
        <p>
          A tool that passes the offline test is not sending your file
          anywhere during that operation. That is a strong, specific claim and
          it is the one worth having.
        </p>
        <p>
          It is not a claim that the tool is safe in general. Passing says
          nothing about what other pages on the same site do, about analytics
          or advertising scripts, about a future version of the page, or about
          anything that happens after you download the result. Equally, a tool
          that uploads is not thereby careless: a one-hour deletion window from
          a company with a real security programme may be a perfectly sensible
          thing to accept.
        </p>
        <p>
          The distinction that actually matters is not good versus bad
          companies. It is whether <em>this particular document</em> is one you
          are content to place on someone else&rsquo;s infrastructure for an
          hour. For a lecture handout, obviously yes. For a passport scan, a
          signed contract or six months of bank statements, that is a decision
          worth making deliberately rather than by default.
        </p>
      </Section>

      <Section heading="The tools that need no trust at all">
        <p>
          The most interesting result is that a small category of tools removes
          the question entirely, and several of them are open source, which
          means the claim is auditable rather than merely stated. If you want
          to verify rather than believe, those are the ones to start with.
        </p>
        <p>
          This category is also growing. Browsers can now do, locally, a large
          part of what required a server five years ago — which is why the
          honest version of this article is a map of the landscape rather than
          a pitch for any one tool in it.
        </p>
      </Section>

      <Section heading="Sources">
        <p>
          Retention figures are the companies&rsquo; own published statements,
          read on the date above. Where a figure came from a third party rather
          than the company, the table says so.
        </p>
        <ul className="flex list-disc flex-col gap-2 pl-5">
          <li>
            <a className="underline decoration-rule hover:text-ink" href="https://www.ilovepdf.com/blog/delete-file-from-ilovepdf" rel="noopener noreferrer" target="_blank">
              iLovePDF — deleting files and the retention window
            </a>
          </li>
          <li>
            <a className="underline decoration-rule hover:text-ink" href="https://pdf24.org/terms" rel="noopener noreferrer" target="_blank">
              PDF24 — general terms of use
            </a>
          </li>
          <li>
            <a className="underline decoration-rule hover:text-ink" href="https://pdf2go.com/blog/are-my-files-safe" rel="noopener noreferrer" target="_blank">
              PDF2Go — are my files safe
            </a>
          </li>
          <li>
            <a className="underline decoration-rule hover:text-ink" href="https://smallpdf.com/blog/what-happens-if-my-signed-document-expires" rel="noopener noreferrer" target="_blank">
              Smallpdf — signed document expiry
            </a>
          </li>
          <li>
            <a className="underline decoration-rule hover:text-ink" href="https://github.com/mtclab/localbench" rel="noopener noreferrer" target="_blank">
              localbench — static, browser-only file toolkit
            </a>
          </li>
        </ul>
      </Section>
    </ArticleLayout>
  );
}
