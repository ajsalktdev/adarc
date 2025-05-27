'use client'
import CustomButton from '@/components/buttons/CustomButton';
import StarCard from '@/components/cards/StarCard';
import { getIcon } from '@/components/image/Icon';
import fetchApiData from '@/config/fetch-api-data';
import strings from '@/utils/string';
import React, { useState } from 'react';

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
    pagination_data: T | null;
}

function ReviewSection({ productTitle, data, pagination }: any) {
    const [reviews, setReviews] = useState(data.data || []);
    const [paginationData, setPaginationData] = useState(pagination);
    const [isLoading, setIsLoading] = useState(false);
    const getStar = async (param: any) => {
        try {
            const url = `ratings/list-product-reviews/${productTitle}/?per_page=${param}`;
            const response = await fetchApiData<ApiResponse<any>>(url);
            return response;
        } catch (err) {
            console.error('Error in reviewData:', err);
            return null;
        }
        finally {
            setIsLoading(false)
        }
    };



    const viewMore = async () => {

        setIsLoading(true);
        const param = paginationData?.has_next_page ? paginationData?.total_items : 2

        try {
            const response = await getStar(param);
            if (response) {
                if (response?.data?.data)
                {setReviews(response.data.data);}
                if(response?.data){
                    setPaginationData(response?.pagination_data);
                } 
            }
           
        } catch (error) {
            console.error('Error in viewMore:', error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
        <div></div>
            <div className='my-[24px]'>
                <h2 className='text-TEXT_BLACK text-[18px] rubik_medium'>
                    Showing {reviews.length} of {paginationData?.total_items} reviews
                </h2>
                {reviews.map((review: any, index: number) => (
                    <div
                        key={index}
                        className='w-[100%] mt-4 flex justify-between border-b-[1px] border-solid border-primary_border pb-2'
                    >
                        <div className='w-[25%] flex flex-col'>
                            <div className='rubik_regular text-[12px] text-[#000] leading-[14px] mb-2'>{review?.date}</div>
                            <div className='flex items-center'>
                                {getIcon({ icon: 'profile_icon', className: 'w-[20px] h-[20px]' })}
                                <span className='ml-2 rubik_regular text-[14px] text-[#110000]'>
                                    {review?.profile?.first_name} {review?.profile?.last_name}
                                </span>
                            </div>
                            <div className='flex flex-col mt-2'>
                                <span className='text-[12px] leading-[14px] rubik_regular text-[#6D7277]'>
                                    {review?.itemDetails}
                                </span>
                            </div>
                        </div>
                        <div className='flex-1 flex flex-col gap-2'>
                            <StarCard rating={review?.rating} />
                            <div className='rubik_medium text-[16px] leading-[20px] text-[#1D252C]'>{review?.title}</div>
                            <div className='mt-2 rubik_regular text-[14px] text-[#2E2F32] leading-[14px]'>{review?.review}</div>
                        </div>
                    </div>
                ))}

                <div className='flex items-center justify-center mt-6'>
                   <div className='w-[150px] '>
                   {(paginationData?.total_items >= 3) &&   
   ( <CustomButton
        onClick={viewMore}
        istTitleClass={true}
        titleClass="rubik_light"
        title={paginationData?.has_next_page === true ? strings.button.viewMore : strings.button.showLess}
    />)
}
                    </div>
                </div>

            </div>
        </>
    );
}

export default ReviewSection;