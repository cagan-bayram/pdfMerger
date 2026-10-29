import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";
import { ImageConverter } from "@/components/image-converter";

const href = "/jpg-to-pdf";

export const metadata: Metadata = {
  title: "Convert JPG to PDF",
  description:
    "Turn photos and scans into a single PDF without uploading them. Works with JPG, PNG, WebP and HEIC, one image per page, in the order you choose.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Which image formats work?",
    a: "JPG and PNG are embedded directly. WebP, GIF, AVIF and HEIC are converted to JPEG by your browser first, which happens on your device like everything else. HEIC is the one to watch: Safari reads it, Chrome generally does not, and you will get a message saying so rather than a silent failure.",
  },
  {
    q: "My iPhone photos are HEIC. What do I do?",
    a: "Usually nothing — when you pick a photo through Safari's file picker, iOS hands the page a JPEG copy. If you do hit the HEIC message, either use Safari, or set Settings → Camera → Formats to 'Most Compatible' so the camera saves JPEGs from then on.",
  },
  {
    q: "Should I choose A4 or match the image?",
    a: "A4 for anything you will print or submit to a form — every page comes out the same size, which is what a caseworker or printer expects. Match the image when the pixels matter more than the paper, like a screenshot bundle, since it avoids any scaling at all.",
  },
  {
    q: "Does converting reduce quality?",
    a: "JPG and PNG are embedded as-is, with no recompression, so there is no loss at all. Formats that need converting first are re-encoded as JPEG at high quality, which is a small, usually invisible loss. Choosing A4 scales the image to fit the page but does not resample it.",
  },
  {
    q: "Can I combine the result with an existing PDF?",
    a: "Yes. Convert your images here, download the PDF, then use the merger on the home page to combine it with other documents. Scanned ID photos plus a filled form is the usual case.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Convert JPG to PDF"
      lede="Photos and scans go in, one PDF comes out, with each image on its own page in the order you set. Nothing is uploaded — the conversion runs in this tab, on your device."
      faq={faq}
      tool={<ImageConverter />}
    >
      <GuideSection heading="One image, one page, in your order">
        <p>
          Add your images and they appear as a stack. Drag a row, or use the
          arrows, and the page number beside each file updates so you can see
          exactly where each image lands before you convert anything.
        </p>
        <p>
          That ordering matters more than it sounds for the usual jobs here:
          identity documents where the photo page has to come first, receipts
          that should read in date order, or a set of scanned pages that arrived
          from the scanner named in the wrong sequence.
        </p>
      </GuideSection>

      <GuideSection heading="A4 or the image&rsquo;s own size">
        <p>
          <strong>A4</strong> puts each image, scaled to fit, on a standard page
          — portrait or landscape automatically, depending on the photo. Choose
          this for anything destined for a form, a printer or an official
          submission, where consistent page size is expected.
        </p>
        <p>
          <strong>Match the image</strong> makes each page exactly the
          image&rsquo;s pixel dimensions, with no scaling and no borders. Better
          for screenshots and anything where you want the pixels untouched.
        </p>
      </GuideSection>

      <GuideSection heading="Scanning tips that matter more than the tool">
        <p>
          A photographed page is the commonest reason an application gets sent
          back. Use your phone&rsquo;s document scanner rather than the camera —
          Notes on iOS, Google Drive on Android — which straightens the page and
          corrects the lighting. The result is both more legible and much
          smaller.
        </p>
        <p>
          Size adds up quickly here, because images are large and this tool does
          not compress them. Twenty camera photos can easily exceed a
          portal&rsquo;s upload limit once combined, so scan at a sensible
          resolution rather than the maximum your phone offers.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
