import type { NextConfig } from "next";

const apiUrl = process.env.API_URL;
if (!apiUrl) {
  throw new Error("API_URL is not set (see apps/frontend/.env.example)");
}

const nextConfig: NextConfig = {
  // Same-origin API keeps the session cookie first-party in every environment.
  rewrites: async () => [{ source: "/api/:path*", destination: `${apiUrl}/:path*` }],
};

export default nextConfig;
