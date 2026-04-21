import { Truck, RotateCcw, Shield, Zap } from 'lucide-react';

const perks = [
    { Icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
    { Icon: RotateCcw, title: 'Easy Returns', desc: '30-day free returns' },
    { Icon: Shield, title: 'Secure Payment', desc: '100% protected' },
    { Icon: Zap, title: 'Fast Delivery', desc: '2-4 business days' },
];

export default function PromoStrip() {
    return (
        <section className="py-4 my-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {perks.map(({ Icon, title, desc }) => (
                    <div key={title} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3.5 hover:border-primary/30 transition-colors">
                        <div className="p-2 gradient-primary rounded-lg flex-shrink-0">
                            <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">{title}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
