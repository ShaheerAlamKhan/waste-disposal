import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only apply GitHub Pages settings in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    distDir: 'docs',
    basePath: '/waste-disposal',
    trailingSlash: true,
  }),
  
  images: {
    unoptimized: true,
  },
  // Prevent crawler indexing
  reactStrictMode: true,
};

export default nextConfig;
