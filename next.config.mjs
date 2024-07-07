/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {instrumentationHook: true},
  images: {
    domains: ["uploadthing.com", "utfs.io", "img.clerk.com", "subdomain"],
  },
  reactStrictMode: false,
};

export default nextConfig;
