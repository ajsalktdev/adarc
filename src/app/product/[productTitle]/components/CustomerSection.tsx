import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import ReviewSection from './ReviewSection'
import fetchApiData from '@/config/fetch-api-data';

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
    pagination_data: T | null;
  }
  
  const getStar = async (productTitle: string) => {
    try {
        const url = `ratings/list-product-reviews/${productTitle}/?per_page=2`;
        const response = await fetchApiData<ApiResponse<any>>(url);
        return response;
    } catch (err) {
        console.error('Error in reviewData:', err);
        return null;
    }
  };

async function CustomerSection({ productTitle }: { productTitle: any }) {

    const apigetStar = await getStar(productTitle);
    const data = apigetStar?.status_code === 6000 ? apigetStar?.data : null;
    const pagination = apigetStar?.status_code === 6000 ? apigetStar.pagination_data : null;
  
    return (
        <div className='block'>
            {/* <div className='flex justify-between items-center h-[40px] mt-[20px] mb-[16px] '>
                <div className=''>
                    <h2 className='text-[18px]  text-TEXT_BLACK rubik_medium'>Customer images</h2>
                </div>
                <Link href={''} className='items-center justify-center flex'>
                    <span className='text-[13px] font-normal rubik_regular'>View all</span>
                </Link>
            </div> */}
            <div className='flex flex-row overflow-hidden no-scrollbar justify-between gap-[1.2%] '>
                {data?.productPage?.images.map((item: any, index: any) => (
                    <div key={index}
                        className='flex justify-center items-center  min-w-[10%] h-auto  overflow-hidden  rounded-[4px] border border-solid border-[#D2D2D2]'
                    >
                        <Image className='block object-fill' src={item} alt='productImages' width={100} height={100} />
                    </div>
                ))}
            </div>
           {data != null && data != undefined && <ReviewSection productTitle={productTitle} data={data} pagination={pagination}  />}

        </div>
    )
}

export default CustomerSection
