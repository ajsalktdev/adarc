import Image from 'next/image'
import React from 'react'

export default function DeliveryItemHighlight({item}:any) {

    
  return (
        <div className='flex flex-row gap-[4px] items-center'>
            <div className='w-[24px] h-[24px]flex items-center justify-center '>
                <Image src={item.image} width={100} height={100}  alt='highlightIcon' />
            </div>
            <div>
                <span className='text-[12px] leading-[16px] rubik_regular text-EerieBlack '>{item?.title}</span>
            </div>
        </div>
  )
}
