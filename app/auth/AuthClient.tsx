'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAppDispatch } from '@/store';
import { login } from '@/store/authSlice';
import { toast } from 'sonner';

export default function AuthClient() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email.includes('@') || form.password.length < 6) {
            toast.error('Please enter a valid email and password (min 6 chars)');
            return;
        }
        setLoading(true);
        // Simulated auth
        await new Promise(r => setTimeout(r, 800));
        dispatch(login({
            id: '1',
            name: form.name || form.email.split('@')[0],
            email: form.email,
            phone: '',
            addresses: [],
        }));
        toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
        setLoading(false);
        router.push('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="font-display text-4xl font-bold text-primary">ROSÉ</h1>
                    <p className="text-muted-foreground mt-1 text-sm">Your fashion destination</p>
                </div>

                <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
                    {/* Tab Switcher */}
                    <div className="grid grid-cols-2 border-b border-border">
                        {['Sign In', 'Sign Up'].map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setIsLogin(i === 0)}
                                className={`py-3.5 text-sm font-semibold transition-colors ${(i === 0) === isLogin ? 'text-primary border-b-2 border-primary bg-accent/50' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="p-6">
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'signup'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                type="text"
                                                value={form.name}
                                                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                                placeholder="John Doe"
                                                className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                            placeholder="you@example.com"
                                            required
                                            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={form.password}
                                            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                                            placeholder="Min. 6 characters"
                                            required
                                            minLength={6}
                                            className="w-full pl-10 pr-11 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {isLogin && (
                                    <div className="flex justify-end">
                                        <button type="button" className="text-xs text-primary hover:underline">Forgot password?</button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full gradient-primary text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
                                >
                                    {loading ? (
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? 'Sign In' : 'Create Account'}
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>

                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                                    <div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">or continue with</span></div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {['Google', 'Facebook'].map(provider => (
                                        <button
                                            key={provider}
                                            type="button"
                                            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                                        >
                                            {provider === 'Google' ? '🌐' : '📘'} {provider}
                                        </button>
                                    ))}
                                </div>
                            </motion.form>
                        </AnimatePresence>
                    </div>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-5">
                    By continuing, you agree to our{' '}
                    <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                    {' '}and{' '}
                    <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
                </p>
            </div>
        </div>
    );
}
