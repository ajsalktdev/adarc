"use client";
import { cn } from "@/utils/utils";
import Image from "next/image";
import React, { useState } from "react";
import ShareMenu from "./ShareMenu";
import { FaRegShareSquare } from "react-icons/fa";
import FullScreenImage from "./FullScreenImage";

export default function ProductImage({ data }: any) {
	const [active, setActive] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageLoaded, setImageLoaded] = useState(false);

	const openModal = (index: number) => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const [openShare, setOpenShare] = useState(false);

	// Calculate aspect ratio for the main image container
	const aspectRatio = 1; // 1:1 aspect ratio, adjust if needed
	const containerHeight = "500px";

	return (
		<div className="w-[100%] px-[16px] py-[24px] items-center relative">
			{openShare && (
				<ShareMenu
					openShare={openShare}
					setOpenShare={setOpenShare}
					isDesktop={true}
				/>
			)}

			<div 
				className="relative w-full"
				style={{
					aspectRatio: aspectRatio,
					maxHeight: containerHeight,
					backgroundColor: '#fff', // Light gray placeholder
				}}
			>
				<button
					onClick={() => openModal(active)}
					className="absolute inset-0 w-full h-full flex justify-center items-center rounded-[4px] overflow-hidden"
				>
					{data?.attachments && (
						<Image
							className={cn(
								"w-full h-full object-contain transition-opacity duration-300",
								imageLoaded ? "opacity-100" : "opacity-0"
							)}
							width={800}
							height={800}
							src={data?.attachments?.[active]?.attachment}
							alt={`${data?.name || 'Product'} image`}
							priority={active === 0} // Priority load for first image
							quality={85}
							onLoad={() => setImageLoaded(true)}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					)}
				</button>
			</div>

			<div className="flex flex-row overflow-x-scroll no-scrollbar w-[100%] gap-[16px] mt-[12px]">
				{data?.attachments?.map((item: any, index: any) => (
					<button
						key={index}
						onClick={() => setActive(index)}
						onMouseEnter={() => setActive(index)}
						className={cn(
							"relative flex justify-center items-center w-[64px] h-[64px] min-w-[64px] overflow-hidden rounded-[4px] border-solid",
							active == index
								? "border-BLACK border-2"
								: "border-select_border_grey border"
						)}
					>
						{item?.attachment && (
							<Image
								className="w-[90%] h-[90%] object-contain"
								src={item?.attachment}
								alt={`${data?.name || 'Product'} thumbnail ${index + 1}`}
								width={64}
								height={64}
								quality={75}
								sizes="64px"
							/>
						)}
					</button>
				))}

				<button
					className="absolute top-0 right-0 w-[24px] h-[24px] flex items-center justify-center"
					onClick={() => setOpenShare(!openShare)}
				>
					<FaRegShareSquare size="25" />
				</button>
			</div>

			{isModalOpen && (
				<FullScreenImage 
					data={data} 
					openModal={openModal} 
					isActive={active} 
					closeModal={closeModal} 
				/>
			)}
		</div>
	);
}
