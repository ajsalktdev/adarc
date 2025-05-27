import React from 'react';

function StarGraph({ data }: { data: any }) {

    return (
        <div className='flex flex-col gap-3'>
           {data?.rating_distribution?.map((star: any, index: any) => (
                <div key={index} className='flex gap-3 items-center text-[#46474A]'>
                    <div className='text-[14px] rubik_medium min-w-[52px] underline'>{star.star} {star.star === 1 ? 'star' : 'stars'}</div>
                    <div className='min-w-[380px] bg-[#E2E4E5] h-[8px] flex'>
                        <div
                            className='bg-[#FDB615]  '
                            style={{ minWidth:`${(star?.count/data.total_reviews)*100}%`, width: `${(star?.count/data.total_reviews)*100}%` }}
                        ></div>

                    </div>
                    <div className='text-[14px] rubik_medium'>{(star?.count/data?.total_reviews)*100}% ({star?.count})</div>

                </div>
            ))} 
        </div>
    );
}
export default StarGraph