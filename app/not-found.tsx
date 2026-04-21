import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page Not Found' };

export default function NotFound() {
    return (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
            <h1 className="text-8xl font-display font-bold text-primary">404</h1>
            <h2 className="text-2xl font-display font-bold text-foreground mt-4">Page not found</h2>
            <p className="text-muted-foreground mt-2 max-w-md">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-8 gradient-primary text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
                Back to Home
            </Link>
        </div>
    );
}
