'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { SlidersHorizontal, Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { brands, allColors, allSizes } from '@/data/products';
import { getProductColors, getProductMinPrice, getProductSizes } from '@/lib/productUtils';
import type { Product, SortOption } from '@/types';

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: 'Relevance', value: 'popularity' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Top Rated', value: 'rating' },
    { label: 'Newest', value: 'newest' },
];

interface Props {
    initialProducts: Product[];
    query?: string;
    categoryName?: string;
    tag?: string;
}

export default function SearchClient({ initialProducts, query, categoryName, tag }: Props) {
    const router = useRouter();

    const [sort, setSort] = useState<SortOption>('popularity');
    const [filterOpen, setFilterOpen] = useState(false);
    const [localQuery, setLocalQuery] = useState(query ?? '');

    // Filter state
    const [priceMax, setPriceMax] = useState(2000);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
    const [minRating, setMinRating] = useState(0);

    const filtered = useMemo(() => {
        let result = [...initialProducts];

        if (selectedBrands.length > 0) result = result.filter(p => selectedBrands.includes(p.brand));
        if (selectedColors.length > 0) result = result.filter(p => getProductColors(p).some(c => selectedColors.includes(c)));
        if (selectedSizes.length > 0) result = result.filter(p => getProductSizes(p).some(s => selectedSizes.includes(s)));
        result = result.filter(p => getProductMinPrice(p) <= priceMax && p.rating >= minRating);

        if (sort === 'price-asc') result.sort((a, b) => getProductMinPrice(a) - getProductMinPrice(b));
        else if (sort === 'price-desc') result.sort((a, b) => getProductMinPrice(b) - getProductMinPrice(a));
        else if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
        else if (sort === 'newest') result.sort((a, b) => (b.tags.includes('new-arrivals') ? 1 : 0) - (a.tags.includes('new-arrivals') ? 1 : 0));

        return result;
    }, [initialProducts, selectedBrands, selectedColors, selectedSizes, priceMax, minRating, sort]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (localQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(localQuery.trim())}`);
        }
    };

    const toggleFilter = (arr: string[], val: string, setter: (a: string[]) => void) => {
        setter(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    };

    const activeFiltersCount = selectedBrands.length + selectedColors.length + selectedSizes.length + (minRating > 0 ? 1 : 0) + (priceMax < 2000 ? 1 : 0);

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setMinRating(0);
        setPriceMax(2000);
    };

    return (
        <div className="container mx-auto px-4 py-6 pb-12">
            {/* Header */}
            <div className="mb-5">
                <h1 className="text-2xl font-display font-bold text-foreground">
                    {categoryName ?? (query ? `Results for "${query}"` : tag ? `#${tag}` : 'All Products')}
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} products found</p>
            </div>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2.5 mb-5 border border-border focus-within:border-primary/50 transition-all max-w-xl">
                <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                    type="text"
                    value={localQuery}
                    onChange={e => setLocalQuery(e.target.value)}
                    placeholder="Search products..."
                    className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                />
                {localQuery && (
                    <button type="button" onClick={() => setLocalQuery('')} className="text-muted-foreground hover:text-foreground">
                        <X className="w-4 h-4" />
                    </button>
                )}
            </form>

            {/* Controls */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${filterOpen ? 'bg-primary text-white border-primary' : 'border-border text-foreground hover:border-primary/50'}`}
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFiltersCount > 0 && (
                        <span className="bg-white text-primary rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
                            {activeFiltersCount}
                        </span>
                    )}
                </button>

                <div className="flex items-center gap-2 ml-auto">
                    <span className="text-sm text-muted-foreground hidden sm:block">Sort:</span>
                    <div className="relative">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value as SortOption)}
                            className="appearance-none bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground pr-8 focus:outline-none focus:border-primary cursor-pointer"
                        >
                            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                    </div>
                </div>
            </div>

            <div className="flex gap-6">
                {/* Filter Panel */}
                <AnimatePresence>
                    {filterOpen && (
                        <motion.aside
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="w-56 flex-shrink-0 space-y-5"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-foreground text-sm">Filters</h3>
                                {activeFiltersCount > 0 && (
                                    <button type="button" onClick={clearFilters} className="text-xs text-primary hover:underline">Clear all</button>
                                )}
                            </div>

                            {/* Price */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Max Price: ${priceMax}</p>
                                <input
                                    type="range"
                                    min={0}
                                    max={2000}
                                    step={10}
                                    value={priceMax}
                                    onChange={e => setPriceMax(Number(e.target.value))}
                                    className="w-full accent-primary"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>$0</span><span>$2000</span>
                                </div>
                            </div>

                            {/* Rating */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Min Rating</p>
                                <div className="flex gap-2 flex-wrap">
                                    {[0, 3, 3.5, 4, 4.5].map(r => (
                                        <button
                                            key={r}
                                            onClick={() => setMinRating(r)}
                                            className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${minRating === r ? 'border-primary bg-accent text-primary font-semibold' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                                        >
                                            {r === 0 ? 'All' : `${r}★+`}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Brand</p>
                                <div className="space-y-1.5 max-h-40 overflow-y-auto scrollbar-hide">
                                    {brands.map(b => (
                                        <label key={b} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(b)}
                                                onChange={() => toggleFilter(selectedBrands, b, setSelectedBrands)}
                                                className="accent-primary"
                                            />
                                            {b}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Color</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {allColors.map(c => (
                                        <button
                                            key={c}
                                            onClick={() => toggleFilter(selectedColors, c, setSelectedColors)}
                                            className={`px-2 py-1 text-xs rounded border transition-colors ${selectedColors.includes(c) ? 'border-primary bg-accent text-primary font-semibold' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">Size</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {allSizes.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => toggleFilter(selectedSizes, s, setSelectedSizes)}
                                            className={`w-9 h-9 text-xs rounded border-2 font-medium transition-colors ${selectedSizes.includes(s) ? 'border-primary bg-accent text-primary' : 'border-border text-foreground hover:border-primary/50'}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.aside>
                    )}
                </AnimatePresence>

                {/* Products Grid */}
                <div className="flex-1 min-w-0">
                    {filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                            <h2 className="text-xl font-display font-bold text-foreground">No products found</h2>
                            <p className="text-muted-foreground mt-1 text-sm">Try adjusting your filters or search term</p>
                            <button type="button" onClick={clearFilters} className="mt-4 gradient-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className={`grid grid-cols-2 ${filterOpen ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-4'} gap-3 sm:gap-4`}>
                            {filtered.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
