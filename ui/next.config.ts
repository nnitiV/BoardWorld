import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5173",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "hatrabbits.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;