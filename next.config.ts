import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> `out/`. Deployable to GitHub Pages exactly like the
  // current ubcrover.github.io repo, or to Vercel/Netlify unchanged.
  output: "export",

  // The export target has no Node image optimizer at runtime, so images are
  // served exactly as they sit in public/media (originals, per team decision).
  // `bun run optimize:media` regenerates compressed derivatives when wanted.
  images: { unoptimized: true },

  // Emits /team/index.html rather than /team.html so any static host resolves
  // clean URLs without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
