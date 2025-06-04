"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TopSection from "../navbar/TopSection";
import MiddleSection from "../navbar/MiddleSection";
import BottomSection from "../navbar/BottomSection";

function Navbar() {
	const pathname = usePathname();
	const [isNavbarTopVisible, setIsNavbarTopVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	const handleScroll = () => {
		const currentScrollY = window.scrollY;

		if (currentScrollY > lastScrollY && currentScrollY > 44) {
			setIsNavbarTopVisible(false);
		} else {
			setIsNavbarTopVisible(true);
		}

		setLastScrollY(currentScrollY);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [lastScrollY]);

	return (
		<div
			className={`z-50 w-full fixed flex flex-col-reverse sm:flex-col   navbar ${
				isNavbarTopVisible ? "top-0" : "top-0 sm:-top-[44px]"
			}`}>
			<div className={` bg-[#1F1F1F]`}>
				<TopSection isNavbarTopVisible={isNavbarTopVisible} />
			</div>
			<MiddleSection />
			{pathname?.includes("/login") || pathname?.includes("/signup") ? (
				""
			) : (
				<BottomSection />
			)}
			<div className="w-full  "></div>

			{/* {pathname !== "/" && pathname !== "/wishlist" && pathname !== "/cartPage" && <Breadcrumbs />} */}
		</div>
	);
}

export default Navbar;
