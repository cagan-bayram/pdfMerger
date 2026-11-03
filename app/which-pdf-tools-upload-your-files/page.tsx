import type { Metadata } from "next";
import {
  ArticleLayout,
  FindingsTable,
  Section,
  type Finding,
} from "@/components/article-layout";

const href = "/which-pdf-tools-upload-your-files";

export const metadata: Metadata = {
  title: "Which free PDF tools upload your files?",
  description:
    "Some browser PDF tools send your document to a server. Some never do. A method anyone can repeat in thirty seconds, and what it showed across a dozen tools.",
  alternates: { canonical: href },
};

const rows: Finding[] = [
  {
    tool: "Stack PDF",
    uploads: "no",
    offline: "No request carried the file. The only POST was a pageview beacon of a few hundred bytes.",
    stated: "No server to retain anything",
    note: "This site. See the disclosure above.",
  },
  {
    tool: "iLovePDF",
    uploads: "yes",
    offline: "Two POSTs to api22.ilovepdf.com/v1/upload, one per file, on selecting them — before pressing merge.",
    stated: "“Completely deleted within 2 hours of upload”, plus a Delete it now control on the download page",
  },
  {
    tool: "Smallpdf",
    uploads: "yes",
    offline: "Two PUTs to files-upload.r2.smallpdf.com, one per file, then a processing task created. On selection.",
    stated: "14 days for eSign documents; the window for the ordinary tools was not stated in the sources found",
    note: "Files go to object storage, not only to memory",
  },
  {
    tool: "PDF24 (web tools)",
    uploads: "yes",
    offline: "Two POSTs to filetools48.pdf24.org/client.php?action=upload, one per file, on selection.",
    stated: "“The copy of the user documents processed on the provider’s servers is completely deleted after one hour” (terms, 2.5)",
  },
  {
    tool: "Sejda (web)",
    uploads: "blocked",
    offline: "The upload widget came up in an error state in the automated session and never offered a file picker.",
    stated: "2 hours per a third-party review; not confirmed from Sejda's own policy",
    note: "Its desktop app is said not to upload at all",
  },
  {
    tool: "CoolPDF",
    uploads: "blocked",
    offline: "getcoolpdf.com did not resolve on the test date.",
    stated: "Claims no backend at all",
    note: "Open source, AGPL-3.0",
  },
  {
    tool: "PDF2Go",
    uploads: "pending",
    offline: "—",
    stated: "“Deleted automatically according to our privacy policy schedule” — no window given on its security page. Says it keeps no backups of transmitted files",
    note: "A widely repeated “24 hours or 10 downloads” figure does not appear on its own pages",
  },
  {
    tool: "Adobe Acrobat online",
    uploads: "pending",
    offline: "—",
    stated: "Not checked",
  },
  {
    tool: "PDFyogi",
    uploads: "pending",
    offline: "—",
    stated: "Claims browser-only processing",
  },
  {
    tool: "PDFTasker",
    uploads: "pending",
    offline: "—",
    stated: "Claims browser-only processing",
  },
  {
    tool: "localbench",
    uploads: "pending",
    offline: "—",
    stated: "Static, open source, CSP blocks outbound requests",
    note: "Auditable from source rather than by observation",
  },
];

export default function Page() {
  return (
    <ArticleLayout
      title="Which free PDF tools upload your files?"
      standfirst="Two tools can look identical and work completely differently: one sends your document to a company's server, the other never lets it leave your laptop. Nothing on either page tells you which you are using. Here is a test that takes thirty seconds, and what it showed."
      dateline="Tested 3 November 2026"
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
          Every tool was given the same pair of two-page PDFs, 1.4 MB each,
          padded with random noise so that an upload would be unmistakable in a
          network log by size alone. The files contained nothing real. Consent
          dialogs were refused wherever a refuse option existed.
        </p>
        <p>
          <strong>How this was run matters, so here it is plainly:</strong> the
          sessions were driven by an automated browser rather than by hand,
          and the result is the network log, not the offline test described
          above. That is a weaker method in one specific way — a site can serve
          different code to something it suspects is a bot, and two of the
          tools below never reached a working state at all, which may be
          exactly that. Where a session did not complete, the row says
          &ldquo;could not test&rdquo; rather than guessing. The offline test
          is still the one to use yourself; it needs no tooling and cannot be
          fooled.
        </p>
        <p>
          The stated retention column is from each company&rsquo;s own
          published material, linked at the end, and was not tested.
        </p>
        <FindingsTable rows={rows} />
      </Section>

      <Section heading="Every upload happened before I pressed the button">
        <p>
          The detail that surprised me: in all three cases the upload fired the
          moment the file was <em>selected</em>, not when the merge was
          requested. By the time you have read the options and decided whether
          to continue, your document is already on their server.
        </p>
        <p>
          That matters for the common situation of changing your mind. Picking
          a file to see whether a tool looks trustworthy, then closing the tab,
          does not keep the document on your machine — it has already left.
        </p>
      </Section>

      <Section heading="A note on the consent dialogs">
        <p>
          Not what I set out to measure, but hard to miss. Two of the three
          offered no one-click way to refuse: iLovePDF presented
          &ldquo;Accept all&rdquo; alongside &ldquo;Manage Options&rdquo;, and
          PDF24 presented &ldquo;Accept all&rdquo; alongside
          &ldquo;Settings&rdquo;. Refusing took several more clicks than
          accepting in both.
        </p>
        <p>
          PDF24&rsquo;s dialog named 1,809 advertising partners;
          iLovePDF&rsquo;s named 154 TCF vendors and 53 ad partners. GDPR
          requires that withdrawing consent be as easy as giving it, which is
          the basis on which regulators have fined far larger companies for
          this exact layout.
        </p>
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
          The iLovePDF and PDF24 figures were read directly from the pages
          below and are quoted verbatim. PDF2Go&rsquo;s was checked the same
          way, which is how I found that the &ldquo;24 hours or 10
          downloads&rdquo; number repeated across comparison sites is not on
          PDF2Go&rsquo;s own pages — a small illustration of why the primary
          source is worth opening. Sejda&rsquo;s remains third-party and the
          table says so.
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
            <a className="underline decoration-rule hover:text-ink" href="https://www.pdf2go.com/security" rel="noopener noreferrer" target="_blank">
              PDF2Go — security
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
