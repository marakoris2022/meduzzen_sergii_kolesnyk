import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMG_SERVER_PROTOCOL || "http",
        hostname: process.env.NEXT_PUBLIC_IMG_SERVER_HOSTNAME || "localhost",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
