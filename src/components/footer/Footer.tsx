import Image from "next/image";
import React from "react";
import logo from "../../../public/assets/images/logo.svg";
import FooterLeft from "./FooterLeft";
import FooterBottom from "./FooterBottom";
import DownloadApp from "./DownloadApp";
import Wrapper from "../includes/Wrapper";
import { div } from "framer-motion/client";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaThreads } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Footer() {
	return (
		<div className="bg-PRIMARY_BG">
			<Wrapper className="  w-full text-[#E3E8EF] !py-[24px] ">
				<div className="w-full grid-cols-1 grid sm:grid-cols-2   lg:grid-cols-[2fr_2fr_1.5fr]">
					<div className=" max-lg:row-span-1">
						<div className="w-[250px] flex  items-baseline sm:mr-[20px]   max-[850px]:mb-[12px]">
							<Image
								src={logo}
								alt="logo"
								height={100}
								width={250}
								className="w-[250px] max-xl:w-[200px]"
								loading="lazy"
							/>
						</div>
						<div className="w-full pl-1">
							<p className="text-white text-[12px] rubik_regular leading-[20px] md:text-[14px] md:leading-[24px]">
								Adarc Computer established in the year 2007, has
								emerged as a major constituent of the IT
								Re-distribution industry in every part of UAE.
								Currently, Adarc Computer is the authorized
								dealer of global leading brands.
							</p>
						</div>
					</div>
					<div className="flex gap-[80px] max-lg:row-span-2  max-lg:flex-col  max-xl:gap-[50px] max-lg:gap-[30px] ">
						<FooterLeft />
						{/* <DownloadApp /> */}
					</div>
					<p className="text-[white] sm:hidden  text-left text-sm mt-[20px] lg:mb-[15px]">
								Connect us:
							</p>
					<div className="flex sk:flex-row flex-col max-lg:row-span-1 col-span-1/2 max-sk:justify-start  max-sm:justify-between min-w-[30px] min-h-[30px] sk:items-end sm:c lg:items-center py-2 m">
						<div className="flex  sm:flex-col  max-sm:flex-wrap gap-3">
							<p className="text-[white] max-sm:hidden  text-left text-sm mt-[20px]  lg:mt-0 lg:mb-[15px]">
								Connect us:
							</p>
							<Link
								className="flex   items-center gap-4"
								href={"/"}>
								<div className="h-[30px] min-w-[30px] min-h-[30px] w-[30px] rounded-full bg-yellow-600 items-center justify-center flex ">
									<FaPhoneAlt />
								</div>

								<span className="text-[18px]">
									&#x1f1e6;&#x1f1ea;
								</span>
								<span className=" text-[12px] md:text-[14px] rubik_regular hover:text-[#FDB514] ">
									{" "}
									+971 2 676 3999
								</span>
							</Link>
							<Link
								className="flex items-center gap-4"
								href={"/"}>
								<div className="h-[30px] w-[30px] rounded-full min-w-[30px] min-h-[30px] bg-yellow-600 items-center justify-center flex ">
									<MdEmail />
								</div>

								<span className=" text-[12px] md:text-[14px] rubik_regular hover:text-[#FDB514]">
									adarccomputer.com
								</span>
							</Link>
							<Link
								className="flex items-center gap-4"
								href={
									"https://maps.app.goo.gl/G2ynCw6edrJz96Ya9?g_st=aw"
								}>
								<div className="h-[30px] w-[30px] rounded-full min-w-[30px] min-h-[30px] bg-yellow-600 items-center justify-center flex ">
									<FaLocationDot />
								</div>

								<span className=" text-[12px] md:text-[14px] rubik_regular hover:text-[#FDB514]">
									Abu Dhabi - Hamdan Bin
								</span>
							</Link>
							<div className="sm:flex items-center hidden  gap-3 mt-6">
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] bg-blue-500 ">
									<FaFacebookF />
								</Link>
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] bg-white">
									<FaInstagram color="red" />
								</Link>
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] bg-white">
									<FaThreads color="black" />
								</Link>
							</div>
						</div>
						<div className="flex items-center sm:hidden  gap-3 mt-6">
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[24px] sk:w-[30px] sm:w-[40px] h-[24px] sk:h-[30px] sm:h-[40px] bg-blue-500 ">
									<FaFacebookF />
								</Link>
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[24px] sk:w-[30px] sm:w-[40px] h-[24px] sk:h-[30px] sm:h-[40px] bg-white">
									<FaInstagram color="red" />
								</Link>
								<Link
									href={"/"}
									className="flex items-center justify-center rounded-[4px] w-[24px] sk:w-[30px] sm:w-[40px] h-[24px] sk:h-[30px] sm:h-[40px] bg-white">
									<FaThreads color="black" />
								</Link>
							</div>
					</div>
				</div>
				<FooterBottom />
			</Wrapper>
		</div>
	);
}

export default Footer;
