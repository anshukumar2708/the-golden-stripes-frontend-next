'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const categoryCards = [
    { name: 'Men', slug: 'men', emoji: '👔', bg: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900' },
    { name: 'Women', slug: 'women', emoji: '👗', bg: 'from-pink-50 to-rose-100 dark:from-pink-950 dark:to-rose-900' },
    { name: 'Kids', slug: 'kids', emoji: '🧸', bg: 'from-yellow-50 to-amber-100 dark:from-yellow-950 dark:to-amber-900' },
    { name: 'Electronics', slug: 'electronics', emoji: '📱', bg: 'from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900' },
    { name: 'Beauty', slug: 'beauty', emoji: '💄', bg: 'from-fuchsia-50 to-pink-100 dark:from-fuchsia-950 dark:to-pink-900' },
    { name: 'Grocery', slug: 'grocery', emoji: '🛒', bg: 'from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900' },
    { name: 'Medicine', slug: 'medicine', emoji: '💊', bg: 'from-cyan-50 to-teal-100 dark:from-cyan-950 dark:to-teal-900' },
    { name: 'Furniture', slug: 'furniture', emoji: '🛋️', bg: 'from-orange-50 to-amber-100 dark:from-orange-950 dark:to-amber-900' },
    { name: 'Watches', slug: 'watches-men', emoji: '⌚', bg: 'from-slate-50 to-gray-100 dark:from-slate-950 dark:to-gray-900' },
    { name: 'Sale', slug: 'sale', emoji: '🔥', bg: 'from-red-50 to-rose-100 dark:from-red-950 dark:to-rose-900' },
];

export default function CategoryBar() {
    return (
        <section className="py-6">
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Shop by Category</h2>
            <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-3">
                {categoryCards.map((cat, i) => (
                    <motion.div
                        key={cat.slug}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                        <Link
                            href={`/search?category=${cat.slug}`}
                            className={`flex flex-col items-center gap-2 p-4 rounded-xl bg-gradient-to-b ${cat.bg} hover:scale-105 active:scale-95 transition-transform duration-200 border border-border/50 text-center group`}
                        >
                            <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-200">{cat.emoji}</span>
                            <span className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{cat.name}</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
