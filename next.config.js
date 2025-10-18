/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // appDir is now stable in Next.js 14, no need for experimental flag
  
  // Better handling of dynamic imports and external libraries
  transpilePackages: ['@splinetool/react-spline', '@splinetool/runtime'],
  
  // Webpack configuration for better error handling
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
