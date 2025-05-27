import { getIcon } from '@/components/image/Icon'
import strings from '@/utils/string'
import React from 'react'

function HighlightBox() {
    return (
        <div className='max-w-[400px] w-[300px] text-center bg-[#fff]  ml-5 p-6 '>
            <h2 className='rubik_medium text-2xl mb-6'>Enjoy these perks</h2>
            <div className='flex flex-col gap-6'>
                {strings.highlightsection.map((item: any, index) => (
                    <div className='flex flex-col items-center  gap-1'>
                        {getIcon({ icon: item.icon, className: 'w-[30px] h-[30px]' })}
                        <h6 className='rubik_medium text-[14px]'>{item.title}</h6>
                        {/* <p className='rubik_regular text-[14px]'>{item.description}</p> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default HighlightBox
