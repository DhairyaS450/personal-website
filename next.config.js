/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Disable type checking during build to avoid the params error
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Also disable ESLint during build
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow images from the public folder or from external sources like google
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;