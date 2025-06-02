"use client";
import React, { useEffect, useState } from "react";
import Strings from "../../utils/string";
import product from "../../../data.json";
import LargeCard from "@/components/includes/LargeCard";
import Wrapper from "@/components/includes/Wrapper";
import CustomButton from "@/components/buttons/CustomButton";
import { useRouter } from "next/navigation";
import AmountLine from "./component/AmountLine";
import UnderLinedButton from "@/components/buttons/UnderLinedButton";
import CustomCheckBox from "@/components/input/CustomCheckBox";
import Icon from "@/components/includes/Icon";
import GiftIcon from "../../../public/assets/icons/giftIcon.svg";
import InfoIcon from "../../../public/assets/icons/info.svg";
import TitleComponent from "../product/[productTitle]/components/TitleComponent";
import fetchApiData from "@/config/fetch-api-data";
import postApiData from "@/config/post-api-data";
import { div } from "framer-motion/client";
import EmptySection from "@/components/emptyContainer/EmptySection";
import useZustandStore from "@/store/useStore";
import PriceDetail from "./_components/PriceDetail";
import PageLoader from "@/components/includes/PageLoader";
import AddressSection from "./_components/AddressSection";
import Modal from "@/components/modal/Modal";

interface ApiResponse<T> {
	status_code: number;
	data: T | null;
	message?: string;
}
export default function Page() {
	const {
		cartlist,
		setCartlist,
		wishlist,
		cartAmountDetails,
		accessToken,
		setWishlist,
		setCartAmountDetails,
	} = useZustandStore();
	const [isRefresh, setRefresh] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isGift, setGift] = useState(false);
	const [isSelectedItems, setSelectedItems] = useState([]);
	const [pageLoading, setPageLoading] = useState(true);
	const [addressSection, setAddressSection] = useState(false);
	const [totalAmount, setTotalAmount] = useState(0);
	const [addressData, setAddressData] = useState<any[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<any>(null);

	// console.log(cartlist,'cartttt')
	//   const totalAmountCalc = () => {
	//     let total = 0
	//     isSelectedItems?.map((item: any) => {
	//       total += item?.product?.price_details?.current_price * item?.quantity
	//     })
	//     setTotalAmount(total)

	//   }

	//   useEffect(() => {
	//     totalAmountCalc()

	//   },[isSelectedItems,cartlist])
	// const getList = async (loader: string) => {
	//   loader == "loader" && setPageLoading(true);

	//   const response = await fetchApiData<ApiResponse<any>>(
	//     "carts/list-cart-items/",
	//     { requireAuth: false, checkAccessToken: true }
	//   );
	//   if (response?.status_code == 6000) {
	//     console.log('vghkjv',response?.data)
	//     setCartlist(response?.data?.cart_items);
	//     setCartAmountDetails(response?.data?.cart_amount_details);
	//     setTimeout(() => {
	//       setPageLoading(false);
	//     }, 2000);
	//   } else {
	//     console.log(response?.data?.message, "message====");
	//     setPageLoading(false);
	//   }
	//   console.log(response, "cartResponse");
	// };

  const getList = async (loader: string) => {
    if (loader === "loader") setPageLoading(true);

    const response = await fetchApiData<ApiResponse<any>>(
      "carts/list-cart-items/",
      { requireAuth: false, checkAccessToken: true }
    );
    if (response?.status_code == 6000) {
      setCartlist(response?.data?.cart_items);
      setCartAmountDetails(response?.data?.cart_amount_details);
      setTimeout(() => {
              setPageLoading(false);
            }, 2000);

    }
    else {
          console.log(response?.data?.message, "message====");
          setPageLoading(false);
        }
    console.log(response, "cartResponse");
  };
	// const getList = async (loader: string, accessToken?: string) => {
	// 	if (loader === "loader") setPageLoading(true);

	// 	try {
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_URL}carts/list-cart-items/`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 					...(accessToken
	// 						? { Authorization: `Bearer ${accessToken}` }
	// 						: {}),
	// 				},
	// 			}
	// 		);

  const removeItem = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}carts/remove-cart-item/${id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({}),
      });
  
      const data = await response.json();
  
      if (data?.status_code === 6000) {
        console.log("Item removed successfully");
        await getList("noloader"); // pass token if needed
      } else {
        console.error("Failed to remove item:", data?.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

	

	// 		const data = await response.json();

	// 		if (data?.status_code === 6000) {
	// 			console.log("cart items:", data?.data);
	// 			setCartlist(data?.data?.cart_items);
	// 			setCartAmountDetails(data?.data?.cart_amount_details);
	// 			setTimeout(() => setPageLoading(false), 2000);
	// 		} else {
	// 			console.log(data?.message, "message====");
	// 			setPageLoading(false);
	// 		}

	// 		console.log(data, "cartResponse");
	// 	} catch (error) {
	// 		console.error("Error fetching cart list:", error);
	// 		setPageLoading(false);
	// 	}
	// };

	// const removeItem = async (id: any) => {
	// 	const response = await postApiData<ApiResponse<any>>(
	// 		`carts/remove-cart-item/${id}/`,
	// 		{},
	// 		undefined,
	// 		true
	// 	);
	// 	if (response.status_code == 6000) {
	// 		console.log("hello");
	// 		await getList("noloader");
	// 	}
	// };




	useEffect(() => {
		getList("loader");
	}, [isRefresh]);

	const router = useRouter();
	const moveItem = async (slug: any, pk: any) => {
		if (accessToken) {
			const itemInWishlist = wishlist.find(
				(item: any) => item.product.slug === slug
			);

			if (itemInWishlist) {
				console.log(`Item found in wishlist, removing: ${slug}`);
				await removeItem(pk);
			} else {
				console.log(`Item not found in wishlist, adding: ${slug}`);
				await addtoWishlist(slug, pk);
			}
		} else {
			console.log("User not logged in, redirecting to login");
			router.push("/login");
		}
	};
	const getWishList = async (slug: any, pk: any) => {
		const response = await fetchApiData<ApiResponse<any>>(
			"wishlists/list-wishlist-items/",
			{ requireAuth: true }
		);
		if (response?.status_code == 6000) {
			// setWishist(response?.data?.cart_items)
			setWishlist(response?.data?.cart_items);
			await removeItem(pk);
		}
		console.log(response, "cartResponse");
	};
	const moveToCheckout = async () => {
		console.log("nadeer");
		setLoading(true);
		const selectedItems = cartlist.map((item: any) => item.pk);
		console.log(selectedItems, "itemssss");

		try {
			if(accessToken){
				const response = await postApiData<ApiResponse<any>>(
					`orders/create-order/`,
					{
						selected_items: selectedItems,
						is_for_gift:isGift
					},
					undefined,
					true
				);
	
				if (response?.status_code === 6000) {
					const id = response?.data?.order_id;
					console.log("Item added checkout!", id);
	
					router.push(`/checkout/${id}`);
				} else {
					console.error("Failed to add item to cart:", response?.message);
				}

			}
			else{
				router.push('/login')
			}
			
		} catch (error) {
			console.error("An error occurred while adding to cart:", error);
		} finally {
			setLoading(false);
		}
	};

	const addtoWishlist = async (slug: any, pk: any) => {
		try {
			const response = await postApiData<ApiResponse<any>>(
				`wishlists/add-wishlist-item/${slug}/`,
				{},
				undefined,
				true
			);
			if (response?.status_code === 6000) {
				await getWishList(slug, pk);
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

	const getAddressData = async () => {
		setAddressSection(false);
		try {
			const responseData = await fetchApiData<any>(
				"users/list-address/",
				{
					requireAuth: true,
				}
			);
			const { status_code, data } = responseData;
			if (status_code === 6000) {
				setAddressData(data);
				const defaultAddress = data.find(
					(item: any) => item.is_default === true
				);
				if (defaultAddress) {
					setSelectedAddress(defaultAddress);
				}
			}
		} catch (error) {
			console.error("Error fetching profile data:", error);
		}
	};

	useEffect(() => {
	  getAddressData();
	}, []);
	

	return (
		<div className="w-full min-h-[100vh]">
			<Modal
				isOpen={addressSection}
				onClose={() => setAddressSection(false)}
				className="w-[680px]"
				noCloseButton={false}>
				<AddressSection
					addressData={addressData}
					onClose={() => setAddressSection(false)}
					getAddressData={getAddressData}
				/>
			</Modal>
			<Wrapper>
				{
					// pageLoading ? (

					//   <div className='h-[70vh] w-full flex items-center justify-center'>
					//   <PageLoader />

					//   </div>

					// ) :
					cartlist?.length > 0 ? (
						<div className="flex flex-col max-mc:items-center mc:flex-row mc:justify-between mc:relative w-full gap-[16px] min-h-[calc(100vh-200px)]">
							<div className="md:w-[80%] mc:w-[65.55%]">
								<div className="h-auto mb-5 w-full border border-solid border-Platinum px-[12px] sm:px-[24px] py-[16px] rounded-[4px]">
									{selectedAddress?.city?.region
										?.delivery_time ? (
										<TitleComponent
											title={`Free shipping Arrives at ${selectedAddress?.city?.region?.delivery_time}`}
											titleClass="text-[20px] font-semibold mb-3"
										/>
									) : (
										"No delevery date"
									)}
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-[2px]">
											<TitleComponent title="Delivery to " />
											<TitleComponent
												titleClass="underline"
												title={(() => {
													const addressParts = [
														selectedAddress?.apartment_address,
														selectedAddress?.building_name,
														selectedAddress?.street_address,
														selectedAddress?.city
															?.name,
														selectedAddress?.country
															?.name,
													].filter(Boolean); // Remove empty/null/undefined values

													return addressParts.length >
														0
														? addressParts.join(
																", "
														  )
														: "No address selected";
												})()}
											/>
										</div>
										<UnderLinedButton
											title="Change Address"
											onClick={() => {
												setAddressSection(true);
											}}
										/>
									</div>
									{cartlist?.map((item: any, index: any) => (
										<LargeCard
											key={index}
											isCart={true}
											moveItem={() =>
												moveItem(
													item?.product?.slug,
													item?.pk
												)
											}
											isRefresh={isRefresh}
											setRefresh={setRefresh}
											getList={getList}
											removeItem={() =>
												removeItem(item?.pk)
											}
											onClick={() =>
												router.push(
													`/product/${item?.product?.slug}`
												)
											}
											product={item}
										/>
									))}
								</div>
							</div>
							<div className="w-full md:w-[80%] mb-4 mc:mb-0 mc:w-[26.6%] mc:min-w-[320px] mc:sticky mc:top-[175px] mc:self-start">
								<PriceDetail
									setGift={setGift}
									isGift={isGift}
									isLoading={isLoading}
									onClick={() => moveToCheckout()}
									totalAmount={totalAmount}
									isCart={true}
									cartAmountDetails={cartAmountDetails}
									cartlist={cartlist}
								/>
							</div>
						</div>
					) : (
						<EmptySection
							title="Your Cart is Empty"
							message="Add items to your cart to make your purchase."
						/>
					)
				}
			</Wrapper>
		</div>
	);
}
