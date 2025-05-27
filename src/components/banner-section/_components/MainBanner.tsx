"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GrNext } from "react-icons/gr";

export default function DesktopBanner({banners, data }: any) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [direction, setDirection] = useState<"right" | "left">("right");
	const [atStart, setAtStart] = useState(true);
	const [atEnd, setAtEnd] = useState(false);
	const [hydrated, setHydrated] = useState(false);

	console.log(banners,'drgsr')

	// Defer hydration to avoid LCP impact
	useEffect(() => {
		if ("requestIdleCallback" in window) {
			(requestIdleCallback as any)(() => setHydrated(true));
		} else {
			setTimeout(() => setHydrated(true), 100); // Fallback
		}
	}, []);

	const checkScrollPosition = () => {
		const container = containerRef.current;
		if (!container) return;

		const scrollLeft = container.scrollLeft;
		const containerWidth = container.offsetWidth;
		const scrollWidth = container.scrollWidth;

		setAtStart(scrollLeft <= 10);
		setAtEnd(scrollLeft + containerWidth >= scrollWidth - 10);
	};

	const scroll = (dir: "left" | "right") => {
		const container = containerRef.current;
		if (!container) return;
		const containerWidth = container.offsetWidth;

		container.scrollBy({
			left: dir === "right" ? containerWidth : -containerWidth,
			behavior: "smooth",
		});
	};

	const autoScroll = () => {
		const container = containerRef.current;
		if (!container) return;
		const containerWidth = container.offsetWidth;

		if (direction === "right") {
			container.scrollLeft += containerWidth;
			if (
				container.scrollLeft + containerWidth >=
				container.scrollWidth
			) {
				setDirection("left");
			}
		} else {
			container.scrollLeft -= containerWidth;
			if (container.scrollLeft <= 0) {
				setDirection("right");
			}
		}
	};

	useEffect(() => {
		if (!hydrated) return;

		const interval = setInterval(autoScroll, 4000);
		return () => clearInterval(interval);
	}, [direction, hydrated]);

	useEffect(() => {
		if (!hydrated) return;

		const container = containerRef.current;
		if (!container) return;

		checkScrollPosition();
		container.addEventListener("scroll", checkScrollPosition);
		return () =>
			container.removeEventListener("scroll", checkScrollPosition);
	}, [hydrated]);

	const firstBanner = data?.[0];

	return (
		<div className="w-full hidden sm:block relative">
			<div className="relative max-w-[1300px] mx-auto rounded-md overflow-hidden">
				{/* ✅ Immediately load first image for LCP */}
				{firstBanner && (
					<Link
						href={firstBanner.link || "#"}
						className={`block relative w-full pt-[34.27%] ${
							hydrated ? "hidden" : "block"
						}`}>
						<Image
							src={firstBanner.image}
							alt="Main banner"
							fill
							priority
							className="rounded-md object-cover"
						/>
					</Link>
				)}

				{/* ✅ Defer slider until after hydration */}
				{hydrated && (
					<>
						<div
							ref={containerRef}
							className="flex transition-all duration-500 ease-in-out overflow-x-auto scroll-smooth no-scrollbar snap-x snap-mandatory">
							{data.map((item:any, index:any) => (
								<Link
									href={item?.link || "#"}
									key={index}
									className="w-full min-w-full flex-shrink-0 relative pt-[34.27%] snap-start">

									<Image
										src={item?.image}
										alt={`banner-${index}`}
										fill
										className="object-cover rounded-md"
										loading={index === 0 ? "eager" : "lazy"}
										priority={index === 0}
									/>
								</Link>
							))}
						</div>

						{/* Prev Button */}
						<button
							onClick={() => !atStart && scroll("left")}
							className={`absolute top-1/2 left-3 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden md:flex transition-opacity ${
								atStart
									? "opacity-30 cursor-default"
									: "opacity-100"
							}`}>
							<GrNext size={20} className="rotate-180" />
						</button>

						{/* Next Button */}
						<button
							onClick={() => !atEnd && scroll("right")}
							className={`absolute top-1/2 right-3 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-2 hidden md:flex transition-opacity ${
								atEnd
									? "opacity-30 cursor-default"
									: "opacity-100"
							}`}>
							<GrNext size={20} />
						</button>
					</>
				)}
			</div>
		</div>
	);
}
