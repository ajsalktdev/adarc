import React, { Suspense } from "react";
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
	() => import("@/components/includes/ClientRectangleSection"),
	{ loading: () => <div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div> }
);

// export const metadata: Metadata = {
//   title: 'Adarc Computers',
//   description: 'Your Trusted Source for High-End Gaming PCs & Components in UAE',
// }

const Page = async function () {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const getHomeData = async (accessToken: any) => {
		const apiUrl = process.env.API_URL;

		const headers: Record<string, string> = {
			"Content-Type": "application/json",
		};

		if (accessToken) {
			headers["Authorization"] = `Bearer ${accessToken}`;
		}
		try {
			const response = await fetch(
				`${apiUrl}core/list-homepage-sections/`,
				{
					method: "GET",
					headers,
					next: { revalidate: 60 } // Cache for 60 seconds
				}
			);
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
	const homepageData = await getHomeData(accessToken);
	let homepageDatas = null;

	if (homepageData?.status_code === 6000) {
		homepageDatas = homepageData?.data;
	} else {
		homepageDatas = null;
	}

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

	return (
		<>
			<div className="w-full scroll">
				<Wrapper className="lg:pt-[155px] sm:pt-[150px]  pt-[84px] max-sm:w-[100%] ">
					<Suspense fallback={<div className="h-[400px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
						<BannerSection
							data={homepageData?.data?.banners?.top}
							featured_categories={
								homepageData?.data?.featured_categories
							}
						/>
					</Suspense>

					<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
						<CategorySection
							featured_categories={
								homepageData?.data?.shop_by_category
							}
						/>
					</Suspense>

					{homepageData?.data?.highlight_products.map(
						(item: any, index: any) => (
							<LazyLoadSection key={index}>
								<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
									<RectangleSection
										className=""
										datas={item?.data}
										sectionTitle={item?.title}
										slider_settings={slider_settings}
									/>
								</Suspense>
							</LazyLoadSection>
						)
					)}

					<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
						<BrandSection />
					</Suspense>

					<LazyLoadSection>
						<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
							<RectangleSection
								className="max-md:mb-[20px]"
								datas={homepageData?.data?.deals_for_you}
								sectionTitle={""}
								deals={true}
							/>
						</Suspense>
					</LazyLoadSection>

					<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
						<MiddleBanner
							data={homepageData?.data?.banners?.middle?.desktop}
						/>
					</Suspense>

					<LazyLoadSection>
						<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
							<RectangleSection
								className=""
								viewMoreLink={"explore-more"}
								isViewMore={true}
								datas={homepageData?.data?.explore_more_products}
								sectionTitle={"Explore more"}
								slider_settings={slider_settings}
							/>
						</Suspense>
					</LazyLoadSection>

					<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
						<BottomBanner
							data={
								homepageData?.data?.banners?.bottom?.desktop?.single
							}
						/>
					</Suspense>

					{homepageData?.data?.viewed_by_you?.length > 0 && (
						<LazyLoadSection>
							<Suspense fallback={<div className="h-[200px] w-full animate-pulse bg-gray-200 rounded-lg"></div>}>
								<RectangleSection
									className=""
									datas={
										homepageData?.data?.explore_more_products
									}
									sectionTitle={"Viewed by you"}
									slider_settings={slider_settings}
								/>
							</Suspense>
						</LazyLoadSection>
					)}
				</Wrapper>
			</div>
		</>
	);
};

export default Page;