import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Use this app folder as Turbopack root when another lockfile exists higher up (e.g. home dir).
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
