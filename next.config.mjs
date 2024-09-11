import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(import.meta.dirname, 'src/app')],
    prependData: `@import "./variables.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**',
      },
    ],
  },
};

export default nextConfig;
