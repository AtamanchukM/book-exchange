import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["share.google"], // додай сюди потрібний домен
  },
};

export default nextConfig;
