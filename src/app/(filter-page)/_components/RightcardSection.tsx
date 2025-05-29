import ProductCard from '@/components/includes/ProductCard'
import React from 'react'
import TopTab from './TopTab';
import { useRouter, useSearchParams } from 'next/navigation';
import EmptySection from '@/components/emptyContainer/EmptySection';
import PaginationComponen from './PaginationComponent';
import PaginationComponent from './PaginationComponent';

// Skeleton loader component for product cards
const ProductCardSkeleton = () => (
    <div className="w-[24%] max-lg:w-[32%] mb-2 max-md:w-[49.3%] max-sm:w-[32%] max-sl:w-[49.3%] bg-white rounded-lg shadow-sm p-4 animate-pulse">
        <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
    </div>
);

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

    // Show skeleton loader while data is loading
    if (filteredData === null || filteredData === undefined) {
        return (
            <div className='w-full block'>
                <div className='block'>
                    <h2 className='rubik_medium text-xl mb-3'>
                        {searchQuery ? `Search results for: "${searchQuery}"` : ""}
                    </h2>
                    <div className='flex flex-wrap gap-[1%]'>
                        {[...Array(8)].map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

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
                    filteredData?.length > 0 ?
                        <div className='flex flex-wrap gap-[1%]'>
                            {filteredData?.map((data: any, index: any) => (
                                <ProductCard key={index} data={data} className=' w-[24%] max-lg:w-[32%] mb-2 max-md:w-[49.3%] max-sm:w-[32%] max-sl:w-[49.3%] cursor-pointer' onClick={() => {
                                    router.push(`/product/${data?.slug}`);
                                }}
                                />
                            ))}
                        </div> :
                        (filteredData?.length === 0) ? (

                            <div className='w-full py-7 '>
                                <EmptySection title={'No Data Found!'} button={false} />
                            </div>
                        )
                            : ""
                }


            </div>
            <div className='w-full flex justify-center items-center py-4'>
                <PaginationComponent paginationData={paginationData?.length > 0 ? paginationData : []} />
            </div>

        </div>
    )
}

export default RightcardSection
