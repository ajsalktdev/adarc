import React from 'react'
import { getIcon } from '../image/Icon'
import fetchApiData from '@/config/fetch-api-data';



 function StarCard({ rating,totalReview,reviewSection = false }: any) {

    const getStarFill = (index: number, rating: number) => {
        const fullStars = Math.floor(rating);
        const fraction = rating - fullStars;

        if (index < fullStars) return '100%';
        if (index === fullStars) return `${fraction * 100}%`;
        return '0%';
    };

    return (
        <div className='flex flex-col gap-[12px]'>
            {reviewSection && rating && <h2 className='rubik_medium text-[40px] leading-10 text-TEXT_BLACK'>{rating} out of 5</h2> }
            <div className='flex items-normal items-center'>
                <div className='flex items-baseline mr-[4px]'>
                    {
                        [...Array(5)].map((_, index) => (
                            <div key={index} className='star'>
                                <div className='w-[50%] h-[100%] bg-star_yellow'
                                    style={{
                                        width: getStarFill(index, rating || 0),
                                    }}
                                ></div>
                            </div>

                        ))
                    }
                </div>
                {reviewSection?
                <span className='rubik_light text-[10px] text-[#6D7277] '>({totalReview} Reviews)</span> 
                :<span className='rubik_light text-[10px] text-[#6D7277] '>{rating}</span> 
                }
            </div>

        </div>
    )
}

export default StarCard
