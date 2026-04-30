'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Star, ShoppingCart, Truck, Shield, RotateCcw, Zap, Package, Tag, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { addToCart } from '@/store/cartSlice';
import { toggleWishlist } from '@/store/wishlistSlice';
import { useCurrency } from '@/hooks/useCurrency';
import ProductGrid from '@/components/product/ProductGrid';
import {
    getDefaultProductSelection,
    getProductColors,
    getProductImages,
    getProductSizes,
    getSelectedProductSelection,
} from '@/lib/productUtils';
import { toast } from 'sonner';
import type { Product } from '@/types';

interface Props {
    product: Product;
    similar: Product[];
}

export default function ProductDetailClient({ product, similar }: Props) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { format } = useCurrency();
    const isWished = useAppSelector(s => s.wishlist.items.some(i => i.id === product.id));
    const defaultSelection = getDefaultProductSelection(product);

    const [selectedSize, setSelectedSize] = useState(defaultSelection.size);
    const [selectedColor, setSelectedColor] = useState(defaultSelection.color);
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        setZoomPos({ x, y });
    };

    const colors = getProductColors(product);
    const sizes = getProductSizes(product, selectedColor);
    const selection = getSelectedProductSelection(product, selectedColor, selectedSize);
    const selectedVariant = selection.variant;
    const inStock = Boolean(selectedVariant && selectedVariant.stock > 0);
    const images = getProductImages(product, selectedColor, selectedSize);

    const handleColorChange = (color: string) => {
        const nextSelection = getSelectedProductSelection(product, color);
        setSelectedColor(nextSelection.color);
        setSelectedSize(nextSelection.size);
        setActiveIndex(0);
    };

    const handleSizeChange = (size: string) => {
        const nextSelection = getSelectedProductSelection(product, selectedColor, size);
        setSelectedSize(nextSelection.size);
        setActiveIndex(0);
    };

    const addSelectedToCart = () => {
        if (!selectedVariant || selectedVariant.stock <= 0) {
            toast.error('This selection is out of stock');
            return false;
        }
        dispatch(addToCart({ product, size: selection.size, color: selection.color }));
        return true;
    };

    const handleAdd = () => {
        if (addSelectedToCart()) {
            toast.success('Added to cart!', { description: product.title });
        }
    };

    const handleBuyNow = () => {
        if (addSelectedToCart()) {
            router.push('/checkout');
        }
    };

    const gallery = images.length > 0 ? images : ['/placeholder.png'];

    const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(product.rating));

    return (
        <div className="container mx-auto px-4 py-6 pb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5">
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href={`/search?category=${product.category}`} className="hover:text-primary transition-colors capitalize">{product.category}</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-foreground line-clamp-1">{product.title}</span>
            </nav>

            <div className="grid lg:grid-cols-2 gap-8 xl:gap-12">
                {/* Image Gallery */}
                <div className="flex gap-3">
                    {/* Thumbnails */}
                    <div className="flex flex-col gap-2 w-14 sm:w-16 flex-shrink-0">
                        {gallery.slice(0, 5).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`aspect-square rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${activeIndex === i ? 'border-primary ring-2 ring-primary/30' : 'border-border hover:border-primary/50'}`}
                            >
                                <Image src={img} alt={`${product.title} view ${i + 1}`} width={64} height={64} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    {/* Main Image with zoom */}
                    <div
                        ref={imgRef}
                        className="flex-1 bg-card rounded-xl overflow-hidden border border-border relative cursor-zoom-in select-none"
                        onMouseEnter={() => setZoom(true)}
                        onMouseLeave={() => setZoom(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="aspect-square overflow-hidden">
                            <Image
                                src={gallery[activeIndex] ?? gallery[0]}
                                alt={product.title}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover transition-all duration-200"
                                style={zoom
                                    ? { transform: 'scale(2.2)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transition: 'transform 0s' }
                                    : { transform: 'scale(1)', transformOrigin: 'center' }
                                }
                                priority
                            />
                        </div>
                        {zoom && (
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full pointer-events-none">
                                Hover to zoom
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-5">
                    {/* Brand & Title */}
                    <div>
                        <p className="text-sm text-primary font-semibold tracking-wide">{product.brand}</p>
                        <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mt-1 leading-tight">{product.title}</h1>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0.5">
                            {stars.map((filled, i) => (
                                <Star key={i} className={`w-4 h-4 ${filled ? 'fill-gold text-gold' : 'text-muted fill-none stroke-muted-foreground'}`} />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-3 flex-wrap">
                        <span className="text-3xl font-bold text-foreground">{format(selectedVariant?.price ?? 0)}</span>
                        {selectedVariant && selectedVariant.originalPrice > selectedVariant.price && (
                            <>
                                <span className="text-lg text-muted-foreground line-through">{format(selectedVariant.originalPrice)}</span>
                                <span className="text-sm font-bold text-white gradient-sale px-2.5 py-0.5 rounded-full">{selectedVariant.discount}% OFF</span>
                            </>
                        )}
                    </div>
                    {selectedVariant && selectedVariant.originalPrice > selectedVariant.price && (
                        <p className="text-sm text-primary font-medium">
                            You save {format(selectedVariant.originalPrice - selectedVariant.price)}!
                        </p>
                    )}

                    {/* Stock */}
                    <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${inStock ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'}`}>
                            {inStock ? `In Stock (${selectedVariant?.stock} available)` : 'Out of Stock'}
                        </span>
                    </div>

                    {/* Color Selector */}
                    {colors.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold text-foreground mb-2">
                                Color: <span className="font-normal text-muted-foreground">{selectedColor}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {colors.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => handleColorChange(c)}
                                        className={`px-3 py-1.5 text-sm rounded-lg border-2 transition-all ${selectedColor === c ? 'border-primary bg-accent text-primary font-semibold' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Size Selector */}
                    {sizes.length > 0 && (
                        <div>
                            <p className="text-sm font-semibold text-foreground mb-2">
                                Size: <span className="font-normal text-muted-foreground">{selectedSize || 'Select a size'}</span>
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map(size => {
                                    const sizeVariant = getSelectedProductSelection(product, selectedColor, size).variant;
                                    const disabled = !sizeVariant || sizeVariant.stock <= 0;
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => handleSizeChange(size)}
                                            disabled={disabled}
                                            className={`min-w-[44px] px-3 py-2 text-sm rounded-lg border-2 transition-all font-medium disabled:opacity-40 disabled:cursor-not-allowed ${selectedSize === size ? 'border-primary bg-accent text-primary' : 'border-border text-foreground hover:border-primary/50'}`}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart / Buy Now */}
                    <div className="flex gap-3 flex-wrap">
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAdd}
                            disabled={!inStock}
                            className="flex-1 gradient-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            onClick={handleBuyNow}
                            disabled={!inStock}
                            className="flex-1 border-2 border-primary text-primary py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        >
                            <Zap className="w-5 h-5" />
                            Buy Now
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => { dispatch(toggleWishlist(product)); toast.success(isWished ? 'Removed from wishlist' : 'Added to wishlist'); }}
                            className={`p-3 rounded-xl border-2 transition-colors ${isWished ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'}`}
                            aria-label="Wishlist"
                        >
                            <Heart className={`w-5 h-5 ${isWished ? 'fill-primary text-primary' : 'text-foreground'}`} />
                        </motion.button>
                    </div>

                    {/* Delivery Info */}
                    <div className="grid grid-cols-2 gap-2.5">
                        {[
                            { Icon: Truck, text: 'Free delivery over $50' },
                            { Icon: RotateCcw, text: '30-day easy returns' },
                            { Icon: Shield, text: '100% authentic' },
                            { Icon: Package, text: 'Secure packaging' },
                        ].map(({ Icon, text }) => (
                            <div key={text} className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">{text}</span>
                            </div>
                        ))}
                    </div>

                    {/* SKU / GTIN */}
                    <div className="flex gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> SKU: <strong className="text-foreground">{product.sku}</strong></span>
                        <span className="flex items-center gap-1"><Tag className="w-3 h-3" /> GTIN: <strong className="text-foreground">{product.gtin}</strong></span>
                    </div>
                </div>
            </div>

            {/* Description & Specs Tabs */}
            <div className="mt-10 border-t border-border pt-8">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Description */}
                    <div>
                        <h2 className="text-xl font-display font-bold text-foreground mb-3">Description</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>
                        {product.features && product.features.length > 0 && (
                            <ul className="mt-4 space-y-1.5">
                                {product.features.map(f => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Specifications */}
                    {product?.specifications && Object.keys(product?.specifications)?.length > 0 && (
                        <div>
                            <h2 className="text-xl font-display font-bold text-foreground mb-3">Specifications</h2>
                            <div className="bg-secondary rounded-xl overflow-hidden border border-border">
                                {Object.entries(product.specifications).map(([key, value], i) => (
                                    <div key={key} className={`flex items-start py-2.5 px-4 gap-4 text-sm ${i % 2 === 0 ? 'bg-background/50' : ''}`}>
                                        <span className="text-muted-foreground w-36 flex-shrink-0 font-medium">{key}</span>
                                        <span className="text-foreground">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Similar Products */}
            {similar.length > 0 && (
                <ProductGrid
                    title="Similar Products"
                    subtitle="You might also like"
                    products={similar}
                />
            )}
        </div>
    );
}
