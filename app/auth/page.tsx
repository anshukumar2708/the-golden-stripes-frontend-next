import type { Metadata } from 'next';
import AuthClient from './AuthClient';

export const metadata: Metadata = {
    title: 'Sign In / Sign Up',
    description: 'Log in or create your ROSÉ Fashion account.',
    robots: { index: false, follow: false },
};

export default function AuthPage() {
    return <AuthClient />;
}
