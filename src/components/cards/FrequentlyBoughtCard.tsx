import Image from 'next/image'
import React from 'react'

function FrequentlyBoughtCard({ item }: any) {

  return (
    <div className='min-w-[230px] p-2 h-[140px] flex border border-solid border-[#C5CBD5]'>
      <div className='min-w-[45px] max-w-[45px] overflow-hidden'><Image src={item.image} alt="" width={100}
        height={100} /></div>
      <div className='flex flex-col'>

        <h3 className='text-[#000] rubik_regular text-[12px]'>{item?.productTitle}</h3>
        <h4 className='text-[#1D252C] rubik_medium text-[13px]'>{item?.new_price}</h4>
        <h4 className='text-[#1D252C] rubik_regular text-[8px]'>{item?.price}</h4>
        <div>
          <div></div>
          <p className='rubik_medium text-[12px]'>Add to cart</p>
          <div></div>
        </div>
      </div>

    </div>
  )
}

export default FrequentlyBoughtCard

