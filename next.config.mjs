/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack mis-infers the workspace root when a pnpm-workspace.yaml is
  // present; pin it to the project directory so `next` resolves correctly.
  // process.cwd() is guaranteed to be the project dir (next dev/build run
  // from the project root) — import.meta.dirname is unreliable inside
  // Next's bundled config loader.
  turbopack: {
    root: process.cwd(),
  },
  output: "standalone",
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Cache static assets aggressively
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/audio/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
