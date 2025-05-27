module.exports = {
  images: {
    // domains: ['mrrobot007.pythonanywhere.com'], // Allow external image domain
    domains: ['demo.adarcuae.com'], // Allow external image domain

  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during builds
  },
  experimental: {

    // Add any experimental configurations here
  },
  trailingSlash: true, // Ensure all URLs have a trailing slash
};