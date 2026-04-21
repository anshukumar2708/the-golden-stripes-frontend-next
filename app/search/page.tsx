import type { Metadata } from 'next';
import { products, categories } from '@/data/products';
import SearchClient from './SearchClient';

interface PageProps {
    searchParams: Promise<{ q?: string; category?: string; tag?: string; sort?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { q, category } = await searchParams;
    const title = q
        ? `Search: "${q}"`
        : category
            ? `${categories.find(c => c.slug === category)?.name ?? 'Category'} — Shop All`
            : 'All Products';

    return {
        title,
        description: `Browse ${title} at ROSÉ Fashion. Find the best deals on fashion, electronics, beauty & more.`,
    };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const { q, category, tag, sort } = await searchParams;

    // Server-side filtering
    let filtered = [...products];

    if (q) {
        const query = q.toLowerCase();
        filtered = filtered.filter(
            p =>
                p.title.toLowerCase().includes(query) ||
                p.brand.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                p.tags.some(t => t.toLowerCase().includes(query))
        );
    }

    if (category && category !== 'all') {
        if (category === 'sale') {
            filtered = filtered.filter(p => p.tags.includes('sale'));
        } else {
            filtered = filtered.filter(p => p.category === category || p.subcategory === category);
        }
    }

    if (tag) {
        filtered = filtered.filter(p => p.tags.includes(tag));
    }

    // Sort
    if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
    else if (sort === 'newest') filtered = filtered.filter(p => p.tags.includes('new-arrivals')).concat(filtered.filter(p => !p.tags.includes('new-arrivals')));

    const activeCategory = categories.find(c => c.slug === category);

    return (
        <SearchClient
            initialProducts={filtered}
            query={q}
            categoryName={activeCategory?.name}
            tag={tag}
        />
    );
}
