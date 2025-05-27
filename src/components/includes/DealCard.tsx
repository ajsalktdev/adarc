import { cn } from "@/utils/utils";
import React from "react";
import String from "../../utils/string";

export default function DealCard({ className }: any) {
	return (
		<div
			className={cn(
				" relative  rounded-[4px] md:py-[32px]  flex flex-col   ",
				className
			)}>
			<div className="flex sm:flex-row md:flex-col flex-col">
				<div className="flex items-center  flex-nowrap ">
					<div className="bg-primary_yellow rounded-[6px] px-[6px] py-[2px] sm:py-[6px] md:py-[8px] mr-[12px] ">
						<h2 className=" text-lg md:text-xl  rubik_semibold text-white ">
							{String?.title.deals}
						</h2>
					</div>
					<div className="">
						<h2 className="text-lg md:text-xl rubik_semibold text-black ">
							FOR YOU
						</h2>
					</div>
					<div></div>
				</div>
				<div className="md:mt-[51px] py-[12px] sm:pl-[20px] md:pl-0 ">
					<div className="md:pb-[16px]">
						<h4 className=" rubik_medium text-[18px] max-lg:text-[16px] leading-[22px] text-black ">
							{String.dealCard.title}
						</h4>
					</div>
					<div className="sm:hidden md:block block">
						<h6 className="rubik_regular text-[12px]  leading-[16px] text-black">
							{String.dealCard.subTitle}
						</h6>
					</div>
				</div>
			</div>
			<div className="hidden sm:flex  md:hidden gap-3 w-full mt-[20px]">
                <div className="">
                <h6 className="rubik_regular text-[12px]  leading-[16px] text-black">
					{String.dealCard.subTitle}
				</h6>
                </div>
				
                <div className=" items-end  ">
				<button className=" block text-tang_blue rubik_semibold text-[12px] leading-[16px] text-nowrap whitespace-nowrap ">
					{String.button.discover_more}
				</button>
			</div>
			</div>

			<div className=" w-[100%] flex md:flex sm:hidden items-end  absolute bottom-0 sm:bottom-2">
				<button className=" block text-tang_blue rubik_semibold text-[12px] leading-[16px] ">
					{String.button.discover_more}
				</button>
			</div>
		</div>
	);
}
