'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import type { SubCategory } from '@/types';

interface MegaMenuProps {
    subcategories: SubCategory[];
    category: string;
}

export default function MegaMenu({ subcategories, category }: MegaMenuProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 -translate-x-1/2 z-50 bg-card border border-border rounded-xl shadow-elevated mt-1 p-4 min-w-[180px]"
        >
            <div className="flex flex-col gap-1">
                {subcategories.map(sub => (
                    <Link
                        key={sub.slug}
                        href={`/search?category=${sub.slug}`}
                        className="text-sm text-muted-foreground hover:text-primary px-3 py-1.5 rounded-lg hover:bg-accent transition-colors whitespace-nowrap"
                    >
                        {sub.name}
                    </Link>
                ))}
                <Link
                    href={`/search?category=${category}`}
                    className="text-xs font-semibold text-primary px-3 py-1.5 mt-1 border-t border-border pt-2"
                >
                    View All →
                </Link>
            </div>
        </motion.div>
    );
}
