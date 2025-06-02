import React from 'react'
import { getIcon } from '../image/Icon'
import strings from '@/utils/string'
import Wrapper from './Wrapper'
import { div } from 'framer-motion/client'
// update the path as needed

function HighlightSection({isDescription=true}:any) {

  return (
    <div className='bg-PRIMARY_GREY max-sm:hidden'>
          <Wrapper className=' text-[#E3E8EF] !py-[24px]'>
      <div className={'flex justify-between items-baseline  gap-[6px] w-full  text-TEXT_BLACK'}>
      {strings.highlightsection.map((item:any, index) => (
        <div key={index} className={`flex flex-col ${isDescription ?'justify-between' : 'justify-center' } items-center text-left gap-2`}>
          <div className={`'flex w-[24px] h-[24px]  items-center ${isDescription ? 'justify-start' : 'justify-center'}  m-1 '`}>{getIcon({ icon: item.icon, className: "w-[24px] h-[24px]" })}</div>
          <span className={`rubik_regular font-medium text-[12px] md:text-[14px] mc:text-[16px] text-left w-full ${isDescription ? 'text-left' : 'text-center'}`}>{item.title}</span>
          
          {isDescription && <span className={`text-[12px]  font-normal rubik_regular text-left w-full max-md:hidden  `}>{item.description}</span>}
          <div className=''>
         <a href={item?.link} className={`${isDescription ? 'justify-start' : 'justify-center'} text-[#46474A] rubik_regukar text-[12px] text-left w-full underline`}>{item.link_text}</a>

          </div>
        </div>
      ))}
    </div>
    </Wrapper>
    </div>


    
  )
}

export default HighlightSection
