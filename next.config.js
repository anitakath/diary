/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "www.pexels.com",
      "www.dreamstime.com",
      "www.fressnapf.de",
    ],
  },
  env: {
    CDN_URL: process.env.CDN_URL,
  },
};

module.exports = nextConfig
