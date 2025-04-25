import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        // Optionally, you can restrict to specific paths:
        // pathname: '/products/**',
      },
    ],
  },
};

export default nextConfig;