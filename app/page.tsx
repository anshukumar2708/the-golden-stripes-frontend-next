import type { Metadata } from 'next';
import { products } from '@/data/products';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryBar from '@/components/home/CategoryBar';
import ProductGrid from '@/components/product/ProductGrid';
import PromoStrip from '@/components/home/PromoStrip';

export const metadata: Metadata = {
    title: 'ROSÉ Fashion — Elegant Modern Shopping',
    description: 'Discover the latest fashion trends, electronics, beauty products, and more at ROSÉ. New arrivals, trending items, and exclusive deals every day.',
};

// SSR — data is fetched server-side
export default async function HomePage() {
    const newArrivals = products.filter(p => p.tags.includes('new-arrivals'));
    const trending = products.filter(p => p.tags.includes('trending'));
    const bestSellers = products.filter(p => p.tags.includes('best-seller'));
    const sale = products.filter(p => p.tags.includes('sale'));
    const electronics = products.filter(p => p.category === 'electronics');
    const beauty = products.filter(p => p.category === 'beauty');
    const furniture = products.filter(p => p.category === 'furniture');
    const menProducts = products.filter(p => p.category === 'men');
    const kidsProducts = products.filter(p => p.category === 'kids');
    const watches = products.filter(p => p.subcategory === 'watches-men' || p.subcategory === 'watches-women');

    return (
        <div className="pb-8">
            {/* Hero Carousel */}
            <div className="container mx-auto px-4">
                <HeroCarousel />
            </div>

            {/* Category Grid */}
            <div className="container mx-auto px-4">
                <CategoryBar />

                {/* Promo Strip */}
                <PromoStrip />
            </div>

            {/* New Arrivals */}
            <div className="container mx-auto px-4">
                <ProductGrid
                    title="New Arrivals"
                    subtitle="Fresh styles just dropped"
                    products={newArrivals}
                    viewAllHref="/search?tag=new-arrivals"
                />

                {/* Trending Now */}
                <ProductGrid
                    title="Trending Now"
                    subtitle="What everyone's wearing"
                    products={trending}
                    viewAllHref="/search?tag=trending"
                />
            </div>

            {/* Banner — full width */}
            <section className="my-8 overflow-hidden relative h-52 sm:h-64 md:h-72 w-full">
                <div className="absolute inset-0 gradient-primary opacity-90" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold drop-shadow">Sale is Live 🔥</h2>
                    <p className="mt-2 text-white/85 text-base sm:text-lg md:text-xl">Up to 50% off on top brands</p>
                    <a href="/search?category=sale" className="mt-5 bg-white text-primary font-semibold px-8 py-3 rounded-full text-base hover:bg-white/90 transition-colors">
                        Shop Sale
                    </a>
                </div>
            </section>

            <div className="container mx-auto px-4">

                {/* Best Sellers */}
                <ProductGrid
                    title="Best Sellers"
                    subtitle="Loved by thousands"
                    products={bestSellers}
                    viewAllHref="/search?tag=best-seller"
                />

                {/* Electronics */}
                {electronics.length > 0 && (
                    <ProductGrid
                        title="Electronics"
                        subtitle="Mobiles, Laptops, TVs & more"
                        products={electronics}
                        viewAllHref="/search?category=electronics"
                    />
                )}

                {/* Men's Fashion */}
                {menProducts.length > 0 && (
                    <ProductGrid
                        title="Men's Fashion"
                        subtitle="Style essentials for men"
                        products={menProducts}
                        viewAllHref="/search?category=men"
                    />
                )}

                {/* Beauty */}
                {beauty.length > 0 && (
                    <ProductGrid
                        title="Beauty & Skincare"
                        subtitle="Glow up with top picks"
                        products={beauty}
                        viewAllHref="/search?category=beauty"
                    />
                )}

                {/* Kids */}
                {kidsProducts.length > 0 && (
                    <ProductGrid
                        title="Kids' Collection"
                        subtitle="Fun styles for little ones"
                        products={kidsProducts}
                        viewAllHref="/search?category=kids"
                    />
                )}

                {/* Watches */}
                {watches.length > 0 && (
                    <ProductGrid
                        title="Watches"
                        subtitle="Timepieces for men & women"
                        products={watches}
                        viewAllHref="/search?category=watches-men"
                    />
                )}

                {/* Furniture */}
                {furniture.length > 0 && (
                    <ProductGrid
                        title="Furniture"
                        subtitle="Elevate your living space"
                        products={furniture}
                        viewAllHref="/search?category=furniture"
                    />
                )}

                {/* Sale */}
                {sale.length > 0 && (
                    <ProductGrid
                        title="Best Deals"
                        subtitle="Don't miss out — limited time offers"
                        products={sale}
                        viewAllHref="/search?category=sale"
                    />
                )}

                {/* All Products */}
                <ProductGrid
                    title="Suggested for You"
                    subtitle="Handpicked just for you"
                    products={products.slice(0, 8)}
                    viewAllHref="/search"
                />
            </div>
        </div>
    );
}
