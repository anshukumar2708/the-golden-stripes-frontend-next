import type { Metadata } from 'next';
import WishlistClient from './WishlistClient';

export const metadata: Metadata = {
    title: 'My Wishlist',
    description: 'View and manage your saved products at ROSÉ Fashion.',
};

export default function WishlistPage() {
    return <WishlistClient />;
}
