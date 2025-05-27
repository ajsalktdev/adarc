import React, { useRef } from "react";
import productData from "../../../data.json";
import Image from "next/image";
import Banner from "../../../public/temp/banner.svg";
import MainMenu from "./MainMenu";
import fetchApiData from "@/config/fetch-api-data";
import MainBanner from "./_components/MainBanner";
import MobileBanner from "./MobileBanner";

const BannerSection = async function ({
	data,
	productsDatas,
	accessToken,
    banners
}: any) {
	const getData = async () => {
		const response = await fetchApiData<any>(
			"products/list-all-categories/"
		);
		console.log(response, "categoriessss");
		return response;
	};

	const apiData = await getData();
	let categories = null;
	if (apiData?.status_code === 6000) {
		categories = apiData?.data;
	} else {
		categories = null;
	}

	return (
		<div
			className="my-8  w-full flex gap-6 max-sm:mb-4  max-[480px]:mb-2"
			//  style={{ height: 'calc(100vh - 290px)' }}
		>
			<div className="w-[25%] relative z-20 hidden xl:block">
				<MainMenu data={categories} />
			</div>
			<div className="xl:w-[75%] w-[100%] h-full flex flex-col gap-4 overflow-hidden">
				{/* <div ref={imageref}  className="h-[58%] w-full  flex justify-center   overflow-x-scroll">
                    {productData.mainBanner.map((item) => (
                        // <div className='w-full h-full '>
                            <Image src={item?.image} alt="banner" height={100} width={100} className='' />
                        // </div>
                    ))}
                </div> */}
				<div className="hidden sm:block">
					<MainBanner banners={banners} datas={data} data={data?.desktop?.slider} />
				</div>

				<div className="sm:hidden">
					<MobileBanner data={data?.mobile?.slider} />
				</div>

				{/* <div className=" max-[480px]:hidden flex max-sm:px-[4px] gap-4  " >
                    {data?.single?.map((item:any, index:any) => (
                        <div key={index} className="w-[50%] flex justify-center rounded-[12px] overflow-hidden  bg-yellow-200" style={{aspectRatio:2.5}}>
                            <Image src={item?.image} alt={`banner-${index}`} height={180} width={320} className='object-cover w-full h-full' loading="lazy" />
                        </div>
                    ))}
                </div> */}
				<div className="max-[480px]:hidden flex max-sm:px-[4px] gap-4">
					{data?.desktop?.single?.map((item: any, index: any) => (
						<div
							key={index}
							className="w-[50%] flex justify-center rounded-[12px] overflow-hidden bg-yellow-200"
							style={{ aspectRatio: 2.5 }}>
							<div className="relative w-full h-full">
								<Image
									src={item?.image}
									alt={`banner-${index}`}
									fill
									className="object-cover"
									loading="lazy"
									quality={100}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BannerSection;
