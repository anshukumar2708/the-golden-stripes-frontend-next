import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/layout/ScrollToTop';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

export const metadata: Metadata = {
    metadataBase: new URL('https://rose-fashion.vercel.app'),
    title: { default: 'ROSÉ Fashion — Elegant Modern Shopping', template: '%s | ROSÉ Fashion' },
    description: 'Discover curated fashion, electronics, beauty, and more at ROSÉ. Premium quality, unbeatable prices. Shop men, women, kids, electronics, beauty & furniture.',
    keywords: ['fashion', 'ecommerce', 'clothing', 'electronics', 'beauty', 'online shopping'],
    authors: [{ name: 'ROSÉ Fashion' }],
    creator: 'ROSÉ Fashion',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://rose-fashion.vercel.app',
        siteName: 'ROSÉ Fashion',
        title: 'ROSÉ Fashion — Elegant Modern Shopping',
        description: 'Discover curated fashion, electronics, beauty & more at ROSÉ.',
        images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'ROSÉ Fashion' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ROSÉ Fashion',
        description: 'Discover curated fashion, electronics, beauty & more.',
        images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
            <body className="min-h-screen bg-background text-foreground font-body antialiased">
                <ThemeProvider>
                    <ReduxProvider>
                        <div className="flex flex-col min-h-screen">
                            <Header />
                            <main className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                        <ScrollToTop />
                        <Toaster richColors position="top-right" closeButton />
                    </ReduxProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
