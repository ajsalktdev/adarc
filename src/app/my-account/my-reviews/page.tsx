'use client'
import CustomTextInput from '@/components/input/CustomTextInput'
import React, { useEffect, useState } from 'react'
import LargeCard from '@/components/includes/LargeCard'
import { useRouter } from 'next/navigation'
import product from '../../../../data.json'
import MainSearch from '../../../../public/assets/icons/mainSearch.svg';
import strings from '@/utils/string'
import DropDownButton from '@/components/buttons/DropDownButton'
import fetchApiData from '@/config/fetch-api-data'
import ReviewCard from './_components/ReviewCard'
import EmptySection from '@/components/emptyContainer/EmptySection'


export default function Page() {
    const [search, setSearch] = useState('')
    const [orderData, setOrderData] = useState<any>()
    const getData = async () => {
        try {
            const responseData = await fetchApiData<any>("ratings/list-my-reviews/", {
                requireAuth: true,
            });
            const { status_code, data } = responseData;
            if (status_code === 6000) {
                setOrderData(data)
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    console.log(orderData, "orderDataorderData");


    const [activeItem, setActiveItem] = useState(10000)
    return (
        <div className='px-6 bg-white relative w-full max-[850px]:px-0 '>
            <div className='w-full  bg-[white] '>
                <div className='w-[30%] max-mdx:w-[60%] max-sk:w-[100%] m pb-5'>
                    <CustomTextInput setData={setSearch} value={search}
                        icon={MainSearch}
                        imageAlt={'mainSearch'}
                        isIcon={true}
                        className={'mb-0'}
                        inputStyle='bg-[white]'
                        placeholder={strings.placeHolder.search} />

                </div>
            </div>
            <div className='flex flex-col gap-[16px]'>
                {orderData?.data?.length > 0 ?
                    orderData.data.map((item: any, index: any) => (
                        <ReviewCard key={index} order={item} />
                    )) :
                    (<div className='w-full py-7 '>
                        <EmptySection title={'No Address Found!'}  />
                    </div>)
                }
            </div>
        </div>

    )
}
