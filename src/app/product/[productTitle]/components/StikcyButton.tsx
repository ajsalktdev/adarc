"use client";
import CustomButton from "@/components/buttons/CustomButton";
import React, { useEffect, useRef, useState } from "react";
import CartButton from "../../../../../public/assets/icons/cartDark.svg";
import WishList from "../../../../../public/assets/icons/wishlist.svg";
import RedWishList from "../../../../../public/assets/icons/redWishlist.svg";
import strings from "@/utils/string";
import Wrapper from "@/components/includes/Wrapper";

export default function StikcyButton() {
	const [stuck, setStuck] = useState(false);
	const stopRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				// When CustomerSection enters the viewport, we stop sticking
				setStuck(entry.isIntersecting);
			},
			{
				root: null,
				threshold: 0,
				rootMargin: "0px 0px -80px 0px",
			}
		);

		// if (stopRef.current) {
		// 	observer.observe(stopRef.current);
		// }

		// return () => {
		// 	if (stopRef.current) observer.unobserve(stopRef.current);
		// };
	}, []);

	return (
		<>
			{/* { <div className="h-[72px]" />} */}
			{/* Sticky Bar */}
			<div
				className={`w-full bottom-[200px]  gap-3 flex bg-[white] z-50 sticky px-5 py-4  left-0"
				}`}>
				<div className="">
					<div className="w-[48px] flex flex-row justify-center items-center">
						<CustomButton
							isButtonClass={true}
							buttonClass="border-none"
							isLeftIcon={true}
							leftIcon={WishList}
							isTitle={false}
						/>
					</div>
				</div>

				<div className=" w-[40%]   flex justify-center items-center ">
					<CustomButton
						titleClass="max-md:text-[12px] rubik_normal text-nowrap whitespace-nowrap"
						isButtonClass={true}
						buttonClass=" border-0 bg-button_yellow px-3  sk:p-4 "
						isLeftIcon={true}
						leftIcon={CartButton}
						title={strings.button.addCart}
					/>
				</div>
				<div className="w-[40%]  flex justify-center items-center">
					<CustomButton
						titleClass="max-md:text-[12px] rubik_normal text-nowrap whitespace-nowrap"
						isButtonClass={true}
						buttonClass=""
						title={strings.button.buyNow}
					/>
				</div>
			</div>

			{/* This should be placed just BEFORE the section where sticky should stop */}
			{/* <div ref={stopRef} className="h-[1px]" /> */}
		</>
	);
}
