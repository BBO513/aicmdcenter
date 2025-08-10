
/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  eslint: {
    // Warning: Temporarily ignore build errors for MVP
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
