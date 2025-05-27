"use client"
import DropDownButton from '@/components/buttons/DropDownButton';
import React, { useState } from 'react';
import ChekboxSection from './MobileCheckbox';
import RightArrow from '../../../../public/assets/icons/rigth_arrow.svg'
import Image from 'next/image';
import MobilePriceFilter from './MobilePriceFilter';

function BottomMobileFilter({
    filterList,
    priceData,
    setPriceData,
    setListData,
    priceFilterRef,
}: {
    filterList: any;
    priceData: any;
    setPriceData: any;
    setListData: any;
    priceFilterRef:any;
}) {
    const [active, setActive] = useState<number[]>([]);
    const handleClick = (id: number) => {
        setActive([id]);
    };

    return (
        <div className="w-full ">
            {filterList?.map((filter: any, index: any) => {
                const isPriceFilter = filter?.slug === "price"; // Check if the slug is "price"
                const Component = isPriceFilter ? MobilePriceFilter : ChekboxSection;

                return (
                    <div
                        key={index}
                        className={`flex px-3 flex-col   pb-[12px] ${index !== 0 ? '' : ''
                            }`}
                    >
                        {!active?.length > 0 &&
                            <div className='flex justify-between w-full ' onClick={() => handleClick(filter.id)}><div>{filter?.title?.charAt(0).toUpperCase() + filter?.title?.slice(1)}</div>

                                <Image src={RightArrow} alt="right_arrow" className='h-[16px] w-[16px]'/>
                            </div>
                        }
                        {/* 
                        <DropDownButton
                            titleClass="text-[16px]  rubik_medium leading-[20px] text-[#1D252C]"
                            containerClass=""
                            title={filter?.title}
                            onclick={() => handleClick(filter.id)}
                            isActive={active.includes(filter.id)}
                            rotate_angle="rotate-180"
                        /> */}
                        {active.includes(filter.id) && (
                            <Component
                                setListData={setListData}
                                filter={filter}
                                priceData={priceData}
                                setPriceData={setPriceData}
                                priceFilterRef={priceFilterRef}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default BottomMobileFilter;
