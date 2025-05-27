"use client"
import DropDownButton from '@/components/buttons/DropDownButton';
import React, { useState, useEffect } from 'react';
import ChekboxSection from './ChekboxSection';
import PriceFilter from './PriceFilter';

function LeftFilterSection({
    filterList,
    priceData,
    setPriceData,
    setListData,
}: {
    filterList: any;
    priceData: any;
    setPriceData: any;
    setListData: any;
}) {
    const [active, setActive] = useState<number[]>([]);

    useEffect(() => {
        if (filterList?.length) {
            const allIds = filterList.map((filter: any) => filter.id);
            setActive(allIds);
        }
    }, [filterList]);

    const handleClick = (id: number) => {
        setActive(prevActive => {
            if (prevActive.includes(id)) {
                return prevActive.filter(activeId => activeId !== id);
            } else {
                return [...prevActive, id];
            }
        });
    };

    return (
        <div className="w-[260px] max-lg:w-[240px] max-md:w-[210px] max-[710px]:w-[200px] overflow-x-hidden   block mr-4 p-2 max-w-[260px] max-sm:hidden">
            {filterList.length > 0 && filterList?.map((filter: any, index: any) => {
                const isPriceFilter = filter?.slug === "price";
                const Component = isPriceFilter ? PriceFilter : ChekboxSection;

                return (
                    <div
                        key={index}
                        className={`flex flex-col border-t-[0.6px] pt-[19px] pb-[12px] ${index !== 0 ? 'border-primary_border border-solid' : ''
                            }`}
                    >
                        <DropDownButton
                            titleClass="text-[16px] max-md:text-[14px] rubik_medium leading-[20px] text-[#1D252C]"
                            containerClass=""
                            title={filter?.title}
                            onclick={() => handleClick(filter?.id)}
                            isActive={active.includes(filter?.id)}
                            rotate_angle="rotate-180"
                        />

                        {active.includes(filter?.id) && (
                            <Component
                                setListData={setListData}
                                filter={filter}
                                priceData={priceData}
                                setPriceData={setPriceData}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default LeftFilterSection;
