// components/ProductCardSkeleton.tsx
export default function ProductCardSkeleton() {
    return (
      <div className="w-full max-w-[220px] space-y-2 animate-pulse">
        <div className="w-full h-[180px] bg-gray-300 rounded-lg" /> {/* Image */}
        <div className="w-3/4 h-4 bg-gray-300 rounded" /> {/* Title */}
        <div className="w-1/2 h-4 bg-gray-300 rounded" /> {/* Price */}
      </div>
    );
  }
  