'use client'
import StarCard from '@/components/cards/StarCard'
import StarGraph from '@/components/cards/StarGraph'
import fetchApiData from '@/config/fetch-api-data';
import strings from '@/utils/string'
import React, { useEffect, useState } from 'react'


 function StarSection({productTitle}:any) {
    // console.log(reviewProduct,'rrreee')

    const reviewData = async () => {
      try {
        const url = `ratings/list-product-ratings/${productTitle}`;
        const response = await fetchApiData<any>(url);
        setRatingData(response?.data)
        // return response;
      } catch (err) {
        console.error('Error in reviewData:', err);
        return null;
      }
    };
    const [ratingData,setRatingData] = useState<any>([])


    useEffect(()=>{
        reviewData()
    },[])

    return ratingData?.average_rating > 0 && (
        <div className='w-[100%] block'>
            <h2 className='text-[24px] text-black/95 rubik_medium pb-6'>{strings.productPage.review}</h2>
            <div className='flex justify-between'>
                <div className=''>
                    <StarCard totalReview={ratingData?.total_reviews} reviewSection={true}  rating={ratingData?.average_rating}/>
                </div>
                <div>
                    <StarGraph data={ratingData} />
                </div>
            </div>
        </div>
    )
}

export default StarSection
