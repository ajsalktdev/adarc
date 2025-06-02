import React from "react";
import CategorySection from "@/components/includes/CategorySection";
import BrandSection from "@/components/includes/BrandSection";
import BannerSection from "@/components/banner-section/BannerSection";
import MiddleBanner from "@/components/includes/MiddleBanner";
import BottomBanner from "@/components/includes/BottomBanner";
import type { Metadata } from "next";
import Wrapper from "@/components/includes/Wrapper";
// import RectangleSection from '@/components/includes/RectangleSection';
import Products from "../../data.json";
import fetchApiData from "@/config/fetch-api-data";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import LazyLoadSection from "@/components/includes/LazyLoadSection";

const RectangleSection = dynamic(
	() => import("@/components/includes/ClientRectangleSection")
);

const getBannerData = async () => {
	const response = await fetchApiData<any>("core/list-banners/");
	return response;
};

// const getProductsData = async () => {
//   const response = await fetchApiData<any>('products/homepage-products/');
//   return response;
// }

const getProductsData = async (accessToken:any) => {
	try {
		const apiUrl = process.env.API_URL;

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (accessToken) {
			headers["Authorization"] = `Bearer ${accessToken}`;
		}

		const response = await fetch(`${apiUrl}products/homepage-products/`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			// headers,
			// credentials: "include",
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch homepage products: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error("Error fetching homepage products:", error);
		return null;
	}
};

const getData = async () => {
	const response = await fetchApiData<any>("products/list-products/");
	return response;
};

const slider_settings = {
	slidesToShow: 6,
	slidesToScroll: 2,
	responsive: [
		{
			breakpoint: 1280,
			settings: {
				slidesToShow: 5,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 640,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 1,
			},
		},
		{
			breakpoint: 480,
			settings: {
				arrows: false,
				swipeToSlide: true,
				slidesToShow: 2,
				slidesToScroll: 2,
			},
		},
	],
};

// export const metadata: Metadata = {
//   title: 'Adarc Computers',
//   description: 'Your Trusted Source for High-End Gaming PCs & Components in UAE',
// }
const Page = async function () {
	const apiData = await getData();
	let products = null;
	if (apiData?.status_code === 6000) {
		products = apiData?.data;
	} else {
		products = null;
	}

	const bannerData = await getBannerData();
	let banners = null;
	if (bannerData?.status_code === 6000) {
		banners = bannerData?.data;
	}

  const cookieStore = await cookies();
const accessToken = cookieStore.get("accessToken")?.value;
	const productsData = await getProductsData(accessToken);
	let productsDatas = null;

	if (productsData?.status_code === 6000) {
		productsDatas = productsData?.data;
	} else {
		productsDatas = null;
	}

	return (
		<>
			<div className="w-full scroll">
				<Wrapper className="lg:pt-[155px] sm:pt-[150px]  pt-[84px] max-sm:w-[100%] ">
					<div></div>
					<BannerSection
          banners = {productsDatas}
						data={banners?.top}
						productsDatas={productsDatas}
						accessToken={accessToken}
					/>

					<CategorySection />
					<LazyLoadSection>		
            <RectangleSection
						className=""
						datas={productsDatas?.new_arrivals}
						sectionTitle={"New Arrival"}
						slider_settings={slider_settings}
					/> </LazyLoadSection>
					<LazyLoadSection>
						<RectangleSection
							className=""
							datas={productsDatas?.popular_gaming_pcs}
							sectionTitle={"Popular gaming PC"}
							slider_settings={slider_settings}
						/>
					</LazyLoadSection>
					<LazyLoadSection>
						<RectangleSection
							className=""
							datas={productsDatas?.best_selling_graphic_cards}
							sectionTitle={"Best Selling Graphic Card"}
							slider_settings={slider_settings}
						/>
					</LazyLoadSection>
					<BrandSection />
					<LazyLoadSection>
						<RectangleSection
							className="max-md:mb-[20px]"
							datas={productsDatas?.deals_for_you}
							sectionTitle={""}
							deals={true}
						/>
					</LazyLoadSection>	
					<MiddleBanner data={banners?.middle?.desktop} />
					<LazyLoadSection>	
						<RectangleSection
							className=""
							viewMoreLink={"explore-more"}
							isViewMore={true}
							datas={products}
							moreItems={false}
							sectionTitle={"Explore more"}
							slider_settings={slider_settings}
						/>
					</LazyLoadSection>	
					<BottomBanner data={banners?.bottom?.desktop?.single} />
					{productsDatas?.viewed_by_you?.length > 0 && (
						<LazyLoadSection>
							<RectangleSection
								className=""
								isViewBy={true}
								datas={productsDatas?.viewed_by_you}
								viewBy={true}
								sectionTitle={"Viewed by you"}
								slider_settings={slider_settings}
							/>
						</LazyLoadSection>
					)}
				</Wrapper>
			</div>
		</>
	);
};

export default Page;

