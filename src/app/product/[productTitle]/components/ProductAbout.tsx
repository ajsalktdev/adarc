"use client";
import React, { useRef, useState, useEffect } from "react";
import TitleComponent from "./TitleComponent";
import Strings from "../../../../utils/string";
import { cn } from "@/utils/utils";
import CustomButton from "@/components/buttons/CustomButton";
import { div } from "framer-motion/client";

export default function ProductAbout({ description, specification }: any) {
	const [descExpanded, setDescExpanded] = useState(false);
	const [specExpanded, setSpecExpanded] = useState(false);

	const descRef = useRef<HTMLDivElement>(null);
	const specRef = useRef<HTMLDivElement>(null);

	const [descCollapsedHeight, setDescCollapsedHeight] = useState<
		number | null
	>(null);
	const [specCollapsedHeight, setSpecCollapsedHeight] = useState<
		number | null
	>(null);

	useEffect(() => {
		if (descRef.current) {
			const fullHeight = descRef.current.scrollHeight;
			if (fullHeight > 400) {
				setDescCollapsedHeight(fullHeight * 0.25);
			} else {
				setDescCollapsedHeight(null);
			}
		}

		if (specRef.current) {
			const fullHeight = specRef.current.scrollHeight;
			if (fullHeight > 400) {
				setSpecCollapsedHeight(fullHeight * 0.25);
			} else {
				setSpecCollapsedHeight(null);
			}
		}
	}, [description, specification]);

	return (
		<div className="py-[24px] lg:py-[36px] md:py-[48px]">
			<div className="mb-[19px]">
				<TitleComponent
					title={Strings.productPage.aboutTitle}
					titleClass="rubik_semibold text-[20px] leading-[24px]"
					containerClass=""
				/>
			</div>

			{/* Description Section */}
			{description?.trim() && <div className="border-t-[0.6px] border-solid border-primary_border pt-[19px] pb-[12px]">
				<h2 className="rubik_semibold text-[20px] mb-2">Description</h2>
				<div
					ref={descRef}
					className={cn(
						"rubik_regular description_product text-shadow_gray overflow-hidden transition-all duration-500 ease-in-out"
					)}
					style={{
						paddingBottom: "20px",
						maxHeight:
							descCollapsedHeight === null
								? "none"
								: descExpanded
								? descRef.current?.scrollHeight
								: descCollapsedHeight,
					}}
					dangerouslySetInnerHTML={{ __html: description }}
				/>
				{descCollapsedHeight !== null && (
					// <button
					//   className='text-primary underline mt-2 text-[14px]'
					//   onClick={() => setDescExpanded(!descExpanded)}
					// >

					//   {descExpanded ? 'Show Less' : 'Read More'}
					// </button>
					<div className="relative w-full bg-white flex flex-col items-center py-3 mt-[-10px]">
						{/* Gradient Overlay */}
						{!descExpanded && (
							<div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-black to-transparent opacity-40 pointer-events-none z-10" />
						)}

						{/* Button */}
						<button
							className="text-[12px] md:text-[14px] rubik_regular text-yellow-500 bg-black opacity-[.8] py-1 px-3 rounded-[4px] z-20"
							onClick={() => setDescExpanded(!descExpanded)}>
							{descExpanded ? "Show Less" : "Read More"}
						</button>
					</div>
				)}
			</div>}

			{/* Specification Section */}
			{specification.trim() && <div className="border-t-[0.6px] border-solid border-primary_border pt-[19px] pb-[12px] mt-[20px]">
				 <h2 className="rubik_semibold text-[20px] mb-2">
					Specification
				</h2>
				<div
					ref={specRef}
					className={cn(
						"rubik_regular text-[14px] description_product text-shadow_gray overflow-hidden transition-all duration-500 ease-in-out"
					)}
					style={{
						paddingBottom: "20px",
						maxHeight:
							specCollapsedHeight === null
								? "none"
								: specExpanded
								? specRef.current?.scrollHeight
								: specCollapsedHeight,
					}}
					dangerouslySetInnerHTML={{ __html: specification }}
				/>
				{specCollapsedHeight !== null && (
					<div className="relative w-full bg-white flex flex-col items-center py-3 mt-[-10px]">
						{/* Gradient Overlay */}
						{!specExpanded && (
							<div className="absolute bottom-0 left-0 w-full h-[80px] bg-gradient-to-t from-black to-transparent opacity-40 pointer-events-none z-10" />
						)}
						{/* Button */}
						<button
							className="text-[12px] md:text-[14px] rubik_regular text-yellow-500 bg-black opacity-[.8] py-1 px-3 rounded-[4px] z-20"
							onClick={() => setSpecExpanded(!specExpanded)}>
							{specExpanded ? "Show Less" : "Read More"}
						</button>
					</div>
				)}
			</div>}
		</div>
	);
}
