"use client"
import HighlightBox from '@/app/signup/_components/HighlightBox'
import Wrapper from '@/components/includes/Wrapper'
import cashondelivery from "../../../../../public/assets/icons/cash-on-delivery.svg"
import topBrand from "../../../../../public/assets/icons/top-brand.svg"
import transaction from "../../../../../public/assets/icons/transaction.svg"
import freeDelivery from "../../../../../public/assets/icons/free-delivery.svg"
import success_payment from "../../../../../public/assets/images/success_payment.svg"


import React from 'react'
import Image from 'next/image'
import CustomButton from '@/components/buttons/CustomButton'
import RedirectButtons from '../../_components/RedirectButtons'

const featureData = [
  { icon: cashondelivery, label: "15 days Returnable" },
  { icon: cashondelivery, label: "Cash on Delivery" },
  { icon: freeDelivery, label: "Free Delivery" },
  { icon: topBrand, label: "Top brand" },
  { icon: transaction, label: "Secure Transaction" },
];

function Page({ params }: any) {
  return (
    <Wrapper className='flex items-baseline justify-center w-full'>
    <div className='w-full flex flex-col items-center'>
      <div className='w-full flex flex-col items-center gap-2 mb-4 border-b border-solid border-[#E2E4E5] pb-3'>

         <div className='text-[#2A8703] rubik_medium text-[28px] max-sm:text-[22px]  max-lg:text-[24px] text-center'>
            Your payment is confirmed. Thank you for your order {params?.id}
          </div>
          <div className='text-[16px] max-md:text-[14px] text-center'>An email confirmation has been send to sample@gmail.com</div>
        </div>

        {/* <div className="flex flex-wrap gap-6 border-b border-solid border-[#E2E4E5] pb-3">
          {featureData.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Image src={feature.icon} alt={feature.label} className="w-6 h-6" />
              <p>{feature.label}</p>
            </div>
          ))}
        </div> */}
        <Image src={success_payment} alt='failed payment' className='w-[25%] max-xl:w-[35%] max-lg:w-[37%] max-sm:w-[42%] max-[480px]:w-[60%]' />
        <div className='border-t w-full flex
        border-solid border-[#E2E4E5] justify-center'>
          <RedirectButtons />
        </div>
      </div>


    </Wrapper>
  );
}

export default Page;
