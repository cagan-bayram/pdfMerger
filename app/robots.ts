import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Emitted as a file at build time, not served by a running route.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
