'use client'
import React, { useState } from 'react'
import Strings from '../../../../utils/string'
import TitleComponent from './TitleComponent'
import UnderLinedButton from '@/components/buttons/UnderLinedButton'

export default function SpecGlance({ data }: any) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleViewMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div>
      <div className=''>
        <TitleComponent title={Strings.productPage.glance}  titleClass='rubik_bold' containerClass='' />
      </div>
      <div className='flex flex-wrap flex-row items-center gap-[12px] '>

        {data?.map((item: any,index:any) => (
          !isExpanded ?
          index < 6 && (
            <div key={index} className='max-h-[62px] min-w-[100%] sm:min-w-[45%] md:min-w-[160px] flex flex-col items-center px-[16px] py-[12px] max-w-[100%] w-[100%] sm:max-w-[45%]  sm:w-[45%]  md:max-w-[31%] md:w-[31%] rounded-[4px] gap-[10px] bg-glance_bg'>
            <TitleComponent title={item?.title}titleClass='rubik_medium' containerClass='mb-0' />
            <TitleComponent title={item?.value}  titleClass='rubik_regular' containerClass='' />
          </div>
          )
          :
           (
            <div key={index} className='max-h-[62px] min-w-[160px] flex flex-col items-center px-[16px] py-[12px] max-w-[31%] w-[31%] rounded-[4px] gap-[10px] bg-glance_bg'>
            <TitleComponent title={item?.title}titleClass='rubik_medium' containerClass='mb-0' />
            <TitleComponent title={item?.value}  titleClass='rubik_regular' containerClass='' />
          </div>
          )

        ))
        }

      </div>
      {data.length > 6 && <div className='mt-[12px]'>
        <UnderLinedButton onClick={toggleViewMore} className='text-[12px] rubik_regular leading-[14.22px]' title={isExpanded ?Strings.button.viewLess :Strings.button.viewSpecs} />
      </div>}
    </div>
  )
}
