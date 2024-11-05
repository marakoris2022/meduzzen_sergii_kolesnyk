import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const IMG_PROTOCOL = process.env.IMG_PROTOCOL || "http";
const IMG_HOSTNAME = process.env.IMG_HOSTNAME || "51.20.210.187";

console.log("next.config", IMG_PROTOCOL, IMG_HOSTNAME);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: IMG_PROTOCOL,
        hostname: IMG_HOSTNAME,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
