import LargeCard from '@/components/includes/LargeCard'
import { useRouter } from 'next/navigation'
import React from 'react'

function ReviewCard({ key, order }: any) {
    console.log(order,"orderrr");
    
    const router = useRouter()
    return (
        <div
            key={key}
            className='flex flex-col border border-solid border-input_border rounded-[6px]  '>
            <div className='h-[48px] bg-alice_blue  rounded-[6px] items-center flex px-6 justify-between'>
                <div></div>
                <div>Last edited on</div>
            </div>
            <div className='px-6  flex items-center justify-center'>
                <LargeCard onClick={() => router.push(`${order.productTitle}`)} myReviews={true} product={order} />
            </div>
        </div>
    )
}

export default ReviewCard
