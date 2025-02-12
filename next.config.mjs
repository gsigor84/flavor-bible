/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "cdn.trendhunterstatic.com"], // ✅ Correct domains
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL, // ✅ Load env variable
  },
};

export default nextConfig;
