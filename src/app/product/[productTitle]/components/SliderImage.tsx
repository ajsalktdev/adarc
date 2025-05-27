"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ShareMenu from "./ShareMenu";
import FullScreenImage from "./FullScreenImage";
import FullScreenMobileImage from "./FullScreenMobileImage";

export default function SliderImage({ Product }: any) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Calculate which image is currently in view
	const handleScroll = () => {
		if (!containerRef.current) return;

		const scrollLeft = containerRef.current.scrollLeft;
		const containerWidth = containerRef.current.offsetWidth;

		const index = Math.round(scrollLeft / containerWidth);
		setCurrentIndex(index);
	};

	// Optional: snap scroll with smooth behavior when clicking dots (if implemented later)
	const scrollToIndex = (index: number) => {
		if (!containerRef.current) return;

		containerRef.current.scrollTo({
			left: containerRef.current.offsetWidth * index,
			behavior: "smooth",
		});
	};

	// Attach scroll event
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("scroll", handleScroll, { passive: true });
		return () => container.removeEventListener("scroll", handleScroll);
	}, []);
	const [openShare, setOpenShare] = useState(false);

		const [isModalOpen, setIsModalOpen] = useState(false);
	
		const openModal = () => {
			setIsModalOpen(true);
		};
	
		const closeModal = () => {
			setIsModalOpen(false);
		};

	return (
		<div className="relative w-full">
			<div
			onClick={openModal}
				ref={containerRef}
				className="no-scrollbar flex items-center min-w-full w-full overflow-x-scroll scroll-snap-x mandatory h-[400px] snap-x snap-mandatory">
				{Product?.attachments.map((image: any, index: number) => (
					<div
						key={index}
						className="w-full min-w-full h-[400px] flex items-center justify-center snap-center">
						<Image
							className="w-full min-w-full h-full object-contain"
							src={image?.attachment}
							alt={index ? `productImage-${index}` : "products"}
							width={400}
							height={400}
						/>
					</div>
				))}
			</div>
			<div className="flex items-center justify-center w-full gap-[8px] mt-4  ">
				{Product?.attachments.map((_: any, index: number) => (
					<div
						key={index}
						className={`rounded-full h-[8px] w-[8px] transition-all duration-300 ${
							currentIndex === index
								? " bg-[#6D7277] scale-125"
								: "border border-solid border-[#C5CBD5]"
						}`}></div>
				))}
			</div>


			<button
			className="absolute bottom-0 right-0 w-[24px] h-[24px] flex items-center justify-center "
				onClick={() => setOpenShare(!openShare)}
				>
				<Image
					src="/assets/icons/share.svg"
					alt="share"
					loading="lazy"
					width={24}
					height={24}
					className="w-full h-full"
				/>
			</button>

			{openShare && <ShareMenu openShare={openShare} setOpenShare={setOpenShare} />}
			{isModalOpen && <FullScreenMobileImage data={Product} closeModal={closeModal} />}
		</div>              
	);
}
