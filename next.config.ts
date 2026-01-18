import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  /* base config options here */

  // Enable standalone output for optimal Docker builds
  // This creates a minimal production build in .next/standalone
  output: "standalone",

  // optimized images
  images: {
    qualities: [75, 80],
    unoptimized: true,
  },
};

export default withBundleAnalyzer(nextConfig);
