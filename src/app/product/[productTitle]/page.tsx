// src/app/[productTitle]/page.tsx
import React from "react";
import Head from "next/head";
import Wrapper from "@/components/includes/Wrapper";
import TopSection from "./components/TopSection";
import fetchApiData from "@/config/fetch-api-data";
import Link from "next/link";
import RecentlyViewed from "./components/RecentlyViewed";
import Script from "next/script";
import BreadCrumps from "./components/BreadCrumps";
import StikcyButton from "./components/StikcyButton";
import { cookies } from "next/headers";

// Define types for props
interface Params {
	productTitle: string;
}

interface ApiResponse<T> {
	status_code: number;
	data: T | null;
	message?: string;
}

interface Product {
	name: string;
	description: string;
	sku: string;
	price: number;
	meta_title?: string;
	meta_description?: string;
	meta_keywords?: string;
}

interface Props {
	product: Product | null;
	review: any;
	recentProduct: Product[] | null;
	productTitle: string;
}

// Server-side functions to fetch data
const getData = async (productTitle: string) => {
	const response = await fetchApiData<ApiResponse<any>>(
		`products/view-product/${productTitle}`
	);
	console.log("helloo", response);

	return response;
};




const productDetails = async (productTitle: string, accessToken?: string) => {
	try {
	  const apiUrl = process.env.API_URL;
  
	//   const cookieStore = await cookies();
	//   const accessToken = cookieStore.get("accessToken")?.value;
  
	  const headers: Record<string, string> = {
		"Content-Type": "application/json",
	  };
  
	  if (accessToken) {
		headers["Authorization"] = `Bearer ${accessToken}`;
	  }
  
	  const response = await fetch(`${apiUrl}products/view-product/${productTitle}`, {
		method: "GET",
		// headers :{
		// 	Authorization : `Bearer ${accessToken}`
		//   }
		headers,
		// credentials: "include",
	  });
  
	  if (!response.ok) {
		throw new Error(`Failed to fetch product: ${response.status}`);
	  }
  
	  return await response.json();
	} catch (error) {
	  console.error("Error fetching product:", error);
	  return null;
	}
  };

export async function generateMetadata({ params }: { params: Params }) {
	const { productTitle } = params;



	const apiData = await fetchApiData<ApiResponse<any>>(
		`products/view-product/${productTitle}`
	);
	// const apiData = await getData(productTitle);
	// const apiData: any = productDetails(params?.productTitle,accessToken);
	const product = apiData?.data;

	return {
		title: product?.meta_title || product?.name,
		description: product?.meta_description || "Default description",
		keywords: product?.meta_keywords || "",
	};
}

// This is the server-side page component
const Page = async ({ params }: { params: Params }) => {
	const { productTitle } = params;
	const cookieStore:any= cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const apiData = await productDetails(productTitle, accessToken);

	// const apiData = await getData(productTitle);

	// const apiData = await productDetails(params?.productTitle,accessToken);

	if (apiData?.status_code !== 6000) {
		return (
			<Wrapper>
				<div className="text-center py-[48px]">
					<h1>Product Not Found</h1>
					<p>Please check the product title or try again later.</p>
				</div>
			</Wrapper>
		);
	}

	const product = apiData.data;

	return (
		<Wrapper className=" ">
			<Head>
				<title>{product?.name}</title>
				<meta name="description" content={product?.description} />
				<meta name="keywords" content={product?.description || ""} />
			</Head>
			<Script
				type="application/ld+json"
				id="product-jsonld"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "Product",
						name: product.name,
						description: product.description,
						sku: product.sku,
						offers: {
							"@type": "Offer",
							price: product.price,
							priceCurrency: "INR",
							availability: "https://schema.org/InStock",
						},
						url: `https://adarccomputers.com/${productTitle}`,
						brand: {
							"@type": "Organization",
							name: "Adarc Computers",
						},
					}),
				}}
			/>

			<div className="relative">
				<div className="hidden  md:block w-full">
					<BreadCrumps product={product} />
				</div>

				<TopSection
					productTitle={productTitle}
					Product={product}
					// reviewProduct={review}
					// recentProduct={recentProduct}
				/>

				<div className="md:hidden mb-[15px] w-full">
					<BreadCrumps product={product} />
				</div>
				<RecentlyViewed product={product} className=" py-[32px]" />
			</div>
		</Wrapper>
	);
};

export default Page;
