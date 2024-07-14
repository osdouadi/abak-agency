import createNextIntilPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntilPlugin();

const nextConfig = {
  experimental: { instrumentationHook: true },
  images: {
    domains: ["uploadthing.com", "utfs.io", "img.clerk.com", "subdomain"],
  },
  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
