/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/jkg6va26/production/**'}],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
