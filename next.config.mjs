import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const IMG_SERVER_PROTOCOL = process.env.IMG_SERVER_PROTOCOL;
const IMG_SERVER_HOSTNAME = process.env.IMG_SERVER_HOSTNAME;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: IMG_SERVER_PROTOCOL,
        hostname: IMG_SERVER_HOSTNAME,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
