'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, Tag, Truck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from 'sonner';

export default function CartClient() {
    const { items } = useAppSelector(s => s.cart);
    const dispatch = useAppDispatch();
    const { format } = useCurrency();

    const subtotal = items.reduce((a, i) => a + i.product.originalPrice * i.quantity, 0);
    const discount = items.reduce((a, i) => a + (i.product.originalPrice - i.product.price) * i.quantity, 0);
    const total = subtotal - discount;
    const delivery = total > 50 ? 0 : 5.99;
    const grandTotal = total + delivery;

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                <h1 className="text-2xl font-display font-bold text-foreground">Your cart is empty</h1>
                <p className="text-muted-foreground mt-2 text-sm">Browse our collection and add items you love</p>
                <Link href="/" className="mt-6 gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                    Shop Now
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-6 pb-12">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-display font-bold text-foreground">Shopping Cart ({items.length})</h1>
                <button
                    onClick={() => { dispatch(clearCart()); toast.success('Cart cleared'); }}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear Cart
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Items List */}
                <div className="lg:col-span-2 space-y-3">
                    <AnimatePresence mode="popLayout">
                        {items.map(item => (
                            <motion.div
                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                layout
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="bg-card border border-border rounded-xl p-4 flex gap-4"
                            >
                                {/* Image */}
                                <Link href={`/product/${item.product.id}`} className="w-24 h-28 sm:w-20 sm:h-24 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.product.images[0]}
                                        alt={item.product.title}
                                        width={96}
                                        height={112}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link href={`/product/${item.product.id}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors line-clamp-2">
                                        {item.product.title}
                                    </Link>
                                    <p className="text-xs text-muted-foreground mt-0.5">{item.product.brand}</p>
                                    {(item.selectedSize || item.selectedColor) && (
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                                            {item.selectedSize && item.selectedColor && <span> · </span>}
                                            {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                                        </p>
                                    )}

                                    {/* Price */}
                                    <div className="flex items-center gap-2 mt-1.5">
                                        <span className="text-base font-bold text-foreground">{format(item.product.price)}</span>
                                        {item.product.originalPrice > item.product.price && (
                                            <span className="text-xs text-muted-foreground line-through">{format(item.product.originalPrice)}</span>
                                        )}
                                    </div>

                                    {/* Qty + Remove */}
                                    <div className="flex items-center justify-between mt-2.5">
                                        <div className="flex items-center gap-1 bg-secondary rounded-lg">
                                            <button
                                                onClick={() => dispatch(updateQuantity({ productId: item.product.id, size: item.selectedSize, color: item.selectedColor, quantity: item.quantity - 1 }))}
                                                className="p-1.5 hover:text-primary transition-colors text-foreground"
                                                aria-label="Decrease quantity"
                                            >
                                                <Minus className="w-3.5 h-3.5" />
                                            </button>
                                            <span className="text-sm font-semibold text-foreground w-7 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => dispatch(updateQuantity({ productId: item.product.id, size: item.selectedSize, color: item.selectedColor, quantity: item.quantity + 1 }))}
                                                className="p-1.5 hover:text-primary transition-colors text-foreground"
                                                aria-label="Increase quantity"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => { dispatch(removeFromCart({ productId: item.product.id, size: item.selectedSize, color: item.selectedColor })); toast.success('Removed from cart'); }}
                                            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Item Total */}
                                <div className="hidden sm:flex flex-col items-end justify-center gap-1 flex-shrink-0">
                                    <span className="text-base font-bold text-foreground">{format(item.product.price * item.quantity)}</span>
                                    {item.quantity > 1 && <span className="text-xs text-muted-foreground">{format(item.product.price)} each</span>}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div>
                    <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                        <h2 className="font-display text-lg font-bold text-foreground mb-4">Order Summary</h2>

                        {/* Coupon */}
                        <div className="flex gap-2 mb-4">
                            <div className="flex-1 flex items-center gap-2 bg-secondary rounded-lg px-3 border border-border">
                                <Tag className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Coupon code"
                                    className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground py-2"
                                />
                            </div>
                            <button className="px-3 py-2 border border-primary text-primary text-sm rounded-lg font-medium hover:bg-accent transition-colors">
                                Apply
                            </button>
                        </div>

                        {/* Price Breakdown */}
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between text-foreground">
                                <span>Subtotal ({items.reduce((a, i) => a + i.quantity, 0)} items)</span>
                                <span>{format(subtotal)}</span>
                            </div>
                            <div className="flex justify-between text-primary">
                                <span>Discount</span>
                                <span>−{format(discount)}</span>
                            </div>
                            <div className="flex justify-between text-foreground">
                                <span className="flex items-center gap-1">
                                    <Truck className="w-3.5 h-3.5" />
                                    Delivery
                                </span>
                                <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>
                                    {delivery === 0 ? 'FREE' : format(delivery)}
                                </span>
                            </div>
                            {delivery > 0 && (
                                <p className="text-xs text-muted-foreground">Add {format(50 - total)} more for free delivery</p>
                            )}
                            <div className="border-t border-border pt-3 flex justify-between font-bold text-foreground text-base">
                                <span>Total</span>
                                <span>{format(grandTotal)}</span>
                            </div>
                        </div>

                        {discount > 0 && (
                            <div className="mt-3 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-3">
                                <p className="text-sm text-green-700 dark:text-green-400 font-semibold">
                                    🎉 You&apos;re saving {format(discount)} on this order!
                                </p>
                            </div>
                        )}

                        <Link
                            href="/checkout"
                            className="flex items-center justify-center gap-2 w-full gradient-primary text-white py-3 rounded-xl font-semibold mt-5 hover:opacity-90 transition-opacity"
                        >
                            Proceed to Checkout
                            <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                            href="/"
                            className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-3"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
