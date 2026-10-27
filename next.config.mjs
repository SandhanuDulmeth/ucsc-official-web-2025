/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ucsc-official-web-2025",
  assetPrefix: "/ucsc-official-web-2025",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
