import React from 'react'
import productData from '../../../data.json'
import Image from 'next/image'
import Link from 'next/link'

export default function MiddleBanner({data}:any) {

  return (
    <div className='flex items-center justify-between mb-[28px] md:mb-[48px] px-[10px] max-sm:flex-wrap  '>
        {data?.single?.map((item:any,index:any)=>(
            <Link href='' key={index} className='w-[49%] flex sm:w-[33%] max-sm:last:w-[100%] max-sm:last:mt-[10px] bg-PRIMARY_GREY' style={{ aspectRatio: '1' }}>
                <Image className='w-full h-full' src={item?.image} width={400} height={400} alt='banner' loading='lazy'/>
            </Link>
        ))}
        
    </div>
  )
}
