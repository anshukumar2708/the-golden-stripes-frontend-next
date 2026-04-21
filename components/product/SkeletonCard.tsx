export default function SkeletonCard() {
    return (
        <div className="bg-card rounded-xl overflow-hidden border border-border animate-pulse">
            <div className="aspect-[3/4] bg-muted" />
            <div className="p-3 space-y-2">
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/3" />
                <div className="h-5 bg-muted rounded w-1/2 mt-2" />
            </div>
        </div>
    );
}
