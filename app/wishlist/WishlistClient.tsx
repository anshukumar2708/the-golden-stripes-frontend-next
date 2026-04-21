'use client';

import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { removeFromWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import ProductCard from '@/components/product/ProductCard';
import { toast } from 'sonner';

export default function WishlistClient() {
    const { items } = useAppSelector(s => s.wishlist);
    const dispatch = useAppDispatch();

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <Heart className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="text-2xl font-display font-bold text-foreground">Your wishlist is empty</h1>
                <p className="text-muted-foreground mt-2 text-sm">Save products you love by tapping the heart icon</p>
                <Link href="/" className="mt-6 gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                    Explore Products
                </Link>
            </div>
        );
    }

    const handleAddAllToCart = () => {
        items.forEach(product => {
            dispatch(addToCart({ product, size: product.sizes[0] ?? 'One Size', color: product.colors[0] ?? 'Default' }));
        });
        toast.success(`${items.length} items added to cart`);
    };

    return (
        <div className="container mx-auto px-4 py-6 pb-12">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-display font-bold text-foreground">My Wishlist</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
                </div>
                {items.length > 1 && (
                    <button
                        onClick={handleAddAllToCart}
                        className="flex items-center gap-2 gradient-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add All to Cart
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                <AnimatePresence>
                    {items.map((product, i) => (
                        <motion.div
                            key={product.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                            className="relative"
                        >
                            <ProductCard product={product} index={i} />
                            <button
                                onClick={() => { dispatch(removeFromWishlist(product.id)); toast.success('Removed from wishlist'); }}
                                className="absolute top-2 left-2 p-1.5 bg-destructive/90 text-white rounded-full hover:bg-destructive transition-colors z-10"
                                aria-label="Remove from wishlist"
                            >
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
