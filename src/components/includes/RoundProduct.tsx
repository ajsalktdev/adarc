import { cn } from '@/utils/utils';
import Image from 'next/image';
import React from 'react'

interface RoundProductProps {
  image: string;
  category: boolean
}
export default function RoundProduct({ image, category }: RoundProductProps) {

  return (
    <div className={cn('hover:opacity-[.9] rounded-full bg hover:scale-[1.09] transition-all transform overflow-hidden  bg-white shadow-md flex items-center min-w-[100%] max-w-[100%] w-[100%] min-h-[100%] max-h-[100%] h-[100%] justify-center', category ==false && '')} style={{aspectRatio:'1'}}>
        <div className={cn('w-[80px] h-[80px]  overflow-hidden flex items-center justify-center object-contain',category && 'w-[90%] h-[90%]')} >
          {image ?
            
            <Image 
            quality={100}
            className='w-full h-full object-contain'
            src={image}
              alt="productImage"
              width={250}
              height={100} /> : ""}
        </div>
    </div>
  )
}
