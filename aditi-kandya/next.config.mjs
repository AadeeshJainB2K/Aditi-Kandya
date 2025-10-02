/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/home/",
      permanent: true,
    },
  ],
};

export default nextConfig;
