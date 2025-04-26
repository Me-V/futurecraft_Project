import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        // Optionally, you can restrict to specific paths:
        // pathname: '/products/**',
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        // Optionally, you can restrict to specific paths:
        // pathname: '/products/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // Optionally, you can restrict to specific paths:
        // pathname: '/products/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
