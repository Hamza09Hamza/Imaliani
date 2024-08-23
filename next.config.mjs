/** @type {import('next').NextConfig} */
const nextConfig = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      experiments: {
        asyncWebAssembly: true,
      },
    },
  },

  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "images.unsplash.com"],
  },
};

export default nextConfig;
