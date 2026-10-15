import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-cv-and-cover-letter";

export const metadata: Metadata = {
  title: "Combine a CV and cover letter into one PDF",
  description:
    "Many application forms accept only one file. How to combine a CV and cover letter in the right order, name the file so a recruiter can find it, and avoid breaking applicant tracking systems.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Which should come first, the CV or the cover letter?",
    a: "The cover letter, unless the instructions say otherwise. It is the shorter document and the one written for that specific role, so it reads as an introduction to the CV behind it. A reader who opens on page one of your CV has to go looking for the letter.",
  },
  {
    q: "Does merging break applicant tracking systems?",
    a: "No, provided both documents were text-based to begin with. Merging copies pages across without recompressing or rasterising anything, so the text stays selectable and machine-readable. What does break parsing is submitting a scan or a photograph of a document, because then there is no text to extract — only an image of one.",
  },
  {
    q: "What should I call the file?",
    a: "Your name and what it is: Jane-Smith-Application.pdf or Jane-Smith-CV.pdf. A recruiter may have two hundred files in one folder, and 'merged.pdf' or 'document-final-v3.pdf' makes yours the hard one to find. You can set the name in the Save as box above before downloading.",
  },
  {
    q: "Should I add my portfolio, references or certificates?",
    a: "Only if they were asked for. A two-page application becoming a fourteen-page bundle reads as padding, and the reviewer who has to scroll past nine certificates to reach your experience is not in a generous mood. Keep extras for when they are requested or for a link in the letter.",
  },
  {
    q: "Will the formatting change when I merge?",
    a: "No. Page content, fonts, layout and images are copied exactly as they were. Pages can be different sizes — an A4 CV and a US Letter cover letter will stay their original sizes in the merged file, which is fine on screen but can look slightly inconsistent if printed.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Combine a CV and cover letter into one PDF"
      lede="Plenty of application forms give you a single upload field, and some portals quietly reject the second file you attach. Combining them yourself means you choose the order a recruiter reads in, rather than leaving it to chance."
      faq={faq}
    >
      <GuideSection heading="Export both as PDF first">
        <p>
          Export from Word or Google Docs as PDF rather than sending the
          original documents. A .docx renders differently on a machine without
          your fonts, and the one thing worse than an unread application is one
          that arrives with the layout collapsed.
        </p>
        <p>
          Use the export or &ldquo;Download as PDF&rdquo; option rather than
          printing to PDF where you have the choice. Export preserves the text
          layer and any hyperlinks — your email address and portfolio link stay
          clickable, which printing sometimes flattens.
        </p>
      </GuideSection>

      <GuideSection heading="Cover letter first, then the CV">
        <p>
          Add the cover letter to the stack first so it lands on page one. The
          page range beside each file shows exactly where each document starts,
          so a two-page letter followed by a two-page CV should read p. 1&ndash;2
          then p. 3&ndash;4 before you download anything.
        </p>
        <p>
          Then set the file name in the Save as box. Your own name belongs in
          it. This is the single cheapest thing you can do to look organised,
          and a surprising number of applicants skip it.
        </p>
      </GuideSection>

      <GuideSection heading="When not to merge">
        <p>
          If the form has separate fields labelled CV and cover letter, use
          them. Some systems route the two documents to different reviewers or
          parse them with different rules, and a combined file in the CV slot
          means your letter may never be read.
        </p>
        <p>
          Equally, if the instructions name a format — a particular file name,
          or a maximum page count, or &ldquo;CV only, no cover letter&rdquo; —
          follow it exactly. Application screening starts with whether you can
          follow a specification.
        </p>
      </GuideSection>

      <GuideSection heading="Check it the way a recruiter will">
        <p>
          Open the merged file and read it start to finish. Check the letter is
          first, that no page is duplicated, that the total page count is what
          you intended, and that the text is still selectable — try highlighting
          a line. If you cannot select your own name, neither can the parser
          that is about to read your application.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
