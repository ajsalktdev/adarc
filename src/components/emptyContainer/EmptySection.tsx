import Image from 'next/image'
import React from 'react'
import CustomButton from '../buttons/CustomButton'
import EmptyIcon from '../../../public/assets/icons/emptyIcon.svg'
import { useRouter } from 'next/navigation'

export default function EmptySection({ title, message, button = true }: any) {

    const router = useRouter()
    return (
        <div className='items-center justify-center flex flex-col gap-[20px]'>
            <div className='w-[224px] h-[224px] items-center justify-center flex '>
                <Image width={100} height={100} className='w-[100%] h-[100%]' src={'/assets/icons/emptyNewImage.svg'} alt='emptyImage' />
            </div>
            <div className=''>
                <p className='text-center text-black text-[20px] leading-[24px] rubik_medium'>{title}</p>
            </div>
            <div className=''>
                <p className='text-center text-black text-[14px] leading-[18px] rubik_regular'>{message}</p>
            </div>
            {button &&
                <div className='w-[280px]'>
                    <CustomButton onClick={() => router.push('/')} buttonClass='bg-button_yellow' isButtonClass={true} title='Return to home' />
                </div>
            }

        </div>
    )
}
