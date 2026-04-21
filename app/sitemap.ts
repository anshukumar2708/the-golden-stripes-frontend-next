import { MetadataRoute } from 'next';
import { products, categories } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://rose-fashion.vercel.app';

  const productPages = products.map(p => ({
    url: `${base}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.filter(c => c.slug !== 'all').map(c => ({
    url: `${base}/search?category=${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...categoryPages,
    ...productPages,
  ];
}
