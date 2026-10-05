import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The can renders carry fine engraving; AVIF holds it at a fraction of WebP's weight.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
