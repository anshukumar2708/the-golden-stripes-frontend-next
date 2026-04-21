'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, CreditCard, MapPin, ShoppingBag, ChevronRight, Lock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearCart } from '@/store/cartSlice';
import { useCurrency } from '@/hooks/useCurrency';
import { toast } from 'sonner';

type Step = 'address' | 'payment' | 'review' | 'success';

const STEPS: { id: Step; label: string; icon: typeof MapPin }[] = [
    { id: 'address', label: 'Address', icon: MapPin },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'review', label: 'Review', icon: ShoppingBag },
];

export default function CheckoutClient() {
    const { items } = useAppSelector(s => s.cart);
    const dispatch = useAppDispatch();
    const { format } = useCurrency();
    const [step, setStep] = useState<Step>('address');
    const [address, setAddress] = useState({ name: '', phone: '', street: '', city: '', state: '', zip: '', country: 'United States' });
    const [payment, setPayment] = useState({ method: 'card', cardName: '', cardNumber: '', expiry: '', cvv: '' });

    const subtotal = items.reduce((a, i) => a + i.product.price * i.quantity, 0);
    const originalSubtotal = items.reduce((a, i) => a + i.product.originalPrice * i.quantity, 0);
    const discount = originalSubtotal - subtotal;
    const delivery = subtotal > 50 ? 0 : 5.99;
    const total = subtotal + delivery;

    if (items.length === 0 && step !== 'success') {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h1 className="text-2xl font-display font-bold text-foreground">No items to checkout</h1>
                <Link href="/" className="mt-4 inline-block text-primary hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
                    <CheckCircle2 className="w-20 h-20 text-green-500 mb-5" />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <h1 className="text-3xl font-display font-bold text-foreground">Order Placed! 🎉</h1>
                    <p className="text-muted-foreground mt-2 max-w-md">Thank you for your order. You will receive a confirmation email shortly.</p>
                    <div className="mt-5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 max-w-sm mx-auto">
                        <p className="text-sm font-semibold text-green-700 dark:text-green-400">Estimated delivery: 3-5 business days</p>
                        <div className="flex items-center justify-center gap-2 mt-2 text-xs text-green-600 dark:text-green-500">
                            <Truck className="w-4 h-4" /> Free shipping applied
                        </div>
                    </div>
                    <Link href="/" className="mt-6 inline-block gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
                        Continue Shopping
                    </Link>
                </motion.div>
            </div>
        );
    }

    const validateAddress = () => {
        if (!address.name.trim() || !address.phone.trim() || !address.street.trim() || !address.city.trim() || !address.zip.trim()) {
            toast.error('Please fill in all required fields');
            return false;
        }
        if (!/^\d{5,10}$/.test(address.zip.replace(/\s/g, ''))) {
            toast.error('Please enter a valid postal code');
            return false;
        }
        return true;
    };

    const handlePlaceOrder = () => {
        dispatch(clearCart());
        setStep('success');
        toast.success('Order placed successfully!');
    };

    const stepIndex = STEPS.findIndex(s => s.id === step);

    return (
        <div className="container mx-auto px-4 py-6 pb-12 max-w-5xl">
            <h1 className="text-2xl font-display font-bold text-foreground mb-6">Checkout</h1>

            {/* Stepper */}
            <div className="flex items-center gap-2 mb-8 overflow-x-auto scrollbar-hide">
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = s.id === step;
                    const isDone = i < stepIndex;
                    return (
                        <div key={s.id} className="flex items-center gap-2 flex-shrink-0">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isActive ? 'gradient-primary text-white' : isDone ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400' : 'bg-secondary text-muted-foreground'}`}>
                                <Icon className="w-4 h-4" />
                                {s.label}
                            </div>
                            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Step Content */}
                <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 'address' && (
                            <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                                    <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" /> Shipping Address
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {[
                                            { label: 'Full Name *', key: 'name', placeholder: 'John Doe' },
                                            { label: 'Phone Number *', key: 'phone', placeholder: '+1 234 567 8900' },
                                        ].map(f => (
                                            <div key={f.key}>
                                                <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                                                <input
                                                    type="text"
                                                    value={address[f.key as keyof typeof address]}
                                                    onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                                                    placeholder={f.placeholder}
                                                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">Street Address *</label>
                                        <input
                                            type="text"
                                            value={address.street}
                                            onChange={e => setAddress(a => ({ ...a, street: e.target.value }))}
                                            placeholder="123 Main Street, Apt 4B"
                                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        {[
                                            { label: 'City *', key: 'city', placeholder: 'New York' },
                                            { label: 'State', key: 'state', placeholder: 'NY' },
                                            { label: 'Postal Code *', key: 'zip', placeholder: '10001' },
                                        ].map(f => (
                                            <div key={f.key}>
                                                <label className="block text-sm font-medium text-foreground mb-1.5">{f.label}</label>
                                                <input
                                                    type="text"
                                                    value={address[f.key as keyof typeof address]}
                                                    onChange={e => setAddress(a => ({ ...a, [f.key]: e.target.value }))}
                                                    placeholder={f.placeholder}
                                                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">Country</label>
                                        <select
                                            value={address.country}
                                            onChange={e => setAddress(a => ({ ...a, country: e.target.value }))}
                                            className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                                        >
                                            {['United States', 'United Kingdom', 'Canada', 'Australia', 'India', 'Germany', 'France', 'Japan', 'Singapore'].map(c => (
                                                <option key={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        onClick={() => { if (validateAddress()) setStep('payment'); }}
                                        className="w-full gradient-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                    >
                                        Continue to Payment <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 'payment' && (
                            <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                                    <h2 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                                        <CreditCard className="w-5 h-5 text-primary" /> Payment Method
                                    </h2>

                                    {/* Payment method selector */}
                                    <div className="grid sm:grid-cols-3 gap-3">
                                        {[
                                            { id: 'card', label: '💳 Card', desc: 'Credit/Debit' },
                                            { id: 'paypal', label: '🅿️ PayPal', desc: 'Quick pay' },
                                            { id: 'cod', label: '💵 Cash', desc: 'On delivery' },
                                        ].map(m => (
                                            <button
                                                key={m.id}
                                                onClick={() => setPayment(p => ({ ...p, method: m.id }))}
                                                className={`p-3 rounded-xl border-2 text-left transition-all ${payment.method === m.id ? 'border-primary bg-accent' : 'border-border hover:border-primary/50'}`}
                                            >
                                                <p className="text-sm font-semibold text-foreground">{m.label}</p>
                                                <p className="text-xs text-muted-foreground">{m.desc}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {payment.method === 'card' && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-1.5">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    value={payment.cardName}
                                                    onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))}
                                                    placeholder="John Doe"
                                                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-foreground mb-1.5">Card Number</label>
                                                <input
                                                    type="text"
                                                    value={payment.cardNumber}
                                                    onChange={e => setPayment(p => ({ ...p, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }))}
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                    className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-mono text-foreground placeholder:text-muted-foreground"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-1.5">Expiry Date</label>
                                                    <input
                                                        type="text"
                                                        value={payment.expiry}
                                                        onChange={e => {
                                                            const v = e.target.value.replace(/\D/g, '').slice(0, 4);
                                                            setPayment(p => ({ ...p, expiry: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v }));
                                                        }}
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-mono text-foreground placeholder:text-muted-foreground"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-foreground mb-1.5">CVV</label>
                                                    <input
                                                        type="password"
                                                        value={payment.cvv}
                                                        onChange={e => setPayment(p => ({ ...p, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                                                        placeholder="•••"
                                                        maxLength={4}
                                                        className="w-full bg-secondary border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary transition-colors font-mono text-foreground placeholder:text-muted-foreground"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary rounded-lg px-3 py-2">
                                                <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                                                Your payment information is encrypted and secure
                                            </div>
                                        </div>
                                    )}

                                    {payment.method === 'paypal' && (
                                        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center">
                                            <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">You will be redirected to PayPal to complete your payment securely.</p>
                                        </div>
                                    )}

                                    {payment.method === 'cod' && (
                                        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                                            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">Pay with cash when your order is delivered. Additional COD fee may apply.</p>
                                        </div>
                                    )}

                                    <div className="flex gap-3">
                                        <button onClick={() => setStep('address')} className="px-5 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                                            ← Back
                                        </button>
                                        <button
                                            onClick={() => setStep('review')}
                                            className="flex-1 gradient-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        >
                                            Review Order <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 'review' && (
                            <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                                <div className="bg-card border border-border rounded-xl p-6 space-y-5">
                                    <h2 className="font-display text-lg font-bold text-foreground">Review Your Order</h2>

                                    {/* Address Summary */}
                                    <div className="bg-secondary rounded-xl p-4">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Shipping To</p>
                                        <p className="text-sm font-semibold text-foreground">{address.name}</p>
                                        <p className="text-sm text-muted-foreground">{address.street}, {address.city}, {address.state} {address.zip}</p>
                                        <p className="text-sm text-muted-foreground">{address.country} · {address.phone}</p>
                                    </div>

                                    {/* Items */}
                                    <div className="space-y-3">
                                        {items.map(item => (
                                            <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3">
                                                <div className="w-12 h-14 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image src={item.product.images[0]} alt={item.product.title} width={48} height={56} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-foreground line-clamp-1">{item.product.title}</p>
                                                    <p className="text-xs text-muted-foreground">{item.selectedSize} · {item.selectedColor} · Qty: {item.quantity}</p>
                                                </div>
                                                <span className="text-sm font-bold text-foreground flex-shrink-0">{format(item.product.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <button onClick={() => setStep('payment')} className="px-5 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors">
                                            ← Back
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            className="flex-1 gradient-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                                        >
                                            <Lock className="w-4 h-4" />
                                            Place Order — {format(total)}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Order Summary Sidebar */}
                <div>
                    <div className="bg-card border border-border rounded-xl p-5 sticky top-24">
                        <h3 className="font-display text-base font-bold text-foreground mb-4">Order Total</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between text-foreground">
                                <span>Subtotal</span>
                                <span>{format(originalSubtotal)}</span>
                            </div>
                            <div className="flex justify-between text-primary">
                                <span>Discount</span>
                                <span>−{format(discount)}</span>
                            </div>
                            <div className="flex justify-between text-foreground">
                                <span>Delivery</span>
                                <span className={delivery === 0 ? 'text-green-600 font-semibold' : ''}>{delivery === 0 ? 'FREE' : format(delivery)}</span>
                            </div>
                            <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground text-base">
                                <span>Total</span>
                                <span>{format(total)}</span>
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                            Secure & encrypted checkout
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
