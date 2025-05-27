"use client"
import CustomButton from '@/components/buttons/CustomButton'
import React, { useState } from 'react'

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SelectionComponent({productTitle,data,title,}:any) {
  const initialActiveIndex = data?.variant_options?.findIndex(
    (option: any) => option.product_details?.is_selected
  );

  const [activeItem, setActive] = useState(initialActiveIndex >= 0 ? initialActiveIndex : 0);
  const router = useRouter()
  const param = useParams()




  return (
    <div className='w-[100%] mt-[19px]'>
        <div className='flex  flex-row'>
            <div className='mb-[8px]'>
              <h6 className='rubik_medium text-[14px] leading-[18px] text-shadow_gray'>{title} :</h6>
              </div>
            <div>
              <h6 className='rubik_regular text-[14px] leading-[18px] text-nickel_grey ml-[2px]'>{data?.variant_options?.[activeItem]?.value}</h6>
            </div>
        </div>
        <div className='flex max-sm:overflow-scroll sm:flex-wrap flex-row gap-[12px] no-scrollbar'>
          {data?.variant_options?.map((item:any,index:any)=>(
          <div key={index} className='min-w-[109px]'>
          <CustomButton unavailable={item?.product_details?.is_on_stock ? false : true} isDisabled={item?.product_details?.is_on_stock == true ? false : true} onClick={()=>{setActive(index);router.push(`/${item.product_details?.slug}`)}} active= {activeItem == index  ? true : false}  isSelect= {true}   title={item?.value} />
          </div>
          ))}

          
        </div>
    </div>
  )
}
