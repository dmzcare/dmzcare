import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /** Preserve originals: no Next.js recompression or format conversion */
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
