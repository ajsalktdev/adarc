"use client";
import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/assets/images/logo.svg";
import MainSearch from "../../../public/assets/icons/mainSearch.svg";
import Image from "next/image";
import Menu from "../../../public/assets/icons/white-hamburger.svg";
import { useRouter } from "next/navigation";
import CustomTextInput from "../input/CustomTextInput";
import Icon from "../includes/Icon";
import ListBox from "./ListBox";
import fetchApiData from "@/config/fetch-api-data";
import dynamic from "next/dynamic";
import HamburgerMenu from "../hamburger/HamburgerMenu";
import { cn } from "@/utils/utils";
// Update with the correct path

const MiddleRightSection = dynamic(
	() => import("../navbar/MiddleRightSection"),
	{
		ssr: false, // Optional: Set ssr to false if you want to disable server-side rendering for this component.
	}
);

function MiddleSection() {
	const menuRef = useRef(null);
	const router = useRouter();
	const modalRef = useRef<HTMLDivElement>(null);
	const [search, setSearch] = useState("");
	const [searchvisible, setSearchVisble] = useState(false);
	const [listData, setData] = useState<any>({});
	const [ismodal, setModal] = useState(false);
	const [navMenuActive, setNavMenuActive] = useState(false);

	const getData = async (): Promise<void> => {
		try {
			const response: any = await fetchApiData<any>(
				`products/list-products?q=${search}`
			);
			console.log(response, "response");
			setData(response?.data);
			setModal(true);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(event.target as Node)
		) {
			setModal(false);
		}
	};
	useEffect(() => {
		if (ismodal) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ismodal]);

	const onChange = (value: string) => {
		setSearch(value);
		getData();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && search?.trim()) {
			// Check if Enter is pressed and search is not empty
			router.push(`/search?q=${search}`);
			setModal(false);
		}
	};

	return (
		<>
			{navMenuActive && (
				<div
					className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500"
					onClick={() => setNavMenuActive(false)}
				/>
			)}

			<div
				ref={menuRef}
				className={cn(
					"fixed top-0 h-full w-[340px] sm:w-[400px]  bg-white m shadow-md z-50 overflow-hidden transition-all duration-500 ease-in-out",
					navMenuActive ? "left-0" : "-left-[500px]"
				)}>
				<HamburgerMenu onClose={()=>setNavMenuActive(false)} navMenuActive={navMenuActive}/>
			</div>
			<div className="bg-PRIMARY_BG h-[88px] sm:h-[70px] w-full">
				<div className="navbarWrapper flex justify-between items-center h-[50px] sm:h-[70px]  px-[48px]  ">
					<div className="flex gap-[25px] w-[65%] max-lg:w-[75%]    ">
						<button
							onClick={() => setNavMenuActive(!navMenuActive)}
							className="max-sm:flex hidden  justify-center items-center">
							<Icon
								className="invert"
								src={Menu}
								alt="menuIcon"
								width={"22px"}
								height={"22px"}
							/>
						</button>
						<div className="max-lg:w-[250px] w-[330px] flex gap-6 items-center ">
							<a
								href={"/"}
								className="flex w-full h-full items-center justify-center">
								<Image
									src={logo}
									alt="logo"
									height={100}
									width={100}
									className="w-[250px] block"
								/>
							</a>
						</div>
						<div className="items-center z-10 flex w-full relative max-sm:w-[0px]">
							<CustomTextInput
								setData={setSearch}
								value={search}
								icon={MainSearch}
								imageAlt={"mainSearch"}
								isIcon={true}
								className={"mb-0 max-sm:hidden"}
								inputStyle="bg-[white]"
								placeholder={"What are you looking for ? "}
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => onChange(e.target.value)}
								onIconClick={() => {
									if (search?.trim()) {
										// Check if search has a non-empty string
										router.push(`/search?q=${search}`);
									} else {
										console.log(
											"Search input is empty. Please enter a search term."
										);
									}
								}}
								onKeyDown={handleKeyDown}
							/>
							{!searchvisible && ismodal && (
								<div
									className="w-full max-h-[300px] bg-[white] absolute top-[86px] sm:top-[46px] overflow-y-scroll no-scrollbar"
									// ref={modalRef}
									>
									<ListBox
										listData={listData}
										setModal={setModal}
										setSearch={setSearch}
									/>
								</div>
							)}
						</div>
					</div>
					<MiddleRightSection
						setSearchVisble={setSearchVisble}
						searchvisible={searchvisible}
					/>
				</div>
				{
					<div className="block sm:hidden navbarWrapper">
						<CustomTextInput
							setData={setSearch}
							value={search}
							icon={MainSearch}
							imageAlt={"mainSearch"}
							isIcon={true}
							className={"mb-0"}
							inputStyle="bg-[white] py-[2px]"
							placeholder={"What are you looking for ? "}
							onChange={(
								e: React.ChangeEvent<HTMLInputElement>
							) => onChange(e.target.value)}
							onIconClick={() => {
								if (search?.trim()) {
									// Check if search has a non-empty string
									router.push(`/search?q=${search}`);
								} else {
									console.log(
										"Search input is empty. Please enter a search term."
									);
								}
							}}
							onKeyDown={handleKeyDown}
						/>
						{ismodal && (
							<div
								className="w-[90%] max-h-[300px] bg-[white] absolute top-[86px] sm:top-[46px] overflow-y-scroll no-scrollbar"
								// ref={modalRef}
								>
								<ListBox
									listData={listData}
									setModal={setModal}
									setSearch={setSearch}
								/>
							</div>
						)}
					</div>
				}
			</div>
		</>
	);
}

export default MiddleSection;
