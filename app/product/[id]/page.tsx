import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductById, getSimilarProducts, products } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return products.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const product = getProductById(id);
    if (!product) return { title: 'Product Not Found' };

    const allVariants = product.variants.flatMap(v => v.sizes);
    const inStock = allVariants.some(s => s.stock > 0);
    const images = product.variants.flatMap(v => v.sizes.flatMap(s => s.images)).filter(Boolean);
    const firstVariant = product.variants[0];

    console.log('Rendering ProductDetailClient for product:', product);

    return {
        title: `${product.title} — ${product.brand}`,
        description: product.description,
        keywords: [product.title, product.brand, product.category, ...product.tags],
        openGraph: {
            title: product.title,
            description: product.description,
            images: [{ url: images[0], width: 800, height: 800, alt: product.title }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description: product.description,
            images: [images[0]],
        },
        other: {
            'product:price:amount': String(firstVariant?.sizes?.[0]?.price),
            'product:price:currency': 'USD',
            'product:availability': inStock ? 'in stock' : 'out of stock',
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    const { id } = await params;
    const product = getProductById(id);
    if (!product) notFound();

    const similar = getSimilarProducts(product, 4);

    return <ProductDetailClient product={product} similar={similar} />;
}
