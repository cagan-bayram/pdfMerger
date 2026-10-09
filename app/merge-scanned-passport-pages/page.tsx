import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-scanned-passport-pages";

export const metadata: Metadata = {
  title: "Merge scanned passport pages into one PDF",
  description:
    "Visa and bank portals usually demand a single PDF of your passport. How to scan the pages, put them in the order the form expects, and combine them without uploading your ID to a stranger's server.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Can I merge JPG or PNG scans?",
    a: "Not directly — this tool combines PDFs only. If your scanner produced images, convert them to PDF first. On Windows, select the images, right-click and Print, then choose 'Microsoft Print to PDF'. On a Mac, select them in Finder, right-click and choose Quick Actions, then Create PDF. On a phone, the Notes or Files app can scan straight to PDF.",
  },
  {
    q: "Does merging reduce the quality of my scans?",
    a: "No. Pages are copied across exactly as they are — same resolution, same images, no recompression. A merged file is roughly the sum of its parts in size, which is sometimes the problem rather than the solution.",
  },
  {
    q: "The portal rejects my file for being too large. What now?",
    a: "This tool does not compress, so merging will not shrink anything. Rescan at 200–300 dpi rather than 600, and choose grayscale unless colour is required — that alone often cuts the size by more than half. Scanning to 'PDF' rather than 'PDF (high quality)' in most scanner apps does the same job.",
  },
  {
    q: "My scan is password-protected. Can I still merge it?",
    a: "Not while it is locked. Open it in a PDF reader, enter the password, and save or print an unlocked copy, then add that copy to the stack. Encrypted files are refused with a message rather than silently skipped.",
  },
  {
    q: "What order should the pages be in?",
    a: "Follow the form's instruction if it gives one. When it does not, the convention is the photo page first, then any page showing a signature, then visas and stamps in date order. The page range beside each file in the stack shows exactly where it will land in the final document.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Merge scanned passport pages into one PDF"
      lede="Visa applications, bank onboarding and employer right-to-work checks nearly always want one PDF, while your scanner produces one file per page. Here is how to combine them in the right order — without handing your identity documents to an upload site."
      faq={faq}
    >
      <GuideSection heading="Scan once, properly">
        <p>
          Most rejected applications fail on legibility, not format. Scan at
          300 dpi — higher just inflates the file without adding readable
          detail. Use colour for the photo page, since some portals require the
          security features to be visible, and keep the whole page in frame
          including the machine-readable strip at the bottom.
        </p>
        <p>
          Phone photos are accepted by many portals but are the most common
          cause of a resubmission. If you must use a phone, use its document
          scanner mode rather than the camera: the Notes app on iOS and Google
          Drive on Android both deskew the page and output a PDF directly.
        </p>
      </GuideSection>

      <GuideSection heading="Put the pages in the order the form expects">
        <p>
          Order is not cosmetic here. A caseworker opening your file expects the
          photo page first; a document that opens on a blank visa page from 2019
          reads as careless, and some automated checks look at the first page
          specifically.
        </p>
        <p>
          Drag the rows above into order, or use the arrows. The page range
          beside each file updates as you go, so you can confirm the photo page
          really is page 1 before you download anything — and check the total
          page count against whatever the form asked for.
        </p>
      </GuideSection>

      <GuideSection heading="Why not to upload your passport to a random merger">
        <p>
          A passport scan is the single most useful document an identity thief
          can obtain. It contains your full name, date of birth, nationality,
          document number and signature — enough to open accounts in your name
          in many jurisdictions.
        </p>
        <p>
          Free upload-based tools routinely hold files for hours after
          processing, and their privacy policies usually reserve the right to
          store them longer. You are trusting a company you have never heard of,
          and its hosting provider, and whoever eventually buys it. Merging in
          your own browser removes that question rather than answering it.
        </p>
      </GuideSection>

      <GuideSection heading="Before you submit">
        <p>
          Open the merged file and read it the way the caseworker will. Check
          the page order, that nothing is upside down, that the text is sharp at
          100% zoom, and that no page is missing. Then check the portal&rsquo;s
          file size limit — commonly 2 MB to 5 MB, which a colour scan of six
          pages can easily exceed.
        </p>
        <p>
          Keep the individual scans as well as the merged file. If the portal
          rejects the combined document, you can reorder and recombine in
          seconds rather than scanning again.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
