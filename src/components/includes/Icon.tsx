import { cn } from '@/utils/utils'
import Image from 'next/image'
import React from 'react'

export default function Icon({src,alt,width,height}:any) {
  return (
    <div className={cn('flex items-center justify-center ',`flex items-center justify-center h-[${height}] w-[${width}]  min-w-[${width}] min-h-[${height}] max-h-[${height}] max-w-[${width}]`)}>
  {src &&  <Image width={100} height={100} className='w-full h-full ' src={src} alt={alt} />
  }
       
    </div>
  )
}
