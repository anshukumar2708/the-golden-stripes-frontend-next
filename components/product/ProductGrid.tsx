import Link from 'next/link';
import ProductCard from './ProductCard';
import type { Product } from '@/types';

interface ProductGridProps {
    title?: string;
    subtitle?: string;
    products: Product[];
    viewAllHref?: string;
    cols?: 2 | 3 | 4 | 5;
}

export default function ProductGrid({
    title,
    subtitle,
    products,
    viewAllHref,
    cols = 4,
}: ProductGridProps) {
    if (products.length === 0) return null;

    const colClass = {
        2: 'grid-cols-2',
        3: 'grid-cols-2 sm:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
        5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
    }[cols];

    return (
        <section className="py-8">
            {(title || viewAllHref) && (
                <div className="flex items-end justify-between mb-5">
                    <div>
                        {title && <h2 className="text-2xl font-display font-bold text-foreground">{title}</h2>}
                        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
                    </div>
                    {viewAllHref && (
                        <Link href={viewAllHref} className="text-sm font-semibold text-primary hover:underline flex-shrink-0">
                            View All →
                        </Link>
                    )}
                </div>
            )}
            <div className={`grid ${colClass} gap-3 sm:gap-4`}>
                {products.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                ))}
            </div>
        </section>
    );
}
