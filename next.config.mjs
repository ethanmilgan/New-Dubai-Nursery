/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    // Sanity already serves resized images; local fallbacks are optimized WebP.
    unoptimized: true,
    remotePatterns: [{protocol: 'https', hostname: 'cdn.sanity.io', pathname: '/images/jkg6va26/production/**'}],
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
