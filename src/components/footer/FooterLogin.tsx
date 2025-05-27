import { div } from "framer-motion/client";
import Link from "next/link";
import React from "react";
import Wrapper from "../includes/Wrapper";

function FooterLogin() {
	return (
		<div>
			<Wrapper className="!pt-0">
				<div className="w-full inter_regular font-normal text-[14px] max-md:pt-[3] md:p-6 flex gap-4 flex-col md:flex-row max-md:items-center justify-between mt-4 bg-[#fff]">
					<div className="flex items-center gap-2">
						<Link
							className="md:text-[14px] rubik_regular text-[12px] hover:text-[#FDB514]"
							href={"/payment-terms"}>
							Privacy policy
						</Link>
						<div className="border-r-[2px] border-solid border-[black] h-[20px]"></div>
						<Link
							href={"/terms-and-conditions"}
							className="md:text-[14px] rubik_regular text-[12px] hover:text-[#FDB514]">
							Terms And Conditions
						</Link>
					</div>
					<p className="flex justify-center items-center rubik_regular text-[12px] inter_regular">
						Copyright © Adarc Computer. All rights reserved.
					</p>
				</div>
			</Wrapper>
		</div>
	);
}

export default FooterLogin;
