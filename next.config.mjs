/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack mis-infers the workspace root when a pnpm-workspace.yaml is
  // present; pin it to the project directory so `next` resolves correctly.
  turbopack: {
    root: import.meta.dirname,
  },
  // Standalone output for the Docker runner stage.
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
