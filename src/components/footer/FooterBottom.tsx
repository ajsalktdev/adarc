import { div } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function FooterBottom() {
	const firstRowData = [
		// { label: 'About us', link: '/about-us/' },
		// // { label: 'Customer Service', link: '/customer-service' },
		// { label: 'Site map', link: '/site-map' },
		// { label: 'Advanced search', link: '/advanced-search' },
		// { label: 'Contact us', link: '/contact-us' }
		{ label: "Payment Terms", link: "/payment-terms" },
		{ label: "Terms And Conditions", href: "/terms-and-conditions" },
	];

	return (
			<div className="text-white  gap-3  pt-2 mt-2 flex flex-col md:flex-row border-t border-solid items-center justify-between">
				<div className="flex justify-center gap-3 max-md:gap-3 max-sm:flex-wrap">
					<div className=" flex items-center justify-start">
						<Link
							href={"/payment-terms"}
							className="md:text-[14px] rubik_regular text-[12px] hover:text-[#FDB514] ">
							Privacy policy
						</Link>
					</div>
					<div className=" border-r-[2px] border-solid "></div>

					<div className="flex items-center justify-start">
						<Link
							href={"/terms-and-conditions"}
							className="md:text-[14px] rubik_regular text-[12px] hover:text-[#FDB514] ">
							Terms And Conditions
						</Link>
					</div>
				</div>
				<div>
					<Image
						width={200}
						height={100}
						alt="paymentAccept"
						src={"/assets/images/payment.webp"}
					/>
				</div>

				{/* <div className="flex justify-center gap-6 mb-4">
                {icons.map((iconData:any, index) => (
                    <div key={index}>
                        {getIcon(iconData)}
                    </div>
                ))}
            </div> */}

				<div className="flex justify-center items-center rubik_regular text-[12px] inter_regular ">
					© Adarc Computer. All rights reserved.
				</div>
			</div>
	);
}

export default FooterBottom;
