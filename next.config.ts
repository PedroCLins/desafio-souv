import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      "@/lib": path.resolve(__dirname, "src/lib"),
      "@/utils": path.resolve(__dirname, "src/utils"),
      "@components": path.resolve(__dirname, "src/components/index.ts"),
      "lib": path.resolve(__dirname, "src/lib"),
      "lib/utils": path.resolve(__dirname, "src/lib/utils"),
      "utils": path.resolve(__dirname, "src/lib/utils"),
    };
    return config;
  },
};

export default nextConfig;