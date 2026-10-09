import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: every route is HTML/CSS/JS on a CDN, no server runtime.
  // Merging happens in the browser, so there is nothing for a server to do.
  output: "export",
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
