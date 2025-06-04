"use client";
import React, { useEffect, useState, useRef } from "react";

import fetchApiData from "@/config/fetch-api-data";
import AddressCard from "../../../my-account/manage-addresses/_components/AddressCard";
import AddressForm from "../../../my-account/manage-addresses/_components/AddressForm";
import Modal from "@/components/modal/Modal";
import Wrapper from "@/components/includes/Wrapper";
import useZustandStore from "@/store/useStore";
import { useParams, useRouter } from "next/navigation";
import PriceDetail from "../../../cartPage/_components/PriceDetail";
import { cn } from "@/utils/utils";
import postApiData from "@/config/post-api-data";
import LargeCard from "@/components/includes/LargeCard";
import { SiCashapp } from "react-icons/si";
import data from "../../../../../data.json";

import { TbTruckDelivery } from "react-icons/tb";
import { FaRegCreditCard, FaStore } from "react-icons/fa6";

interface ApiResponse<T> {
	status_code: number;
	data: T | null;
	message?: string;
}

function Page() {
	const params = useParams();
	const checkoutId = params?.checkoutId || "";
	console.log(checkoutId, "param");

	const formRef = useRef<HTMLFormElement>(null);

	const [isAddForm, setAddForm] = useState(false);
	const [addressData, setAddressData] = useState([]);
	console.log(addressData, "addressData");
	const defaultAddress: any = addressData.find(
		(item: any) => item.is_default === true
	);
	const defaultAddressPk = defaultAddress ? defaultAddress.pk : null;

	const [deliveryAddress, setDeliveryAddress] = useState<string | null>(null);
	const [billingAddress, setBillingAddress] = useState<string | null>(null);

	useEffect(() => {
		if (defaultAddressPk) {
			setDeliveryAddress(defaultAddressPk);
			setBillingAddress(defaultAddressPk);
		}
	}, [defaultAddressPk]);
	const [isEdit, setEdit] = useState(false);
	const [isRefresh, setRefresh] = useState(false);
	const [activePayment, setActivePayment] = useState(2);
	const [orderList, setOrderList] = useState([]);
	const [isLoading, setLoading] = useState(false);
	const [isGift, setGift] = useState(false);
	const [orderAmountDetails, setOrderAmountDetails] = useState({});

	const router = useRouter();

	const { cartlist, cartAmountDetails } = useZustandStore();

	const [selectedCountry, setSelectedCountry] = useState({
		name: "UAE",
		phone_code: "+971",
		phone_number_length: 10,
		web_code: "UAE",
		flag: "🇮🇳",
	});

	const [formData, setFormData] = useState<any>({
		full_name: "",
		email: "",
		mobileNumber: "",
		country: "",
		city: "",
		streetName: "",
		buildingName: "",
		apartmentName: "",
	});

	const [useDeliveryAddress, setUseDeliveryAddress] = useState<boolean>(true);

	const handleUseDeliveryAddressChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setUseDeliveryAddress(e.target.checked);
		if (e.target.checked) {
			setBillingAddress(deliveryAddress); // Automatically set billing address to delivery address
		}
	};

	useEffect(() => {
		if (useDeliveryAddress) {
			setBillingAddress(deliveryAddress);
		}
	}, [deliveryAddress, useDeliveryAddress]);

	const [tokenizationData, setTokenizationData] = useState<any>(null);

	const paymethods = [
		"Pay at Pickup",
		"Cash on delivery",
		"Pay with Debit/Credit card",
	];

	const handleAdd = () => {
		setAddForm(true);
	};

	const createOrder = async () => {
		setLoading(true);
		try {
			const response = await postApiData<ApiResponse<any>>(
				`orders/create-order/?order_id=${checkoutId}`,
				{
					shipping_address: deliveryAddress,
					billing_address: deliveryAddress,
					is_self_pickup: deliveryActive === 1,
					current_status: "completed",
					is_cash_on_delivery: activePayment !== 2 ? true : false,
					is_for_gift: isGift,
				},
				undefined,
				true,
				false,
				"PUT"
			);
			if (response?.status_code === 6000 && activePayment !== 0) {
				setTokenizationData(response.data);
				setTimeout(() => {
					if (formRef.current) {
						formRef?.current?.submit();
					}
					setLoading(false);
				}, 2000);
			} else {
				setLoading(false);
				console.error("Failed to process payment:", response?.message);
			}
		} catch (error) {
			setLoading(false);
			console.error("An error occurred while creating the order:", error);
		} finally {
			// setLoading(false);
		}
	};

	const orders = async () => {
		const response = await fetchApiData<ApiResponse<any>>(
			`orders/list-order-items/${checkoutId}`,
			{ requireAuth: true }
		);
		if (response?.status_code === 6000) {
			console.log(response?.data, "ordersss");
			setOrderList(response?.data?.order_items);
			setGift(response?.data?.is_for_gift);
			setOrderAmountDetails(response?.data?.order_amount_details);
		}
	};

	const getAddressData = async () => {
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
			}
		} catch (error) {
			console.error("Error fetching profile data:", error);
		}
	};

	useEffect(() => {
		orders();
		getAddressData();
	}, []);

	const [deliveryActive, setActiveDelivery] = useState(0);

	return (
		<div className="min-h-[80vh] ">
			<Wrapper>
				<div className="flex w-full sm:p-3 md:p-4 gap-8 justify-between">
					<div className="flex flex-col mc:w-[65%] gap-2">
						<div className="rubik_medium text-[16px] sm:text-[18px] md:text-[20px]">
							Select a delivery address
						</div>
						<div className="flex sm:flex-row flex-col  items-center gap-4 py-[4px] sm:py-[16px] md:py-[20px]">
							{data.deliveryMethod.map((item, index) => (
								<button
									key={index}
									className={cn(
										"flex items-center max-sm:w-full gap-3 bg-[#FFF9E94D] p-3 border-solid border border-[#E2E4E5] rounded-[4px]",
										deliveryActive == index &&
											"bg-button_yellow"
									)}
									onClick={() => setActiveDelivery(index)}>
									{index == 0 ? (
										<TbTruckDelivery />
									) : (
										<FaStore />
									)}
									<span className="rubik_medium text-[16px] leading-[20px] text-[black]">
										{item.option}
									</span>
								</button>
							))}
						</div>
						{deliveryActive === 0 ? (
							<>
								{!isAddForm && (
									<button
										className="flex justify-start text-[#0457C8] rubik_medium text-[14px]"
										onClick={handleAdd}>
										<h5>+ ADD A NEW ADDRESS</h5>
									</button>
								)}
								{addressData.length > 0 &&
									addressData.map((address, index) => (
										<AddressCard
											key={index}
											name="deliveryAddress"
											getAddressData={getAddressData}
											setSelectedCountry={
												setSelectedCountry
											}
											setFormData={setFormData}
											address={address}
											setAddForm={setAddForm}
											radioButton={true}
											deliveryAddress={deliveryAddress}
											setEdit={setEdit}
											setDeliveryAddress={
												setDeliveryAddress
											}
										/>
									))}
							</>
						) : (
							<div className="p-3 bg-[#FFF9E94D] border-button_yellow border-solid border  rounded-[4px]">
								<h5 className="text-[20px] rubik_medium">
									{" "}
									Store Address
								</h5>

								<div>
									<h6 className="rubik_medium text-[14px]">
										Adarc Computers
									</h6>
									<span className="rubik_regular text-[14px]">
										Hamdan Bin Mohammed St - Al Danah - Zone
										1 - Abu Dhabi - United Arab Emirates
									</span>
								</div>
							</div>
						)}

						{deliveryActive == 0 && (
							<div>
								<div className="rubik_medium text-[16px] sm:text-[18px] md:text-[20px] mt-4">
									Billing address
								</div>
								{!isAddForm && !useDeliveryAddress && (
									<button
										className="flex justify-start text-[#0457C8] rubik_medium text-[14px]"
										onClick={handleAdd}>
										<h5>+ ADD A NEW ADDRESS</h5>
									</button>
								)}

								<div className="flex items-center gap-2 md:my-3">
									<input
										type="checkbox"
										checked={useDeliveryAddress}
										onChange={
											handleUseDeliveryAddressChange
										}
									/>
									<label className="rubik_medium text-[14px]">
										Use delivery address as billing address
									</label>
								</div>

								{!useDeliveryAddress &&
									addressData.length > 0 &&
									addressData?.map((address, index) => (
										<AddressCard
											name="billingAddress"
											key={index}
											getAddressData={getAddressData}
											setSelectedCountry={
												setSelectedCountry
											}
											setFormData={setFormData}
											address={address}
											setAddForm={setAddForm}
											radioButton={true}
											deliveryAddress={billingAddress}
											setEdit={setEdit}
											setDeliveryAddress={
												setBillingAddress
											}
											defaultlabel={false}
											defaultbutton={false}
										/>
									))}
							</div>
						)}

						<div className=" mc:hidden w-full">
							<div className="py-[16px]">
								<h1 className="rubik_medium mb-2 text-[16px] leading-[22px] text-black">
									Select payment method
								</h1>
								<div className="p-4 bg-[#FFF9E94D] flex-col flex gap-3 border-solid border border-[#E2E4E5] rounded-[4px]">
									{paymethods
										.filter((_, index) => {
											if (deliveryActive === 0) {
												// Show index 1 and 2
												return index !== 0;
											} else {
												// Show index 0 and 2
												return index !== 1;
											}
										})
										.map((item, index) => {
											// Find the real index from paymethods for active comparison
											const realIndex =
												paymethods.indexOf(item);
											return (
												<button
													key={realIndex}
													onClick={() =>
														setActivePayment(
															realIndex
														)
													}
													className={cn(
														"flex w-full items-center gap-[10px] p-2 rounded-[4px] border-solid border border-[#E2E4E5]",
														activePayment ===
															realIndex
															? "bg-blue-300"
															: "bg-white"
													)}>
													<div>
														{index != 1 && (
															<FaRegCreditCard />
														)}
														{index == 1 && (
															<SiCashapp />
														)}
													</div>
													<h1 className="rubik_medium text-[16px] ">
														{item}
													</h1>
												</button>
											);
										})}
								</div>
							</div>

							<PriceDetail
								isGift={isGift}
								setGift={setGift}
								isLoading={isLoading}
								onClick={() => createOrder()}
								cartAmountDetails={orderAmountDetails}
								cartlist={orderList}
							/>
						</div>

						<div className="py-[8px]">
							<h1 className="rubik_medium text-[20px] leading-[24px] text-black">
								Review items
							</h1>
						</div>
						<div className="mb-3  rounded-[4px]">
							{orderList?.map((item: any, index: any) => (
								<LargeCard
									ischeckOut={true}
									isRefresh={isRefresh}
									setRefresh={setRefresh}
									onClick={() =>
										router.push(
											`/product/${item?.product?.slug}`
										)
									}
									key={index}
									product={item}
								/>
							))}
						</div>
					</div>
					<div className="hidden mc:block mc:w-[26.6%] mc:min-w-[360px] min sticky z-30 top-[185px] mt-[26px]">
						<div className="py-[16px]">
							<h1 className="rubik_medium mb-2 text-[16px] leading-[22px] text-black">
								Select payment method
							</h1>
							<div className="p-4 bg-[#FFF9E94D] flex-col flex gap-3 border-solid border border-[#E2E4E5] rounded-[4px]">
								{paymethods
									.filter((_, index) => {
										if (deliveryActive === 0) {
											// Show index 1 and 2
											return index !== 0;
										} else {
											// Show index 0 and 2
											return index !== 1;
										}
									})
									.map((item, index) => {
										// Find the real index from paymethods for active comparison
										const realIndex =
											paymethods.indexOf(item);
										return (
											<button
												key={realIndex}
												onClick={() =>
													setActivePayment(realIndex)
												}
												className={cn(
													"flex w-full items-center gap-[10px] p-2 rounded-[4px] border-solid border border-[#E2E4E5]",
													activePayment === realIndex
														? "bg-blue-300"
														: "bg-white"
												)}>
												<div>
													{index != 1 && (
														<FaRegCreditCard />
													)}
													{index == 1 && (
														<SiCashapp />
													)}
												</div>
												<h1 className="rubik_medium text-[16px]">
													{item}
												</h1>
											</button>
										);
									})}
							</div>
						</div>

						<PriceDetail
							isGift={isGift}
							setGift={setGift}
							isLoading={isLoading}
							onClick={() => createOrder()}
							cartAmountDetails={orderAmountDetails}
							cartlist={orderList}
						/>
					</div>
				</div>
			</Wrapper>

			{tokenizationData && (
				<>
					<form
						ref={formRef}
						method="post"
						action="https://sbcheckout.payfort.com/FortAPI/paymentPage"
						id="form1"
						name="form1">
						<input hidden name="command" value="PURCHASE" />
						<input
							hidden
							name="signature"
							value={tokenizationData.signature}
						/>
						<input
							hidden
							name="merchant_reference"
							value={tokenizationData.merchant_reference}
						/>
						<input
							hidden
							name="amount"
							value={tokenizationData.amount}
						/>
						<input
							hidden
							name="access_code"
							value={tokenizationData.access_code}
						/>
						<input
							hidden
							name="merchant_identifier"
							value={tokenizationData.merchant_identifier}
						/>
						<input
							hidden
							name="currency"
							value={tokenizationData.currency}
						/>
						<input
							hidden
							name="language"
							value={tokenizationData.language}
						/>
						<input
							hidden
							name="customer_email"
							value={tokenizationData?.customer_email}
						/>
						<input
							hidden
							name="return_url"
							value={tokenizationData.return_url}
						/>
						<button
							type="submit"
							style={{
								padding: "10px 20px",
								backgroundColor: "#4CAF50",
								color: "white",
								border: "none",
								cursor: "pointer",
								fontSize: "16px",
								marginTop: "20px",
							}}>
							Submit Payment
						</button>
					</form>
				</>
			)}

			<Modal
				isOpen={isAddForm}
				onClose={() => setAddForm(false)}
				className="w-[680px]">
				<div className="border rounded-md bg-white border-primary_border border-solid">
					<div className="bg-gray-100 w-full rounded-t-md p-3">
						<h3 className="font-medium text-lg mb-2">
							Add a New Address
						</h3>
					</div>
					<div className="p-4">
						<AddressForm
							isEdit={isEdit}
							setEdit={setEdit}
							setAddForm={setAddForm}
							selectedCountry={selectedCountry}
							formData={formData}
							setSelectedCountry={setSelectedCountry}
							setFormData={setFormData}
							getAddressData={getAddressData}
						/>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Page;
