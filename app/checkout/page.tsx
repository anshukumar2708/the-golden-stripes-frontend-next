import type { Metadata } from 'next';
import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
    title: 'Checkout',
    description: 'Complete your purchase securely at ROSÉ Fashion.',
    robots: { index: false, follow: false },
};

export default function CheckoutPage() {
    return <CheckoutClient />;
}
