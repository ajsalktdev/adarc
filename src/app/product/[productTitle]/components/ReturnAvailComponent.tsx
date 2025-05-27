import Image from 'next/image'
import React from 'react'
import returnIcon from '../../../../public/assets/icons/returnIcon.svg'

export default function ReturnAvailComponent() {
  return (
    <div className='flex flex-row gap-[4px] '>
        <div className='w-[24px] h-[24px] justify-center items-center'>
            <Image src={returnIcon} width={100} height={100} alt='returnImage' />
        </div>
        <div className='flex justify-center items-center '>
            <span className='block text-[12px] leading-[16px] text-gunmetal rubik_regular'>Free 14-days returns</span>
        </div>
    </div>
  )
}
