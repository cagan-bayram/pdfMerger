import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: every route is HTML/CSS/JS on a CDN, no server runtime.
  // Merging happens in the browser, so there is nothing for a server to do.
  output: "export",
  // Set by `next upgrade --agent=security` when moving to 16.4.3.
  experimental: { agentUpgrade: "security" },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
