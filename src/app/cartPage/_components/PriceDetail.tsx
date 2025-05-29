import React from "react";
import AmountLine from "../component/AmountLine";
import Strings from "../../../utils/string";
import CustomButton from "@/components/buttons/CustomButton";
import UnderLinedButton from "@/components/buttons/UnderLinedButton";
import CustomCheckBox from "@/components/input/CustomCheckBox";
import GiftIcon from "../../../../public/assets/icons/giftIcon.svg";
import InfoIcon from "../../../../public/assets/icons/info.svg";
import Icon from "@/components/includes/Icon";
import { useRouter } from "next/navigation";

export default function PriceDetail({
	isLoading,
	onClick,
	isCart = false,
	cartAmountDetails,
	cartlist,
  setGift,
  isGift
}: any) {
	const router = useRouter();
	return (
		<div className="flex flex-col rounded-[6px]   border border-solid border-Platinum p-[16px]">
			{!isCart && (
				<div className="pb-[16px]">
					<div className="mb-[12px] ">
						<AmountLine
							lineThrough={false}
							title={Strings.cartPage.subTotal}
							amount={`AED ${cartAmountDetails?.sub_total}`}
							isCount={true}
							count={cartlist?.length ?? null}
							titleClass="rubik_medium text-[16px] leading-[20px] "
							amountClass=""
						/>
					</div>
					<div>
						<div className="mb-[8px]">
							<AmountLine
								title={Strings.cartPage.savings}
								amount={`AED ${cartAmountDetails?.discount_price}`}
								isCount={false}
								titleClass="rubik_medium text-[16px] leading-[20px] "
								amountClass=""
							/>
						</div>
						<div>
							<AmountLine
								isTitle={false}
								amount={`AED ${(
									cartAmountDetails?.sub_total -
									cartAmountDetails?.discount_price
								).toFixed(2)}`}
								isCount={false}
								titleClass="rubik_medium text-[16px] leading-[20px] "
								amountClass=""
							/>
						</div>
					</div>
				</div>
			)}
			{!isCart && (
				<div className="py-[16px] border-b border-t border-solid border-Platinum">
					<div className="mb-[12px]">
						<AmountLine
							title={Strings.cartPage.shipping}
							amount={"Free"}
							isCount={false}
							titleClass="rubik_medium text-[16px] leading-[20px] "
							amountClass=""
						/>
					</div>
					<AmountLine
						title={Strings.cartPage.tax}
						amount={`AED ${cartAmountDetails?.tax}`}
						isCount={false}
						titleClass="rubik_medium text-[16px] leading-[20px] "
						amountClass=""
					/>
				</div>
			)}
			<div className="py-[16px]">
				<div className="mb-[16px]">
					<AmountLine
						title={Strings.cartPage.total}
						amount={`AED ${cartAmountDetails?.total_price}`}
						isCount={false}
						titleClass="rubik_medium text-[16px] leading-[20px] "
						amountClass=""
					/>
				</div>
				<CustomButton
					isLoading={isLoading}
					onClick={onClick}
					isButtonClass={true}
					buttonClass="bg-button_yellow border-0"
					title={
						isCart ? Strings.button.continueCheckOut : "Order Now"
					}
				/>
				{/* <div className='mt-[8px] mb-[16px] flex flex-row items-center justify-center '>
          <p className='mr-[2px] rubik_regular leading-[14px] text-[12px] text-black'>{`${Strings.cartPage.bestExperience}, `}</p>
          <UnderLinedButton title={Strings.button.signIn} className={'text-[12px] leading-[14px] rubik_regular'} />
        </div> */}
				<div className="rounded-[4px] mt-4 px-[16px] py-[12px] flex flex-row items-center justify-between border-solid border border-input_border">
					<div className="flex flex-row items-center ">
						{/* <CustomCheckBox width='16px' height='16px' value={false} /> */}
						<input
							type="checkbox"
							id="isGift"
							className="w-[16px] h-[16px] accent-black cursor-pointer"
              checked={isGift}
              onChange={(e) => setGift(e.target.checked)}
						/>
						<label
							htmlFor="isGift"
							className="ml-[12px] flex flex-row items-center cursor-pointer">
							<span className="mr-[4px] rubik_regular leading-[18px] text-[14px] text-black">
								{Strings.cartPage.isGift}
							</span>
							<Icon
								src={InfoIcon}
								alt="info"
								width="16px"
								height="16px"
							/>
						</label>
					</div>
					<div>
						<Icon
							src={GiftIcon}
							alt={"gift"}
							width={"24px"}
							height={"24px"}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
