import type { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
    title: 'Shopping Cart',
    description: 'Review your selected items and proceed to checkout at ROSÉ Fashion.',
};

export default function CartPage() {
    return <CartClient />;
}
