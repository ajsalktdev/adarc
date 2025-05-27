"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function FullScreenMobileImage({
  data,
  closeModal,
}: {
  data: any;
  closeModal: () => void;
}) {
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  const handleMainScroll = () => {
    if (!mainImageRef.current) return;
    const scrollLeft = mainImageRef.current.scrollLeft;
    const containerWidth = mainImageRef.current.offsetWidth;
    const index = Math.round(scrollLeft / containerWidth);
    setCurrentIndex(index);
  };

  const scrollToImage = (index: number) => {
    if (!mainImageRef.current) return;
    mainImageRef.current.scrollTo({
      left: mainImageRef.current.offsetWidth * index,
      behavior: "smooth",
    });
  };

  const scrollThumbnailIntoView = (index: number) => {
    const thumbnail = thumbnailRef.current?.children[index] as HTMLElement;
    thumbnail?.scrollIntoView({ behavior: "smooth", inline: "center" });
  };

  useEffect(() => {
    scrollThumbnailIntoView(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    const container = mainImageRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleMainScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleMainScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[white] flex flex-col items-center justify-center">
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-[black] z-10 text-xl"
      >
        ✕
      </button>

      {/* Full-screen main image scroll */}
      <div
        ref={mainImageRef}
        className="flex w-full h-full overflow-x-scroll no-scrollbar snap-x snap-mandatory scroll-smooth"
      >
        {data?.attachments.map((img: any, index: number) => (
          <div
            key={index}
            className="min-w-full h-full flex items-center justify-center snap-center"
          >
            <Image
              src={img.attachment}
              alt={`Image-${index}`}
              width={800}
              height={800}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div
        ref={thumbnailRef}
        className=" w-full overflow-x-scroll flex gap-2 px-4 py-2 "
      >
        {data?.attachments.map((img: any, index: number) => (
          <div
            key={index}
            className={`min-w-[60px] w-[60px] h-[60px] rounded border border-solid flex items-center justify-center ${
              index === currentIndex ? "border-yellow-500" : "border-none"
            } cursor-pointer flex-shrink-0`}
            onClick={() => scrollToImage(index)}
          >
            <Image
              src={img.attachment}
              alt={`Thumb-${index}`}
              width={400}
              height={400}
              className="object-contain w-[90%] h-[90%]rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
