'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, User, Menu, X, Sun, Moon, Globe, ChevronDown } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store';
import { setCurrency } from '@/store/currencySlice';
import { useTheme } from 'next-themes';
import { AnimatePresence } from 'framer-motion';
import { categories, currencies } from '@/data/products';
import MegaMenu from './MegaMenu';
import type { Currency } from '@/types';

export default function Header() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { theme, setTheme } = useTheme();
    const cartCount = useAppSelector(s => s.cart.items.reduce((a, i) => a + i.quantity, 0));
    const wishlistCount = useAppSelector(s => s.wishlist.items.length);
    const isAuth = useAppSelector(s => s.auth.isAuthenticated);
    const selectedCurrency = useAppSelector(s => s.currency.selected);

    const [mobileOpen, setMobileOpen] = useState(false);
    const [hoveredCat, setHoveredCat] = useState<string | null>(null);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const currentCurrency = currencies.find(c => c.code === selectedCurrency) ?? currencies[0];

    return (
        <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
            {/* Announcement Bar */}
            <div className="gradient-primary text-white text-xs text-center py-1.5 font-medium tracking-wide">
                🚀 Free shipping on orders over $50 · Easy 30-day returns
            </div>

            {/* Main Header */}
            <div className="container mx-auto flex items-center justify-between h-16 px-4 gap-4">
                {/* Logo */}
                <Link href="/" className="flex flex-col leading-none flex-shrink-0 group">
                    <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight group-hover:opacity-90 transition-opacity">
                        The Golden
                    </span>
                    <span className="font-display text-xs sm:text-sm md:text-md font-medium tracking-[0.35em] text-foreground/70 uppercase group-hover:text-primary transition-colors">
                        Stripes
                    </span>
                </Link>

                {/* Search bar */}
                <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2 bg-secondary rounded-full px-4 py-2.5 flex-1 max-w-xl border border-border focus-within:border-primary/50 transition-all">
                    <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search products, brands, categories..."
                        className="bg-transparent text-base outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                    />
                </form>

                {/* Actions */}
                <div className="flex items-center gap-1">
                    {/* Currency Selector */}
                    <div className="relative hidden sm:block">
                        <button
                            onClick={() => setCurrencyOpen(!currencyOpen)}
                            className="flex items-center gap-1 p-2 rounded-full hover:bg-secondary transition-colors text-foreground text-base font-medium"
                        >
                            <Globe className="w-5 h-5" />
                            <span className="hidden lg:inline">{currentCurrency.flag} {currentCurrency.code}</span>
                            <ChevronDown className="w-4 h-4" />
                        </button>
                        {currencyOpen && (
                            <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-elevated z-50 py-1 min-w-[160px]">
                                {currencies.map(c => (
                                    <button
                                        key={c.code}
                                        onClick={() => { dispatch(setCurrency(c.code as Currency)); setCurrencyOpen(false); }}
                                        className={`w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors ${selectedCurrency === c.code ? 'text-primary font-semibold' : 'text-foreground'}`}
                                    >
                                        <span>{c.flag}</span>
                                        <span>{c.symbol}</span>
                                        <span>{c.code}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Theme toggle */}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground"
                    >
                        {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    </button>

                    {/* Mobile search */}
                    <Link href="/search" className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors text-foreground">
                        <Search className="w-6 h-6" />
                    </Link>

                    {/* User */}
                    <Link href={isAuth ? '/account' : '/auth'} className="p-2 rounded-full hover:bg-secondary transition-colors text-foreground">
                        <User className="w-6 h-6" />
                    </Link>

                    {/* Wishlist */}
                    <Link href="/wishlist" className="p-2 rounded-full hover:bg-secondary transition-colors relative text-foreground">
                        <Heart className="w-6 h-6" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 gradient-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {wishlistCount > 9 ? '9+' : wishlistCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link href="/cart" className="p-2 rounded-full hover:bg-secondary transition-colors relative text-foreground">
                        <ShoppingCart className="w-6 h-6" />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 gradient-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount > 9 ? '9+' : cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-secondary text-foreground"
                    >
                        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Category Nav - desktop */}
            <nav className="hidden md:block border-t border-border bg-card/80">
                <div className="container mx-auto flex items-center justify-center gap-0 px-4 overflow-x-auto scrollbar-hide">
                    {categories.map(cat => (
                        <div
                            key={cat.slug}
                            className="relative"
                            onMouseEnter={() => setHoveredCat(cat.slug)}
                            onMouseLeave={() => setHoveredCat(null)}
                        >
                            <Link
                                href={`/search?category=${cat.slug}`}
                                className="block px-4 py-3 text-base font-medium text-foreground hover:text-primary transition-colors whitespace-nowrap"
                            >
                                {cat.name}
                            </Link>
                            <AnimatePresence>
                                {cat.subcategories && hoveredCat === cat.slug && (
                                    <MegaMenu subcategories={cat.subcategories} category={cat.slug} />
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-border bg-card animate-slide-in">
                    <form onSubmit={handleSearch} className="flex items-center gap-2 mx-4 mt-3 bg-secondary rounded-full px-4 py-2 border border-border">
                        <Search className="w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground"
                        />
                    </form>
                    <div className="p-4 space-y-1">
                        {categories.map(cat => (
                            <Link
                                key={cat.slug}
                                href={`/search?category=${cat.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block px-4 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                    <div className="border-t border-border p-4">
                        <p className="text-xs text-muted-foreground mb-2 font-semibold">Currency</p>
                        <div className="flex flex-wrap gap-2">
                            {currencies.map(c => (
                                <button
                                    key={c.code}
                                    onClick={() => { dispatch(setCurrency(c.code as Currency)); setMobileOpen(false); }}
                                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedCurrency === c.code ? 'border-primary text-primary bg-accent' : 'border-border text-muted-foreground hover:border-primary/50'}`}
                                >
                                    {c.flag} {c.code}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
