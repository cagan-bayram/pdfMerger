import type { Metadata } from "next";
import { GuideLayout, GuideSection } from "@/components/guide-layout";

const href = "/merge-bank-statements";

export const metadata: Metadata = {
  title: "Merge bank statements into one PDF",
  description:
    "Mortgage brokers, landlords and visa officers usually ask for three to six months of statements as a single PDF. How to combine them in the right order, and the digital signature problem nobody warns you about.",
  alternates: { canonical: href },
};

const faq = [
  {
    q: "Does merging break my bank's digital signature?",
    a: "Yes, and this is true of every PDF tool, not just this one. A signature certifies an exact sequence of bytes; merging produces a new document, so the signature no longer validates. If your lender specifically asks for digitally signed originals, send the bank's files individually and do not merge them.",
  },
  {
    q: "My statements are password-protected. What do I do?",
    a: "Many banks encrypt statements with your date of birth or part of your account number. Open each one in a PDF reader, enter the password, then save an unlocked copy — in most readers, printing to PDF produces an unencrypted file. Add those copies to the stack. Locked files are refused rather than silently skipped.",
  },
  {
    q: "What order do lenders want?",
    a: "Oldest first unless told otherwise, so the document reads forward in time like a ledger. Whatever you choose, be consistent across every account you submit — a bundle that switches direction halfway through invites questions.",
  },
  {
    q: "Should I include the blank or summary pages?",
    a: "Yes. Include every page of every statement exactly as the bank issued it, including pages that say 'this page is intentionally blank' and the terms pages at the end. Statements are page-numbered, and a reviewer who sees page 3 of 4 missing will assume something was removed.",
  },
  {
    q: "Can I remove transactions I would rather not share?",
    a: "Do not. Altering a bank statement submitted for a mortgage, tenancy or visa application is fraud in most jurisdictions, and underwriters are practised at spotting edited PDFs and missing page numbers. If something on the statement needs explaining, explain it in a covering note instead.",
  },
];

export default function Page() {
  return (
    <GuideLayout
      href={href}
      title="Merge bank statements into one PDF"
      lede="Mortgage applications, rental references and visa submissions usually want three to six months of statements in a single file, while your bank gives you one PDF per month. Combining them is quick — but there are two traps worth knowing about first."
      faq={faq}
    >
      <GuideSection heading="Download the originals, do not screenshot">
        <p>
          Get the statement PDFs from your bank&rsquo;s site or app, not
          screenshots of the transaction list. Underwriters reject screenshots
          almost universally: they lack the account header, the page numbering
          and the running balance that make a statement verifiable.
        </p>
        <p>
          Download the full statement period rather than a custom date range
          export. A custom export is a different document in the eyes of most
          lenders, and often omits the opening and closing balances they check
          against each other.
        </p>
      </GuideSection>

      <GuideSection heading="The digital signature trap">
        <p>
          Some banks digitally sign their statement PDFs, which is what produces
          the blue &ldquo;Signed and all signatures are valid&rdquo; banner in
          Adobe Reader. That signature covers the exact bytes of that exact
          file.
        </p>
        <p>
          Merging necessarily creates a new document, so the signature does not
          survive — in any tool, not just this one. Usually nobody minds, because
          the reviewer is reading the numbers. But if your lender&rsquo;s
          checklist says &ldquo;digitally signed originals&rdquo;, send the
          individual files instead and let them do the collating. Check before
          you submit, not after.
        </p>
      </GuideSection>

      <GuideSection heading="Order them oldest first and check the count">
        <p>
          Put the earliest month at the top so the bundle reads forward in time.
          A reviewer scanning for a salary pattern or a deposit source is
          following the chronology, and making them work backwards through six
          months is a bad first impression on a document whose entire job is to
          inspire confidence.
        </p>
        <p>
          The page range beside each file is useful here as a check: six monthly
          statements of four pages each should land on a 24-page document. If
          the total is short, a statement downloaded as a partial export is the
          usual culprit.
        </p>
      </GuideSection>

      <GuideSection heading="Why these files should not go to an upload site">
        <p>
          A bank statement bundle is a complete financial profile: account and
          sort codes, your address, your employer, your salary, who you pay and
          when you are away from home. It is more revealing than almost anything
          else you own, and it is exactly the document people hand to free
          online tools without thinking.
        </p>
        <p>
          Merging in your browser keeps the bundle on your machine. The
          statements are read by the page, combined, and handed back as a
          download — no server receives them, because there is no server.
        </p>
      </GuideSection>
    </GuideLayout>
  );
}
