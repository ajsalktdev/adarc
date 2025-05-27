import ProductCard from '@/components/includes/ProductCard'
import React from 'react'
import TopTab from './TopTab';
import { useRouter, useSearchParams } from 'next/navigation';
import EmptySection from '@/components/emptyContainer/EmptySection';
import PaginationComponen from './PaginationComponent';
import PaginationComponent from './PaginationComponent';

function RightcardSection({
    filteredData,
    filterList,
    setSortBy,
    setListData,
    priceData,
    setPriceData,
    sortBy,
    paginationData,
}: {
    filteredData: any,
    filterList: any,
    setListData: any,
    priceData: any,
    setPriceData: any,
    setSortBy: any
    sortBy: any,
    paginationData: any

}) {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q');
    const router = useRouter()
    return (
        <div className='w-full block '>
            {/* <TopTab
                filterList={filterList}
                setListData={setListData}
                priceData={priceData}
                setPriceData={setPriceData}
                setSortBy={setSortBy}
                sortBy={sortBy}
            /> */}
            <div className='block'>
                <h2 className='rubik_medium text-xl mb-3'>
                    {searchQuery ? `Search results for: "${searchQuery}"` : ""}
                </h2>

                {
                    filteredData?.length > 0 ? <div className='flex flex-wrap gap-[1%]'>
                        {filteredData?.map((data: any, index: any) => (
                            <ProductCard key={index} data={data} className=' w-[24%] max-lg:w-[32%] mb-2 max-md:w-[49%] max-sm:w-[32%] max-sl:w-[49%] cursor-pointer' onClick={() => {
                                router.push(`/product/${data?.slug}`);
                            }}
                            />
                        ))}

                    </div> :
                        <EmptySection title={'No Data Found!'} button={false} />
                }


            </div>
            <div className='w-full flex justify-center items-center py-4'>
                <PaginationComponent paginationData={paginationData} />
            </div>

        </div>
    )
}

export default RightcardSection
