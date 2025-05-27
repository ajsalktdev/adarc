import { cn } from '@/utils/utils'
import Image from 'next/image'
import React from 'react'

export default function ScrollIcon({left=false,onClick}:any) {
  return (
    <button onClick={onClick} className={cn("hover:opacity-[.7]   self-center w-[55px] h-[55px] flex items-center justify-center rounded-full border-[1.5px] border-solid border-light_gray ",left ?'rotate-180 ' : '')}>
        <div   className='w-[7.46px] h-[12.63px] items-center justify-center flex '>
            <Image src={'/assets/icons/scroll.svg'} width={100} height={100} alt='scrollIcon' loading='lazy'/>
        </div>
    </button>

  )
}
