/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/assets/:path*", destination: "/api/media/assets/:path*" },
        { source: "/forms/:path*", destination: "/api/media/forms/:path*" }
      ],
      afterFiles: [],
      fallback: []
    };
  }
};

export default nextConfig;
