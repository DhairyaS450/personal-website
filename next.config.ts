import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // configure images
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
