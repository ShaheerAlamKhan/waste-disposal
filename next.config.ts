import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/waste-disposal',
  images: {
    unoptimized: true,
  },
  // Prevent crawler indexing
  reactStrictMode: true,
  trailingSlash: true,
};

export default nextConfig;
