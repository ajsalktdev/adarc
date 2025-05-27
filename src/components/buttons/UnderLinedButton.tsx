import { cn } from '@/utils/utils'
import React from 'react'

export default function UnderLinedButton({className,onClick, title}:any) {
  return (
    <button onClick={onClick} className='hover:opacity-[.7] flex justify-center items-center'>
        <span className={cn('block text-[12px] sm:[text-[14px]] md:text-[16px] leading-[20px] text-black rubik_regular underline',className)}>{title}</span>
    </button>
  )
}
