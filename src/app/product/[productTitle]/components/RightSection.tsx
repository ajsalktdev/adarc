"use client";
import PriceComponent from "@/components/includes/PriceComponent";
import React, { useEffect, useState } from "react";
import ReturnAvailComponent from "./ReturnAvailComponent";
import strings from "@/utils/string";
import CustomButton from "@/components/buttons/CustomButton";
import CartButton from "../../../../../public/assets/icons/cartDark.svg";
import QuantityButton from "@/components/buttons/QuantityButton";
import DeliveryItemHighlight from "./DeliveryItemHighlight";
import product from "../../../../../data.json";
import TitleComponent from "./TitleComponent";
import fetchApiData from "@/config/fetch-api-data";
import postApiData from "@/config/post-api-data";
import WishList from "../../../../../public/assets/icons/wishlist.svg";
import RedWishList from "../../../../../public/assets/icons/redWishlist.svg";
import useZustandStore from "@/store/useStore";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import StikcyButton from "./StikcyButton";
import { cn } from "@/utils/utils";

interface ApiResponse<T> {
	status_code: number;
	data: T | null;
	message?: string;
}
export default function RightSection({ Product, productTitle, data }: any) {
	const [isLoading, setLoader] = useState(false);
	const [isBuyLoading, setBuyLoader] = useState(false);
	const {
		wishlist,
		setWishlist,
		accessToken,
		setCartlist,
		setCartAmountDetails,
		deliveryLocation,
		cartlist,
	} = useZustandStore();

	const router = useRouter();




	// const addtoCart = async (isType:string) => {
	//     isType  ==  'checkout' ? setBuyLoader(true) :setLoader(true);
	//     try {
	//         const response = await postApiData<ApiResponse<any>>(
	//             `carts/add-cart-item/${productTitle}/`,
	//             {
	//                 quantity: quantity,
	//                 sku_code: Product,
	//             },
	//             undefined,
	//             false,
	//             true
	//         );

	//         if (response?.status_code === 6000) {
	//             // Cookies.set("cart_id", response?.data?.cart_id, { path: '/', secure: true, sameSite: 'Strict' });
	//             // await moveToCheckout()

	//             console.log("Item added to cart successfully!", response);
	//             await getCartList(isType,response?.data?.cart_id)

	//         } else {
	//             console.error("Failed to add item to cart:", response?.message);
	//         }
	//     } catch (error) {
	//         console.error("An error occurred while adding to cart:", error);
	//     } finally {
	//         isType  ==  'checkout'? setBuyLoader(false) :setLoader(false);
	//     }
	// };

	// const addtoCart = async (isType: string) => {
	//     const API_URL = process.env.NEXT_PUBLIC_API_URL;
	//     isType === 'checkout' ? setBuyLoader(true) : setLoader(true);

	//     try {
	//       const accessToken = Cookies.get("accessToken");
	//       const headers: Record<string, string> = {
	//         "Content-Type": "application/json",
	//       };

	//       if (accessToken) {
	//         headers["Authorization"] = `Bearer ${accessToken}`;
	//       }

	//       const response = await fetch(`${API_URL}carts/add-cart-item/${productTitle}/`, {
	//         method: "POST",
	//         headers,
	//         body: JSON.stringify({
	//           quantity,
	//           sku_code: Product,
	//         }),
	//         credentials: "include",
	//       });

	//       if (!response.ok) {
	//         const text = await response.text();
	//         throw new Error(`Error ${response.status}: ${text}`);
	//       }

	//       const data = await response.json();

	//       if (data?.status_code === 6000) {
	//         await getCartList(isType, data?.data?.cart_id);
	//       } else {
	//         console.error("Failed to add to cart:", data?.message);
	//       }
	//     } catch (err) {
	//       console.error("Add to cart failed:", err);
	//     } finally {
	//       isType === 'checkout' ? setBuyLoader(false) : setLoader(false);
	// ;
	//       setAddtoCartButton('Added to Cart')
	//       setTimeout(() => {
	//         setAddtoCartButton(strings.button.addCart)
	//       }, 2000)
	//     }
	//   };

	const addtoCart = async (isType?: any) => {
		const API_URL = process.env.NEXT_PUBLIC_API_URL;
		 setLoader(true);

		try {
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			};

			if (accessToken) {
				headers["Authorization"] = `Bearer ${accessToken}`;
			}

			// 🔍 Check if item already exists in cart
			const existingItem = cartlist.find(
				(item: any) => item?.product?.slug === productTitle
			);
			const finalQuantity = existingItem
				? existingItem.quantity + 1
				: quantity;

			//   console.log(existingItem,":",finalQuantity,'existingItem')

			const response = await fetch(
				`${API_URL}carts/add-cart-item/${productTitle}/`,
				{
					method: "POST",
					headers,
					body: JSON.stringify({
						quantity: finalQuantity,
						sku_code: Product,
					}),
					credentials: "include",
				}
			);

			if (!response.ok) {
				const text = await response.text();
				throw new Error(`Error ${response.status}: ${text}`);
			}

			const data = await response.json();

			if (data?.status_code === 6000) {
				await getCartList(isType, data?.data?.cart_id);
			} else {
				console.log("Failed to add to cart:", data?.message);
			}
		} catch (err) {
			console.log("Add to cart failed:", err);
		} finally {

				setAddtoCartButton("Added to Cart");
				setTimeout(() => {
					setAddtoCartButton(strings.button.addCart);
				}, 2000);
			
		}
	};

	const moveToCheckout = async () => {
		setBuyLoader(true);

		try {
			if (accessToken) {
				const response = await postApiData<ApiResponse<any>>(
					`orders/buy-now/${data?.slug}/`,
					{
						quantity: quantity,
						is_for_gift: false,
					},
					undefined,
					true
				);

				if (response?.status_code === 6000) {
					const id = response?.data?.order_id;

					console.log("Item added checkout!", response);
					router.push(`/checkout/${id}`);
				} else {
					console.error(
						"something went wrong 6001",
						response?.message
					);
				}
			}
            else{

                console.log('hellooooo')
                router.push('/login')
            }
		} catch (error) {
			console.log("something went wrong:", error);
		} finally {
			setBuyLoader(false);
		}
	};
	//     const moveToCheckout = async (cartId:string) => {
	//         setBuyLoader(true)
	//         console.log(data,'hoiiiiiiiiii')

	//     try {
	//         const response = await postApiData<ApiResponse<any>>(
	//             `orders/create-order/`,
	//             {
	//                 selected_items: [cartlist?.[0]?.pk],

	//             },
	//             undefined,
	//             true,
	//         );

	//         if (response?.status_code === 6000) {
	//             const id = response?.data?.order_id

	//             console.log("Item added checkout!", response);
	//             router.push(`/checkout/${id}`)
	//         } else {
	//             console.error("something went wrong 6001", response?.message);
	//         }
	//     } catch (error) {
	//         console.log("something went wrong:", error);
	//     } finally {

	//         setBuyLoader(false);
	//     }
	// };

	const getCartList = async (isType?: any, cartId?: string) => {

		const response = await fetchApiData<ApiResponse<any>>(
			"carts/list-cart-items/",
			{ requireAuth: true, checkAccessToken: true }
		);
		if (response?.status_code == 6000) {
			setCartlist(response?.data?.cart_items);
			setCartAmountDetails(response?.data?.cart_amount_details);
			// isType  ===  'checkout' && await moveToCheckout(response?.data?.last_added_item)
		}
		console.log(response, "cartResponse");
	};

	const [isRefresh, setRefresh] = useState(false);
	const getWishList = async () => {
		if (accessToken) {
			const response = await fetchApiData<ApiResponse<any>>(
				"wishlists/list-wishlist-items/",
				{ requireAuth: true }
			);
			if (response?.status_code == 6000) {
				// setWishist(response?.data?.cart_items)
				setWishlist(response?.data?.cart_items);
				setRefresh(!isRefresh);
			}
		}
	};

	console.log(cartlist, "cartlisttttt");

	const addtoWishlist = async () => {
		try {
			const response = await postApiData<ApiResponse<any>>(
				`wishlists/add-wishlist-item/${productTitle}/`,
				{},
				undefined,
				true
			);

			if (response?.status_code === 6000) {
				await getWishList();
				console.log("resoinsse", response);

				console.log("Item added to cart successfully!", response);
			} else {
				console.error("Failed to add item to cart:", response?.message);
			}
		} catch (error) {
			console.error("An error occurred while adding to cart:", error);
		} finally {
		}
	};
	const [quantity, setQuantity] = useState(1);

	const incrementCount = (e: any) => {
		e.stopPropagation();
		if (quantity < data?.stock) {
			setQuantity(quantity + 1);
		}
	};
	const decrementCount = (e: any) => {
		e.stopPropagation();
		if (quantity != 1) {
			setQuantity(quantity - 1);
		}
	};

	const [isInWishlist, setInWishlist] = useState(false);
	console.log(wishlist, "ddd");

	useEffect(() => {
		const isProductInWishlist = wishlist?.some(
			(item: any) => item?.product?.slug === productTitle
		);
		setInWishlist(isProductInWishlist || false);
	}, [isRefresh, wishlist]);

	const estimatedDate = addDays(new Date(), deliveryLocation?.deliveryTime);
	const formattedDate = format(estimatedDate, "EEEE, d MMMM");

	const [addtoButton, setAddtoCartButton] = useState(strings.button.addCart);

	return (
		<div className=" px-4 lg:py-6 md:py-4 py-2 relative   rounded-[8px] bg-white_smoke">
			<div
				className={cn(
					"md:pb-[16px] pb-1 lg:flex-col gap-[16px] flex border-b border-solid border-Platinum",
					data?.price_details?.is_offer === true && "max-lg:items-end"
				)}>
				<PriceComponent
					actualPriceClass=""
					badge={data?.badge}
					isproductPage={true}
					data={data?.price_details}
					isHome={false}
				/>
				{/* <ReturnAvailComponent /> */}
				<TitleComponent
					titleClass="text-[12px] rubik_regular text-nickel_grey"
					title={strings.productPage.inclusiveVAT}
				/>
			</div>
			<div className="flex flex-col py-[16px] gap-[8px] border-b border-solid border-Platinum">
				<div className="flex flex-row items-center w-[100%]">
					<p className="text=[12px] text-BLACK leading-[16px] rubik_regular">
						Delivery to{" "}
						<b className="text=[12px] text-BLACK leading-[16px] rubik_medium">
							{deliveryLocation?.title}
						</b>
					</p>
				</div>
				<div className="">
					<p>
						{strings.productPage.deliveryDateTitle}
						<b className="text=[12px] text-BLACK leading-[16px] rubik_medium">
							{" "}
							{formattedDate}
						</b>
					</p>
				</div>
			</div>
			<div className=" py-4 border-b border-solid border-Platinum">
				<div className="mb-[26px]">
					<p className="text=[12px] text-BLACK leading-[14px] rubik_regular">
						Sold and shipped by:{" "}
						<b className="text=[12px] text-BLACK leading-[14px] rubik_medium">
							Adarc computers
						</b>
					</p>
				</div>
				<div id="topproduct" className="w-full">
					{/* <StikcyButton /> */}
				</div>
				<div id="stop-sticky" className="h-[1px]" />

				<div className="flex flex-row justify-between max-md:mt-4 ">
					<QuantityButton
						stock={data?.stock}
						incrementCount={incrementCount}
						decrementCount={decrementCount}
						quantity={quantity}
						setQuantity={setQuantity}
					/>
					<div>
						<div className="">
							<h6 className="rubik_medium text-[12px] text-gunmetal leading-[14px]">
								AED{" "}
								{Number(
									quantity * data?.price_details?.actual_price
								).toFixed(2)}
							</h6>
							{data?.stock > 0 && (
								<div className="mt-1">
									<h6 className="rubik_medium text-[14px] text-[gunmetal] leading-[14px]">
										stock : {data?.stock}
									</h6>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="">
					<div className=" my-[8px]">
						<CustomButton
							onClick={() => addtoCart("cart")}
							isLoading={isLoading}
							isDisabled={data?.stock < 1}
							isButtonClass={true}
							buttonClass=" border-0 bg-button_yellow "
							isLeftIcon={true}
							leftIcon={CartButton}
							title={
								data?.stock < 1 ? "out of stock" : addtoButton
							}
						/>
					</div>
				</div>
				<div className="flex gap-4 justify-between ">
					<div className="w-[100%]  flex justify-center items-center">
						<CustomButton
							onClick={() => moveToCheckout()}
							isLoading={isBuyLoading}
							isDisabled={data?.stock < 1}
							isButtonClass={true}
							buttonClass=""
							title={
								data?.stock < 1
									? "Unavailable"
									: strings.button.buyNow
							}
						/>
					</div>
					<div className="w-[48px] flex flex-row justify-center items-center">
						<CustomButton
							onClick={addtoWishlist}
							isButtonClass={true}
							buttonClass=""
							isLeftIcon={true}
							leftIcon={isInWishlist ? RedWishList : WishList}
							isTitle={false}
						/>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-2 gap-x-2  md:gap-x-4 xl:gap-x-0   gap-y-[12px] items-center py-[16px] ">
				{product?.productPage?.deliveryHighlight?.map(
					(item: any, index: any) => (
						<DeliveryItemHighlight key={index} item={item} />
					)
				)}
			</div>
		</div>
	);
}
