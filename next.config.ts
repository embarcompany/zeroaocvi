import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/zeroaocvi/apostila",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/zeroaocvi",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/zeroaocvi",
        destination: "/zeroaocvi/index.html",
      },
      {
        source: "/assets/:path*",
        destination: "/zeroaocvi/assets/:path*",
      },
    ];
  },
};

export default nextConfig;
