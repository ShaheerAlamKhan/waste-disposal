import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  basePath: '/waste-disposal',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
