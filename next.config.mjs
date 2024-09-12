import path from 'path';

/** @param {import('next').NextConfig} config */
async function configureNext(config) {
  if (process.env.ANALYZE === '1') {
    const bundleAnalyzer = (await import('@next/bundle-analyzer')).default;

    return bundleAnalyzer({ enabled: true, openAnalyzer: true })(config);
  }

  return config;
}

/** @type {import('next').NextConfig} */
const nextConfig = await configureNext({
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
});

export default nextConfig;
