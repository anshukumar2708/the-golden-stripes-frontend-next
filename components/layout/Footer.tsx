import Link from 'next/link';
import { Mail, Phone, MapPin, Instagram, Youtube, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-card border-t border-border mt-16">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex flex-col leading-none mb-3">
                            <span className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">The Golden</span>
                            <span className="font-display text-xs sm:text-sm md:text-md font-medium tracking-[0.35em] text-foreground/60 uppercase mt-0.5">Stripes</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">Your destination for elegant, modern fashion. Curated styles for every occasion — worldwide.</p>
                        <div className="flex gap-3 mt-4">
                            {[{ Icon: Instagram, label: 'Instagram' }, { Icon: Facebook, label: 'Facebook' }, { Icon: Twitter, label: 'Twitter' }, { Icon: Youtube, label: 'YouTube' }].map(({ Icon, label }) => (
                                <button key={label} type="button" aria-label={label} className="p-2 rounded-full bg-secondary hover:bg-accent hover:text-primary transition-colors text-muted-foreground">
                                    <Icon className="w-4 h-4" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Shop</h4>
                        <div className="space-y-2">
                            {['Men', 'Women', 'Kids', 'Electronics', 'Beauty', 'Furniture', 'Sale'].map(l => (
                                <Link key={l} href={`/search?category=${l.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">{l}</Link>
                            ))}
                        </div>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Help</h4>
                        <div className="space-y-2">
                            {['FAQ', 'Shipping Policy', 'Returns & Refunds', 'Size Guide', 'Track Order', 'Contact Us'].map(l => (
                                <span key={l} className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{l}</span>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Company</h4>
                        <div className="space-y-2">
                            {['About Us', 'Careers', 'Press', 'Sustainability', 'Privacy Policy', 'Terms of Service'].map(l => (
                                <span key={l} className="block text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">{l}</span>
                            ))}
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-foreground mb-3">Contact</h4>
                        <div className="space-y-2.5">
                            <a href="mailto:hello@rose.fashion" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Mail className="w-4 h-4 flex-shrink-0" />
                                hello@rose.fashion
                            </a>
                            <a href="tel:+18001234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                <Phone className="w-4 h-4 flex-shrink-0" />
                                +1 800 123 4567
                            </a>
                            <span className="flex items-start gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                123 Fashion Ave, New York, NY 10001
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
                    <p>© 2026 The Golden Stripes. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <span>🔒 Secure Payments</span>
                        <span>📦 Free Returns</span>
                        <span>🌍 Ships Worldwide</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
