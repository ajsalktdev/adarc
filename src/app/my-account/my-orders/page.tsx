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


export default function Page() {

    const router = useRouter()
    const [search, setSearch] = useState('')
    const [orderData, setOrderData] = useState<any>({})
    const [tempSearch, setTempSearch] = useState('')

    const getData = async () => {
        try {
            const responseData = await fetchApiData<any>(`orders/my-orders?q=${search}`, {
                requireAuth: true,
            });
            const { status_code, data } = responseData;
            if (status_code === 6000) {
                setOrderData(data)
            }
            else if (status_code === 6001) {
                setOrderData("")
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        getData();
    }, [search]);

    const [activeItem, setActiveItem] = useState(10000)
    return (
        <div className='px-6 bg-white relative w-full max-sm:px-3'>
            <div className='w-full sticky top-0 z-10 bg-[white] '>
                <div className='w-[30%] pb-5'>
                    <CustomTextInput
                        icon={MainSearch}
                        imageAlt={'mainSearch'}
                        setData={setTempSearch}
                        isIcon={true}
                        value={tempSearch}
                        className={'mb-0'}
                        inputStyle='bg-[white]'
                        onIconClick={() => {
                            setSearch(tempSearch)
                        }}
                        placeholder={strings.placeHolder.search} />

                </div>
            </div>
            <div className='flex flex-col gap-[16px] mb-4'>
                {orderData?.length > 0 && orderData?.map((item: any, index: any) =>
                    <div key={index}
                        onClick={() => { if (activeItem != index) { setActiveItem(index) } else { setActiveItem(100000) } }}
                        className='flex flex-col border border-solid border-input_border rounded-[6px]  '>
                        <div className='h-[48px] bg-alice_blue items-center flex px-6 justify-center'>
                            <DropDownButton buttonStyle='bg-alice_blue' isActive={activeItem == index ? true : false} rotate_angle={'-rotate-180'} title={item?.current_status} />
                        </div>
                        <div className='px-6 max-[480px]:px-3  flex items-center justify-center '>
                            <LargeCard onClick={() => router.push(`${item.productTitle}`)} myOrder={true} key={index} product={item} />
                        </div>
                    </div>

                )}
            </div>
        </div>

    )
}
