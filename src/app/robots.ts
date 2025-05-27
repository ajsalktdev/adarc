import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/login',
        '/signup',
        '/my-account',
        '/maincheckout',
        '/checkout',
        '/cartPage',
        '/reset-password',
        '/misc'
      ]
    },
    sitemap: 'https://newadarc.vercel.app/sitemap.xml'
  }
} 