"use client";
import fetchApiData from "@/config/fetch-api-data";
import React, { useEffect, useState } from "react";
import Icon from "../includes/Icon";
import { cn } from "@/utils/utils";
import VectorIcon from "../../../public/assets/icons/vector_black.svg";
import SecondaryMenu from "./SecondaryMenu";
import CustomButton from "../buttons/CustomButton";
import { useRouter } from "next/navigation";
import useZustandStore from "@/store/useStore";
import Link from "next/link";
import Profile from "../../../public/assets/icons/profile.svg";
import LeftArrow from "../../../public/assets/icons/left-arrow.svg";
import Image from "next/image";
import { div } from "framer-motion/client";

function FirstMenu({ onClose }: any) {
	const router = useRouter();
	const { clearAccessToken, userInfo } = useZustandStore();
	const [isActiveMegaMenu, setActiveMegaMenu] = useState(false);
	const [activeIndex, setActiveIndex] = useState<any>(10000);
	const [activeSlug, setActiveSlug] = useState(null)

	const [data, setData] = useState<any[]>([]); // Adjust type based on your data structure
	const responsiveData = {
		data: [

			{
				pk: "2222222",
				name: "Powered by Asus",
				slug: "powered-by-asus",
				icon: "",
				small_icon: "",
				departments: [
					{
						pk: "b8d0f7a7-28fb-4dee-abe1-91431b3e324b",
						slug: "powered-by-content-creation",
						name: "CONTENT CREATION",
						icon: null,
						small_icon: null
					},
					{
						pk: "b8d0f7a7-28fb-4dee-abe1-91431b3e324b",
						slug: "powered-by-asus-gaming",
						name: "GAMING PC",
						icon: null,
						small_icon: null
					}
				]
			}
			,
			{
				pk: "1111111111",
				name: "Powered by MSI",
				slug: "powered-by-msi",
				icon: "",
				small_icon: "",
				departments: []
			}
		]
	};

	const getData = async () => {
		try {
			const response = await fetchApiData<any>(
				"products/list-all-categories/"
			);
			const combinedData =
				[...response.data, ...responsiveData.data]
				;

			setData(combinedData);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const handleSignin = () => {
		router.push("/login");
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className="w-full rounded-tl-[6px] no-scrollbar  rounded-bl-[6px] h-full py-4 flex flex-col justify-between overflow-y-scroll  relative">
			<div className="w-full">
				<div className="flex   justify-between px-2 ">
					{isActiveMegaMenu ? (
						<button
							className="  text-[#222222]   flex items-center gap-2  text-[16px] rubik_medium "
							onClick={() => {
								setActiveMegaMenu(false);
								setActiveIndex(null);
							}}
						>
							<Image
								src={LeftArrow}
								alt="LeftArrow"
								width={100}
								height={100}
								className="w-[16px] h-[16px]"
							/>
							<div className="text-[#222222] text-[16px] rubik_medium ">
								Main Menu
							</div>
						</button>
					) : (
						<div></div>
					)}
					<button
						onClick={onClose}
						className=" p-2   hover:bg-gray-100 rounded-full transition-colors"
						aria-label="Close menu">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg">
							<path
								d="M18 6L6 18M6 6L18 18"
								stroke="#222222"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
				<div className="w-full overflow-y-scroll no-scrollbar ">
					{!isActiveMegaMenu && (
						<div className="flex flex-col gap-1 w-full mb-4">
							<button
								onClick={() => {
									router.push("/my-account/my-profile/");
								}}
								className="w-full flex items-center gap-2 bg-gray-600  text-left border-b border-t border-gray-200 border-solid px-9 text-[#222222] p-2 text-[16px] rubik_medium ">
								<Icon
									src={Profile}
									width={"24px"}
									height={"24px"}
									alt="icon"
									className="min-w-[24px] w-[24px]   inline-block"
								/>
								<span className="text-white">My Account</span>
							</button>
						</div>
					)}

					{!isActiveMegaMenu && (
						<h4 className="px-9 text-[#222222] pb-2 text-[16px] rubik_medium">
							Shop by Category
						</h4>
					)}
					<div className="max-h-[600px] overflow-y-scroll no-scrollbar">
						{!isActiveMegaMenu &&
							data?.map((section: any, index: any) => (
								<div
									onClick={() => {
										if (isActiveMegaMenu == false) {
											router.push(`/${section?.slug}`);
											onClose()
										} else {
											setActiveMegaMenu(false);
											setActiveSlug(null)

											setActiveIndex(null);
										}
									}}
									key={index}
									className="flex px-9 justify-between items-center cursor-pointer py-3">
									<div className="flex gap-2">
										<Icon
											src={section.icon}
											height={"18px"}
											width={"18px"}
											alt={"vectorIcon"}
										/>

										<h4 className=" rubik_regular text-[14px]">
											{section.name}
										</h4>
									</div>
									{section?.departments?.length > 0 && <div
										onClick={(e) => {
											if (isActiveMegaMenu == false) {
												setActiveMegaMenu(true);
												setActiveIndex(index);
												e.stopPropagation();
												setActiveSlug(section?.slug)
											} else {
												setActiveMegaMenu(false);
												setActiveSlug(null)

												setActiveIndex(null);
											}
										}}
										className={cn(
											"transition-transform duration-300",
											index == activeIndex
												? "-rotate-90"
												: "rotate-0"
										)}>
										<Icon
											src={VectorIcon}
											height={"20px"}
											width={"20px"}
											alt={"vectorIcon"}
										/>
									</div>

									}

								</div>
							))}
						{isActiveMegaMenu && (
							<div className="w-full">
								<SecondaryMenu
									setActiveMegaMenu={setActiveMegaMenu}
									setActiveIndex={setActiveIndex}
									data={data?.[activeIndex]?.departments}
									activeSlug={activeSlug}
									onClose={onClose}
								/>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className="px-6">
				{userInfo ? (
					<>
						<div className="w-full rubik_medium mb-3 text-[18px] text-[#1D252C] py-2 border-[#E2E4E5] border-solid border-b ">
							{userInfo?.first_name && "Hello,"}{" "}
							{userInfo?.first_name}
						</div>
						<CustomButton
							onClick={() => {
								clearAccessToken();
								window.location.reload();
							}}
							title="Sign out"
							buttonClass=""
							isButtonClass={true}
							istTitleClass={true}
							titleClass="text-[#040C13]
                                       rubik_medium text-[16px]"
						/>
					</>
				) : (
					<CustomButton
						onClick={handleSignin}
						title="Sign In"
						buttonClass="bg-[#FFE000]"
						isButtonClass={true}
						istTitleClass={true}
						titleClass="text-[#040C13] rubik_medium text-[16px]"
					/>
				)}
			</div>
		</div>
	);
}

export default FirstMenu;
