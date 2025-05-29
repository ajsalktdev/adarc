// ProductSection.js
"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { cn } from "@/utils/utils";
import TitleSection from "./TitleSection";
import ScrollIcon from "./ScrollIcon";
import Slider from "react-slick";
import DealCard from "./DealCard";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import fetchApiData from "@/config/fetch-api-data";
import Link from "next/link";
import { GrNext } from "react-icons/gr";
import { div } from "framer-motion/client";

function RectangleSection({
	className,
	datas,
	sectionTitle,

	slider_settings,

	isViewMore,
	viewMoreLink,
	deals = false,
	wishlist = false,
	poweredBy = false,
	viewBy = false,
	moreItems,
	isViewBy = false
}: {
	className?: string;
	datas: any;
	sectionTitle: string;
	slider_settings?: any;
	wishlist?: any;
	poweredBy?: any;
	viewMoreLink: string;
	viewBy?: boolean;
	moreItems?: boolean;
	deals?: boolean;
	isViewMore: boolean;
	isViewBy : boolean
}) {
	const router = useRouter();
	const [maxIndex, setMaxIndex] = useState(2);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const updateMaxIndex = () => {
			const width = window.innerWidth;
			setIsMobile(width <= 480);

			if (width <= 480) setMaxIndex(0);
			else if (width <= 740) setMaxIndex(1);
			else setMaxIndex(2);
		};

		updateMaxIndex();
		window.addEventListener("resize", updateMaxIndex);

		return () => window.removeEventListener("resize", updateMaxIndex);
	}, []);

	const CustomNextArrow = (props: any) => {
		const { onClick } = props;
		return (
			<div
				onClick={onClick}
				className="h-[50px] max-sm:hidden cursor-pointer w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center rounded-full absolute -right-3 hover:translate-x-2 transform transition-all top-1/2 -translate-y-1/2 z-40 shadow-xl bg-[#f5f5f5]">
				<GrNext size="25" />
			</div>
		);
	};

	const CustomPrevArrow = (props: any) => {
		const { onClick } = props;
		return (
			<div
				onClick={onClick}
				className="h-[50px] max-sm:hidden cursor-pointer rotate-180 w-[50px] min-h-[50px] min-w-[50px] flex items-center justify-center rounded-full absolute -left-5 top-1/2 hover:-translate-x-2 transform transition-all -translate-y-1/2 z-40 shadow-xl bg-[#f5f5f5]">
				<GrNext size="25" />
			</div>
		);
	};

	const settings = {
		...slider_settings,
		centerMode: false,
		infinite: false,
		slidesToShow: slider_settings?.slidesToShow ?? 6,
		slidesToScroll: slider_settings?.slidesToScroll ?? 2,
		swipeToSlide: true,
		nextArrow: <CustomNextArrow />,
		prevArrow: <CustomPrevArrow />,
	};

	return (
		<div
			className={cn(
				"mb-[28px] md:mb-[48px] max-sm:px-[10px]",
				className
			)}>
			{!deals && (
				<TitleSection
					viewMoreLink={viewMoreLink}
					isViewMore={isViewMore}
					sectionTitle={sectionTitle}
					className="mb-1"
				/>
			)}
			{
				// moreItems ? (
				// 	<div className="justify-center items-center flex w-full">
				// 		<div
				// 			className={cn(
				// 				"flex md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  max-md:overflow-x-scroll max-sm:px-[10px] gap-[4px] sm:gap-[20px]  items-center gap-y-[20px] "
				// 			)}>
				// 			{datas?.map((data: any, index: any) => (
				// 				<Link
				// 					href={`/product/${data?.slug}`}
				// 					key={index}
				// 					className="min-h-[330px] md:w-full sk:w-[33%] w-[47.5%] min-w-[47.5%] sm:min-w-[33%] sm:w-[33%]">
				// 					<ProductCard
				// 						key={index}
				// 						data={data}
				// 						MoreItems={true}
				// 						className="  "
				// 					/>
				// 				</Link>
				// 			))}
				// 		</div>
				// 	</div>
				// ) :

				poweredBy ? (
					<div className="justify-center items-center flex w-full">
						<div
							className={cn(
								"flex md:grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  max-md:overflow-x-scroll max-sm:px-[10px] gap-[4px] sm:gap-[20px]  items-center gap-y-[20px] "
							)}>
							{datas?.map((data: any, index: any) => (
								<Link
									href={`/product/${data?.slug}`}
									key={index}
									className="min-h-[330px] md:w-full sk:w-[33%] w-[47.5%] min-w-[47.5%] sm:min-w-[33%] sm:w-[33%]">
									<ProductCard
										key={index}
										data={data}
										MoreItems={true}
										className="  "
									/>
								</Link>
							))}
						</div>
					</div>
				) : deals ? (
					<div
						className={cn(
							"flex items-stretch gap-[10px]  sm:overflow-scroll overflow-x-hidden"
						)}>
						{/* <div></div> */}
						<DealCard
							className={cn(
								"md:max-w-[24%] min-w-[170px] max-md:mt-4 w-full sm:px-[10px] max-sm:min-h-[120px]"
							)}
						/>
						{datas?.map(
							(data: any, index: any) =>
								index <= maxIndex && (
									<Link
										className=" hidden md:block w-[24%] min-w-[170px]   max-[740px]:w-[31%]   max-md:w-[30%] max-[480px]:w-[48%]  "
										key={index}
										href={`/product/${data?.slug}`}>
										<ProductCard data={data} />
									</Link>
								)
						)}
					</div>
				) : (
					<div className="relative  ">
						{isMobile ? (
							<div className="flex overflow-x-scroll  py-[5px] gap-[4px]  no-scrollbar ">
								{datas?.map((data: any, index: any) => (
									<Link
										key={index}
										href={`/product/${data?.slug}`}
										className="min-w-[47.5%]">
										<ProductCard data={data} />
									</Link>
								))}
							</div>
						) : (
							<div>
								{ isViewBy ? (
									<div className="flex gap-[10px] overflow-scroll no-scrollbar">
										{datas?.map((data: any, index: any) => (
											<Link
												key={index}
												href={`/product/${data?.slug}`}
												className=" w-[241px]">
												<ProductCard data={data} />
											</Link>
										))}
									</div>
								) : (
									<Slider
										{...settings}
										className="flex justify-center items-center  gap-[20px]   ">
										{datas?.map((data: any, index: any) => (
											<Link
												key={index}
												href={`/product/${data?.slug}`}
												className="pr-[10px]">
												<ProductCard data={data} />
											</Link>
										))}
									</Slider>
								)}
							</div>
						)}
					</div>
				)
			}
		</div>
	);
}

export default RectangleSection;
