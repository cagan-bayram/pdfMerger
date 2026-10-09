// Change this to your real domain before launch: it drives canonical URLs,
// OG tags, robots.txt and sitemap.xml. AdSense also wants a real domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quire-beryl.vercel.app";

export const SITE_NAME = "Stack PDF";
export const SITE_TAGLINE = "Merge PDFs in your browser";

// Set to your AdSense publisher id (ca-pub-XXXXXXXXXXXXXXXX) once approved.
// While empty, ad slots render as reserved placeholders and no ad script loads.
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
