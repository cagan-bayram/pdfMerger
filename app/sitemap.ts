import type { MetadataRoute } from "next";
import { guides } from "@/components/site-chrome";
import { SITE_URL } from "@/lib/site";

// Emitted as a file at build time, not served by a running route.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, priority: 1 },
    ...guides.map((guide) => ({
      url: `${SITE_URL}${guide.href}`,
      lastModified: now,
      priority: 0.8,
    })),
    { url: `${SITE_URL}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, priority: 0.3 },
  ];
}
