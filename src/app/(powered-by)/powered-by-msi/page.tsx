"use client";
import RectangleSection from "@/components/includes/RectangleSection";
import Wrapper from "@/components/includes/Wrapper";
import fetchApiData from "@/config/fetch-api-data";
import React, { useEffect } from "react";
import ProductSection from "../_components/ProductSection";
import { useSearchParams } from "next/navigation";
import { div } from "framer-motion/client";

function Page() {
	const searchParams = useSearchParams();
	const [data, setData] = React.useState<any>(null);
	const [paginationData, setPagination] = React.useState({});
	const page = searchParams.get("page") || 1;
	const getData = async () => {
		const response = await fetchApiData<any>(
			`products/list-products?categories=powered-by-msi&page=${page}&per_page=10`
		);
		console.log(response, "response");

		if (response.status_code === 6000) {
			setData(response?.data);
			setPagination(response?.pagination_data);
		} else if (response.status_code === 6001) {
			setData(null);
			setPagination({});
		}
	};

	useEffect(() => {
		getData();
	}, [searchParams]);
	return (
			<div className="bg-black pb-5">
				<Wrapper className="max-xl:pt-[120px] max-mc:px-4 max-sm:px-2 max-sl:px-1 max-sk:px-[2px]  ">
					{/* Section 1 */}
					<div className="">
						<div className=" mx-auto pb-5">
							<div className="flex flex-wrap">
								<div className="w-full md:w-1/2 p-4">
									<div>
										<picture>
											<source
												type="image/webp"
												srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/1.webp"
											/>
											<source
												type="image/png"
												srcSet="https://adarccomputer.com/media/wysiwyg/1.png"
											/>
											<img
												src="https://adarccomputer.com/media/wysiwyg/1.png"
												alt=""
												className="w-full"
											/>
										</picture>
									</div>
									<div className="mt-4 ">
										<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1 font-bold ">
											THE POWER OF ONE
										</h2>
										<p className="mt-2 text-[16px] max-md:text-[14px] leading-9 max-lg:leading-7 max-mdx:leading-6">
											&quot;Powered by MSI&quot; logo
											ensures your PC is built by experts
											using their favorite MSI components
											for great compatibility and Gaming
											Experience.
										</p>
									</div>
								</div>

								<div className="w-full md:w-1/2 p-4">
									<picture>
										<source
											type="image/webp"
											srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/2_2.webp"
										/>
										<source
											type="image/png"
											srcSet="https://adarccomputer.com/media/wysiwyg/2_2.png"
										/>
										<img
											src="https://adarccomputer.com/media/wysiwyg/2_2.png"
											alt=""
											className="w-full"
										/>
									</picture>
								</div>

								<div className="w-full md:w-1/2 p-4">
									<picture>
										<source
											type="image/webp"
											srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/3_1.webp"
										/>
										<source
											type="image/png"
											srcSet="https://adarccomputer.com/media/wysiwyg/3_1.png"
										/>
										<img
											src="https://adarccomputer.com/media/wysiwyg/3_1.png"
											alt=""
											className="w-full"
										/>
									</picture>
								</div>

								<div className="w-full md:w-1/2 p-4">
									<div>
										<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1 font-bold">
											OUR BEST PRODUCTS
										</h2>
										<p className="mt-2 text-[16px] max-md:text-[14px] leading-9 max-lg:leading-7 max-mdx:leading-6">
											MSI&apos;s decades of expertise in
											designing and creating award-winning
											components have enabled us and our
											partners to continue to deliver
											great PCs at every price point.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Wrapper>
				{/* Section 2 */}
				<div className="bg-black py-10  text-[#fff]">
					<div className=" mx-auto">
						<div className="flex flex-wrap items-center">
							<div className="w-full md:w-1/3 p-4">
								<picture>
									<source
										type="image/webp"
										srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/4_1.webp"
									/>
									<source
										type="image/png"
										srcSet="https://adarccomputer.com/media/wysiwyg/4_1.png"
									/>
									<img
										src="https://adarccomputer.com/media/wysiwyg/4_1.png"
										alt=""
										className="w-full"
									/>
								</picture>
							</div>
							<div className="w-full md:w-2/3 p-4">
								<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1 font-bold ">
									...INSTALLED BY THE BEST SYSTEM INTEGRATORS
								</h2>
								<p className="mt-2 text-[#fff] text-[16px] max-md:text-[14px] leading-9 max-lg:leading-7 max-mdx:leading-6">
									Each Powered by MSI PC is designed and
									crafted by our teams and partners. We
									collaborate with the best PC integrators all
									around the world and cherry-pick each
									component to offer great gaming performance.
								</p>
							</div>

							<div className="w-full md:w-2/3 p-4">
								<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1  font-bold">
									BETTER TOGETHER
								</h2>
								<p className="mt-2 text-[#fff] text-[16px] max-md:text-[14px] leading-9 max-lg:leading-7 max-mdx:leading-6">
									Choosing a POWERED BY MSI PC guarantees you
									the best compatibility between all
									components. You are not a handyman? No need
									to worry about size, capacity, socket,
									standards. POWERED BY MSI PCs provide you a
									plug and play solution so you can GAME or
									WORK mindfree.
								</p>
							</div>

							<div className="w-full md:w-1/3 p-4">
								<picture>
									<source
										type="image/webp"
										srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/5_2.webp"
									/>
									<source
										type="image/png"
										srcSet="https://adarccomputer.com/media/wysiwyg/5_2.png"
									/>
									<img
										src="https://adarccomputer.com/media/wysiwyg/5_2.png"
										alt=""
										className="w-full"
									/>
								</picture>
							</div>
						</div>
					</div>
				</div>

				{/* Section 4 */}
				<div className="py-10 bg-black text-[#fff] ">
					<div className=" mx-auto">
						<div className="flex flex-wrap items-center">
							<div className="w-full md:w-5/12 p-4">
								<picture>
									<source
										type="image/webp"
										srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/7.webp"
									/>
									<source
										type="image/png"
										srcSet="https://adarccomputer.com/media/wysiwyg/7.png"
									/>
									<img
										src="https://adarccomputer.com/media/wysiwyg/7.png"
										alt=""
										className="w-full"
									/>
								</picture>
							</div>
							<div className="w-full md:w-7/12 p-4">
								<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1 font-bold text-[#fff]">
									OUR POWERED BY MSI PCS
								</h2>
								<p className="mt-2 text-[16px] max-md:text-[14px] leading-9 max-lg:leading-7 max-mdx:leading-6  text-[#fff] ">
									You will find below our &quot;POWERED BY
									MSI&quot; PCs Designed, built and fine tuned
									by our teams.
								</p>
							</div>
						</div>
					</div>
				</div>

				<Wrapper className="!pt-[40px]  max-mc:px-4 max-sm:px-4 max-sl:px-4 max-sk:px-4 bg-[#40003c] border-solid border-[4px]  border-[#f600ff]  ">
					<div>
						<h2 className="text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-normal max-md:leading-1 font-bold text-[#fff] mb-4">
							Shop Our Powered By MSI PCs
						</h2>
						<ProductSection
							isMsiPage={true}
							data={data}
							paginationData={paginationData}
							cardStyle="w-[19%] max-lgs:w-[24%] mb-2 max-sm:w-[99%]  bg-white"
						/>
					</div>
				</Wrapper>
			</div>
	);
}

export default Page;
