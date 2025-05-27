// ProductCard.js
import React, { useState } from "react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import PriceComponent from "./PriceComponent";

interface ProductCardProps {
	className?: string;
	MoreItems?: boolean;
	onClick?: any;
	isAsusPage?: boolean;
	isMsiPage?: boolean;


	data: {
		brand: {
			icon?: string;
		};
    is_best_seller: boolean;
    is_best_deal: boolean;
    is_new_arrival: boolean;
		primary_attachment?: string;
		name: string;
		price?: any;
		oldPrice?: any;
		offer?: any;
		isOffer?: any;
		price_details?: any;
		badge?: string;
    is_powered_by_msi_advanced :any,
    is_powered_by_msi_essential :any
    is_powered_by_msi_ultimate:any
	};
	border?: boolean;
}

function ProductCard({
	className,
	onClick,
	data,
	border = true,
	MoreItems = false,
	isAsusPage = false,
	isMsiPage = false,

}: ProductCardProps) {
	// Default value is true
	const [activeHover, setActiveHover] = useState(false); // Manage hover state with useState

	const hoverCard = () => {
		setActiveHover(true); // Set hover state to true
		// console.log(activeHover, 'Hover started');
	};

  console.log(data,'tags=======================================')

	const unmountHover = () => {
		setActiveHover(false); // Set hover state to false
		// console.log(activeHover, 'Hover ended');
	};

  const showBadge =
  !isAsusPage &&
  !isMsiPage &&
  (data?.is_best_seller || data?.is_best_deal || data?.is_new_arrival);

	return (
		<div
			onMouseEnter={hoverCard} // Trigger hover start
			onMouseLeave={unmountHover} // Trigger hover end
			className={cn(
				"group hover:opacity-[.9] overflow-hidden hover:border-[#0457C8] hover:border hover:border-solid relative  transition-all transform px-[16px] py-[12px] rounded-[4px] flex flex-col gap-3 items-center  max-md:px-[10px] max-md:py-[8px]",
				border
					? "border-[.7px] sm:border  border-[#C5CBD5] border-solid "
					: "",
				activeHover && "",
				className
			)}
			onClick={onClick}
			// style={{ transformOrigin: 'center top' }}
		>
			{showBadge && (
				<div
					className={cn(
						"absolute top-0 left-0 px-1 py-[6px] z-10 flex items-center justify-center rounded-br-md",
						data?.is_new_arrival === true && "bg-[#FFE000]",data?.is_best_seller  === true && "bg-[green]", data?.is_best_deal === true && " bg-[red] "
					)}>
					<span className={cn("text-[10px] leading-[16px] text-[white] rubik_medium",data?.is_new_arrival === true && "text-[black]",data?.is_best_seller  === true && "text-[white]", data?.is_best_deal === true && " text-[white] ")}>
						{data?.is_best_seller  ? 'Best Seller' : data?.is_best_deal ? 'Best Deal' : 'New Arrival'}
					</span>
				</div>
			)}
			{isAsusPage && (
				<div className="absolute top-3 left-3 z-10 w-[72px] h-[16.2px] flex items-center justify-center">
					<Image
						src="/assets/images/asus/asus_tag.png"
						alt="Asus Logo"
						fill
						className="object-contain"
						quality={100}
						priority
					/>
				</div>
			)}
			{isMsiPage && data?.is_powered_by_msi_advanced && (
				<div className="absolute top-3 left-3 z-10 flex items-center justify-center w-[48.57px] h-[47.7px]">
					<Image
						src={"/assets/images/asus/msi_advanced.png"}
						alt="asusLogo"
						width={300}
						height={300}
						className="w-full h-full"
					/>
				</div>
			)}
			{isMsiPage && data?.is_powered_by_msi_essential && (
				<div className="absolute top-3 left-3 z-10 flex items-center justify-center w-[48.57px] h-[47.7px]">
					<Image
						src={"/assets/images/asus/msi_essential.png"}
						alt="asusLogo"
						width={300}
						height={300}
						className="w-full h-full"
					/>
				</div>
			)}
			{isMsiPage && data?.is_powered_by_msi_ultimate && (
				<div className="absolute top-3 left-3 z-10 flex items-center justify-center w-[48.57px] h-[47.7px]">
					<Image
						src={"/assets/images/asus/msi_ultimate.png"}
						alt="asusLogo"
						width={300}
						height={300}
						className="w-full h-full"
					/>
				</div>
			)}
			<div
				className={cn(
					"w-[100%] min-h-[180px]   duration-500 transition-all transform flex justify-center bg-red",
					MoreItems && "",
					"group-hover:scale-[1.07]"
				)}
				style={{ aspectRatio: "1", height: "auto" }}>
				{data?.primary_attachment && (
					<Image
						src={data?.primary_attachment}
						alt={data?.name}
						fill
						className="object-contain"
						quality={100}
						loading="lazy"
						// className='object-contain w-[100%] h-[100%]'
						// objectFit="contain"
					/>
				)}
			</div>
			<div className="">
				<div className="min-h-[60px]">
					<h1
						className={cn(
							"   text-left rubik_medium font-normal text-[14px] max-md:text-[13px] three-line-clamp group-hover:text-[#0457C8]"
						)}>
						{data?.name}
					</h1>
				</div>

				<div className="mt-[12px]">
					<PriceComponent
						actualPriceClass=""
						badge={data?.badge}
						data={data?.price_details}
					/>
				</div>
			</div>
		</div>
	);
}

export default ProductCard;
