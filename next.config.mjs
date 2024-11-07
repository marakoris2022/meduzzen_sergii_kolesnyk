import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMG_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_IMG_SERVER_HOSTNAME,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
