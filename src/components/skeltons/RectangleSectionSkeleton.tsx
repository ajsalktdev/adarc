// components/RectangleSectionSkeleton.tsx
import ProductCardSkeleton from "./ProductCardSkeleton";


export default function RectangleSectionSkeleton() {
    return (
      <section className="w-full py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse" /> {/* Title */}
          <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" /> {/* See all btn */}
        </div>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {[...Array(6)].map((_, idx) => (
            <ProductCardSkeleton key={idx} />
          ))}
        </div>
      </section>
    );
  }
