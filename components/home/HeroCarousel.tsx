'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
    {
        title: 'Spring Collection 2026',
        subtitle: 'Up to 40% Off',
        cta: 'Shop Now',
        accent: 'New season, new you',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=85',
        link: '/search?category=women',
        gradient: 'from-foreground/70 via-foreground/40 to-transparent',
    },
    {
        title: 'Men\'s Essentials',
        subtitle: 'Timeless Classics',
        cta: 'Explore',
        accent: 'Curated for the modern man',
        image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=85',
        link: '/search?category=men',
        gradient: 'from-foreground/70 via-foreground/40 to-transparent',
    },
    {
        title: 'Tech Deals',
        subtitle: 'Premium Electronics',
        cta: 'View Deals',
        accent: 'Latest smartphones, laptops & more',
        image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=1920&q=85',
        link: '/search?category=electronics',
        gradient: 'from-foreground/80 via-foreground/50 to-transparent',
    },
    {
        title: 'Beauty & Skincare',
        subtitle: 'Glow Up Season',
        cta: 'Discover',
        accent: 'Luxury beauty for less',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=85',
        link: '/search?category=beauty',
        gradient: 'from-foreground/60 via-foreground/30 to-transparent',
    },
];

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5500);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const prev = () => { setCurrent(p => (p - 1 + slides.length) % slides.length); setIsAutoPlaying(false); };
    const next = () => { setCurrent(p => (p + 1) % slides.length); setIsAutoPlaying(false); };

    const slide = slides[current];

    return (
        <div className="relative rounded-2xl overflow-hidden mt-4 group">
            <div className="relative h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
                {/* Background image */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`bg-${current}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={current === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient}`} />

                {/* Content */}
                <div className="absolute inset-0 flex items-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="px-6 sm:px-12 md:px-16 max-w-lg"
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="inline-block text-xs font-semibold tracking-widest uppercase text-white/80 mb-2"
                            >
                                {slide.accent}
                            </motion.span>
                            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight drop-shadow-lg">
                                {slide.title}
                            </h1>
                            <p className="text-base sm:text-lg text-white/85 mt-2 font-medium">{slide.subtitle}</p>
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href={slide.link}
                                    className="inline-block mt-5 gradient-primary text-white px-7 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-elevated"
                                >
                                    {slide.cta}
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Nav arrows */}
                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/70 backdrop-blur-sm hover:bg-card transition-colors text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-card/70 backdrop-blur-sm hover:bg-card transition-colors text-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slide counter */}
                <div className="absolute bottom-4 right-4 bg-foreground/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                    {current + 1} / {slides.length}
                </div>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => { setCurrent(i); setIsAutoPlaying(false); }}
                        className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 gradient-primary' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
