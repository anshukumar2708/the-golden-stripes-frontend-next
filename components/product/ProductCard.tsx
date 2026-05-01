'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

import { Autoplay } from 'swiper/modules';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import { useCurrency } from '@/hooks/useCurrency';
import {
    getDefaultProductSelection,
    getProductColors,
    getProductDisplayVariant,
    isProductInStock,
} from '@/lib/productUtils';
import type { Product } from '@/types';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const dispatch = useAppDispatch();
    const { format } = useCurrency();
    const isWished = useAppSelector(s => s.wishlist.items.some(i => i.id === product.id));

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const selection = getDefaultProductSelection(product);
        if (!selection.variant || selection.variant.stock <= 0) {
            toast.error('This item is out of stock');
            return;
        }
        dispatch(addToCart({ product, size: selection.size, color: selection.color }));
        toast.success('Added to cart', { description: product.title });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(product));
        toast.success(isWished ? 'Removed from wishlist' : 'Added to wishlist');
    };

    const inStock = isProductInStock(product);
    const colors = getProductColors(product);
    const displayVariant = getProductDisplayVariant(product);

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="h-full"
            style={{ willChange: 'transform' }}
        >
            <Link href={`/product/${product.id}`} className="group block h-full">
                <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-elevated transition-shadow duration-300 border border-border hover:border-primary/40 h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[8/9] bg-secondary overflow-hidden">
                        {/* <Image
                            src={displayVariant?.images?.[0] ?? "/placeholder.png"}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        /> */}
                        <Swiper
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            className="w-full h-full"
                        >
                            {(displayVariant?.images?.length
                                ? displayVariant.images
                                : ["/placeholder.png"]
                            ).map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={img}
                                            alt={`${product.title}-${index}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Discount badge */}
                        {displayVariant && displayVariant.discount > 0 && (
                            <span className="absolute top-3 left-3 gradient-sale text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                {displayVariant.discount}% OFF
                            </span>
                        )}

                        {/* Out of stock */}
                        {!inStock && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                <span className="bg-card text-muted-foreground text-sm font-semibold px-4 py-2 rounded-full border border-border">Out of Stock</span>
                            </div>
                        )}

                        {/* Wishlist button */}
                        <button
                            onClick={handleWishlist}
                            className="absolute top-3 right-3 p-2 rounded-full bg-card/85 backdrop-blur-sm hover:bg-card transition-colors shadow-sm"
                            aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                            <Heart className={`w-4 h-4 transition-colors ${isWished ? 'fill-primary text-primary' : 'text-foreground'}`} />
                        </button>

                        {/* Quick Add — hover */}
                        {inStock && (
                            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full gradient-primary text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                    Quick Add
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="p-3.5 flex flex-col flex-1">
                        <p className="text-xs font-medium text-muted-foreground mb-0.5">{product.brand}</p>
                        <h3 className="text-base font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors flex-1">{product.title}</h3>
                        <div className="flex items-center gap-1 mt-2">
                            <Star className="w-4 h-4 fill-gold text-gold" />
                            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount.toLocaleString()})</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                            <span className="text-lg font-bold text-foreground">{format(displayVariant?.price ?? 0)}</span>
                            {displayVariant && displayVariant.originalPrice > displayVariant.price && (
                                <>
                                    <span className="text-sm text-muted-foreground line-through">{format(displayVariant.originalPrice)}</span>
                                    <span className="text-sm font-semibold text-primary">{displayVariant.discount}% off</span>
                                </>
                            )}
                        </div>
                        {/* Color swatches */}
                        {colors?.length > 0 && (
                            <div className="flex gap-1 mt-2 flex-wrap">
                                {colors.slice(0, 4).map(c => (
                                    <span key={c} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded border border-border">
                                        {c}
                                    </span>
                                ))}
                                {colors.length > 4 && (
                                    <span className="text-xs px-1.5 py-0.5 text-muted-foreground">+{colors.length - 4}</span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
