import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Next.js development overlay
  devIndicators: {
    position: 'bottom-right',
  },
  // Disable Next.js powered by header
  poweredByHeader: false,
};

export default nextConfig;
