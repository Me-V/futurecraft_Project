import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["fakestoreapi.com"], // This is simpler but less secure than remotePatterns
  },
};

export default nextConfig;
