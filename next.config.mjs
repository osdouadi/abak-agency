import createNextIntilPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const withNextIntl = createNextIntilPlugin();

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "uploadthing.com",
        pathname: "**",
      },
       {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "**",
      },
       {
        protocol: "https",
        hostname: "img.clerk.com",
        pathname: "**",
      },
    ],
  },

  reactStrictMode: false,
};

export default withNextIntl(nextConfig);
