import { MetadataRoute } from 'next'
import fetchApiData from '@/config/fetch-api-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get current date for lastModified
  const currentDate = new Date().toISOString()

  // Base URL from your existing sitemap
  const baseUrl = 'https://adarc-two.vercel.app'

  // Static routes from your existing sitemap
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/best-deals/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trending-products/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8, // updated from 0.9 to 0.8 to match the XML
    },
    {
      url: `${baseUrl}/new-arrival/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/powered-by-msi/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/powered-by-asus/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/powered-by-asus/powered-by-content-creation/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/powered-by-asus/powered-by-asus-gaming/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/office-solutions/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/computer-peripherals/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gaming/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/components-storage/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/computer-systems/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/security-surveillance/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/networking/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/software/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/motherboards/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/power-supplies/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/video-graphics-cards/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hp/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dell/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/hikvision/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/intel/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ]

  // Fetch dynamic product routes
  try {
    const response = await fetchApiData<any>('products/list-products/');

    if (response?.status_code === 6000 && response?.data) {
      const productRoutes = response.data.map((product: any) => ({
        url: `${baseUrl}/product/${product?.slug || product?.name?.toLowerCase().replace(/\s+/g, '-')}`,
        lastModified: product?.updated_at || currentDate,
        changeFrequency: 'daily' as const,
        priority: 0.9, // Higher priority for product pages
        // Add additional SEO metadata for product pages
        alternates: {
          canonical: `${baseUrl}/product/${product.slug || product.name?.toLowerCase().replace(/\s+/g, '-')}`,
        },
        // Add product images if available
        images: product.images?.map((image: string) => `${baseUrl}${image}`) || [],
      }));

      return [...staticRoutes, ...productRoutes];
    }
  } catch (error) {
    console.error('Error fetching product routes:', error);
  }

  return staticRoutes;
} 