import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.themoviedb.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.mydramalist.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'phim.nguonc.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
