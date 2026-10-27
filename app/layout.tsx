import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Archivo, Public_Sans } from "next/font/google";
import { ADSENSE_CLIENT, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Combine PDF files into one without uploading them. Merging happens in your browser, so your documents never reach a server. Free, no sign-up, no file limits.",
  applicationName: SITE_NAME,
  // No canonical here on purpose: a canonical in the root layout is inherited
  // by every page that does not set its own, which tells Google those pages are
  // duplicates of the homepage. Each page declares its own.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Combine PDF files into one without uploading them. Everything happens in your browser.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-desk">
        {children}
        {/* Page counts only: no cookie, no cross-site profile, no personal
            data. The privacy page describes exactly this — keep them in step. */}
        <Analytics />
        {/* A plain tag rather than next/script: `afterInteractive` injects the
            script client-side, leaving only a preload hint in the HTML, and
            AdSense asks for the snippet itself between the head tags. React
            hoists this into <head> while `async` keeps it off the critical
            path. */}
        {ADSENSE_CLIENT ? (
          <script
            async
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        ) : null}
      </body>
    </html>
  );
}
