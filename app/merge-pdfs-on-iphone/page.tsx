import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-pdfs-on-iphone";

export const metadata: Metadata = {
  title: "Merge PDFs on iPhone or iPad",
  description:
    "Combine PDF files on iOS in Safari, with no app to install, no account, and no subscription. Works with files from iCloud Drive, Mail attachments and the Files app.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Do I need to install an app?",
    a: "No. This runs in Safari — or Chrome, or Firefox — on iOS. Most PDF mergers in the App Store are subscription-based and upload your files to their servers to do the work, which is a lot of commitment for a job that takes a few seconds in a browser tab.",
  },
  {
    q: "Where does the merged file save on an iPhone?",
    a: "Safari puts downloads in the Files app, under Downloads on your iPhone or in iCloud Drive depending on your setting. You can change the destination in Settings, Safari, Downloads. After the download finishes, the arrow icon in Safari's address bar links straight to the file.",
  },
  {
    q: "Can I use files stored in iCloud Drive?",
    a: "Yes. Tap Choose files, then Browse, and navigate to iCloud Drive or any other location the Files app can see, including Google Drive and Dropbox if those apps are installed. You can also pick files you received as Mail attachments once you have saved them to Files.",
  },
  {
    q: "Does it work without a connection?",
    a: "Yes, once the page has loaded. The merging code is already in the browser at that point, so you can switch to airplane mode and it still works. That is also the clearest proof your documents are not being uploaded.",
  },
  {
    q: "Can I merge photos or scans into a PDF?",
    a: "Not directly — this tool takes PDFs only. iOS can convert for you: in the Files app, select the images, press and hold, and choose Create PDF. To scan paper, open Notes, tap the camera icon, and choose Scan Documents, which produces a far better result than photographing a page.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Merge PDFs on iPhone or iPad"
      lede="iOS has no built-in way to combine two PDFs, which is why the App Store is full of subscription apps for it. You do not need one — your browser can do the whole job, offline, without your files leaving the phone."
      faq={faq}
    >
      <GuideSection heading="The whole flow, on a phone">
        <p>
          Tap <strong>Choose files</strong> above. The iOS picker opens;
          use <strong>Browse</strong> to reach the Files app, where you can
          select from On My iPhone, iCloud Drive, or any cloud service you have
          installed. You can select several PDFs at once.
        </p>
        <p>
          The files appear as a stack. Drag the handle on the left of a row to
          reorder, or use the arrows, which are easier to hit accurately on a
          small screen. Each row shows the page range that document will occupy
          in the finished file, so you can confirm the order before committing
          to it.
        </p>
        <p>
          Tap Merge, then Download. Safari saves the file and shows the download
          arrow in the address bar; from there you can open it, rename it, or
          share it straight into an email or upload form.
        </p>
      </GuideSection>

      <GuideSection heading="Why the App Store route is worse">
        <p>
          Search the App Store for a PDF merger and nearly every top result is
          free to install and then asks for a weekly or yearly subscription
          before it will export. Many also do the merge on their own servers,
          which means your documents are uploaded from your phone to a company
          you picked from a list of near-identical icons.
        </p>
        <p>
          For a task you might do three times a year, that is a poor trade. A
          browser tab has no install, no account, no subscription, and nothing
          to delete afterwards.
        </p>
      </GuideSection>

      <GuideSection heading="Watch the file size on mobile">
        <p>
          The merge happens in your phone&rsquo;s memory, which is more limited
          than a laptop&rsquo;s. A few hundred megabytes is comfortable on a
          recent iPhone; much more and the tab may become unresponsive or
          reload.
        </p>
        <p>
          If you are merging camera scans, this matters more than you would
          expect — a photographed page can be several megabytes, so twenty pages
          adds up quickly. Scanning through Notes rather than the camera roll
          produces much smaller files for the same legibility.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
