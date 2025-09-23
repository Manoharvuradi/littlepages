import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin',
        permanent: true, // Use 308 for permanent redirects, or false for temporary (307)
      },
    ];
  },
};

export default nextConfig;
