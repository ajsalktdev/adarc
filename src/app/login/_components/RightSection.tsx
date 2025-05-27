import React from 'react'
import CustomButton from '@/components/buttons/CustomButton'
import strings from '@/utils/string'
import { getIcon } from '@/components/image/Icon'
import { redirect } from 'next/navigation'


function RightSection() {
    return (
        <div className='md:flex flex-col gap-6 hidden  '>
            <div>
                <h1 className='rubik_medium text-2xl '>Create an Adarc account</h1>
                <p>For all orders over 500 AED</p>
            </div>
            <div className='flex flex-col gap-6'>
                {strings.highlightsection.map((item: any, index) => (
                    <div className='flex gap-[6px]' key={index}>
                        <div className='justify-center flex items-center'>
                            {getIcon({ icon: item.icon, className: 'w-[30px] h-[30px]' })}
                        </div>
                        <div className='flex flex-col gap-1'>
                            <h6 className='rubik_medium text-[14px]'>{item.title}</h6>
                            <p className='rubik_regular text-[12px]'>{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            {/* <CustomButton onClick={()=>redirect('/signup')} title='Create Account' /> */}
        </div>
    )
}

export default RightSection
