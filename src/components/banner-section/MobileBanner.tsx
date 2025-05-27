'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function MobileBanner({ data }: { data: any[] }) {
  const mobileRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  // Auto-scroll logic
  const scrollBanner = () => {
    const container = mobileRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;

      if (direction === 'right') {
        container.scrollLeft += containerWidth;
        if (container.scrollLeft + containerWidth >= container.scrollWidth) {
          setDirection('left');
        }
      } else {
        container.scrollLeft -= containerWidth;
        if (container.scrollLeft <= 0) {
          setDirection('right');
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(scrollBanner, 1000);
    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div
      ref={mobileRef}
      className="flex sm:hidden overflow-x-scroll no-scrollbar w-full customer_slider_panel"
    >
      {data?.map((item, index) => (
        <Link
          href={item?.link || '#'}
          key={index}
          className="scroll_image w-full h-[200px] min-h-[200px] flex-shrink-0 flex"
        >
          <Image
            src={item?.image}
            alt={`banner-${index}`}
            width={335}
            height={160}
            className="w-full h-[200px] min-h-[200px] object-cover"
            priority={index === 0}
          />
        </Link>
      ))}
    </div>
  );
}
