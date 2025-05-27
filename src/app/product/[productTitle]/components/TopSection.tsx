import React from "react";
import ProductImage from "./ProductImage";
import ProductMainDetail from "./ProductMainDetail";
import ProductAbout from "./ProductAbout";
import FrequentlyBought from "./FrequentlyBought";
import PeopleAlsoViewed from "./PeopleAlsoViewed";
import CompareSection from "./CompareSection";
import CustomerSection from "./CustomerSection";
import StarSection from "./StarSection";
import RightSection from "./RightSection";
import SliderImage from "./SliderImage";

export default async function TopSection({
	productTitle,
	reviewProduct,
	Product,
	recentProduct,
}: any) {
	console.log(Product, "iamgesfile");

	return (
		<div className="xl:flex justify-between gap-[16px] relative">
			<div
				id="left-section"
				className=" flex flex-col overflow-x-hidden  xl:pr-[12px] xl:max-w-[75%] xl:w-[75%] xl:min-w-[75%]">
				<div className="xl:flex gap-[16px]">
					<div className="hidden md:block xl:w-[51.58%]">
						<ProductImage data={Product} />
					</div>
					<div className=" md:hidden flex items-center w-full  ">
						<SliderImage Product={Product} />
					</div>
					<div className=" w-full xl:w-[48.42%]">
						<ProductMainDetail
							productTitle={productTitle}
							product={Product}
						/>
					</div>
					<div className=" xl:hidden h-full " id="right-section">
						<RightSection
							Product={Product?.sku}
							productTitle={productTitle}
							data={Product}
						/>
					</div>
				</div>

				{(Product?.description?.trim() || Product?.specification?.trim()) && <div id="aboutproudct">
					<ProductAbout
						description={Product?.description}
						specification={Product?.specification}
					/>
				</div>}
				
				{/* <FrequentlyBought /> */}
				{/* <PeopleAlsoViewed data={recentProduct} /> */}

				{/* <CompareSection /> */}
				{<StarSection productTitle={productTitle} />}

				<div>
					<CustomerSection productTitle={productTitle} />
				</div>
			</div>
			<div
				className="hidden  xl:block sticky top-[170px] z-30 h-full "
				id="right-section">
				<RightSection
					Product={Product?.sku}
					productTitle={productTitle}
					data={Product}
				/>
			</div>
		</div>
	);
}
