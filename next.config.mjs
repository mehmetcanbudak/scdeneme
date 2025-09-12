/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'dynamic-spirit-b1c4404b11.strapiapp.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://dynamic-spirit-b1c4404b11.strapiapp.com',
  },
  experimental: {
    scrollRestoration: true,
  },
}

export default nextConfig
