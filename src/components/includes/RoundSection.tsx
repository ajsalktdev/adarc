import React from 'react'
import RoundProduct from './RoundProduct';
import { cn } from '@/utils/utils';
import TitleSection from './TitleSection';
import Link from 'next/link';



export default function RoundSection({ sectionTitle,category=false, data }: any) {
  return (
    <div className=' md:mb-[30px] bg-PRIMARY_GREY px-[10px] rounded-[6px]  ' >
      <TitleSection sectionTitle={sectionTitle} className='mb-1' />
        <div className={cn('flex gap-[10px] sm:gap-[20px] md:gap-[30px] px-[10px] w-[100%] pt-[10px] no-scrollbar  items-baseline ',
        category ? 'overflow-x-scroll ' : 'overflow-scroll'
        )}>
        {data?.map((item:any, index:any) => (
        <Link href={`/${item?.slug}`} key={index} className={cn('items-center w-[80px] min-w-[80px] max-w-[80px] sm:sw-[122px] sm:min-w-[122px] sm:max-w-[122px] mb-2')}>
          <RoundProduct category={category} image={ item?.icon} />
          { category && <div className='mt-[8px]'><h1 className='font-normal rubik_regular text-center sm:text-[16px] text-[14px] hover:text-[#0457C8] line-clamp-2'>{item?.name}</h1></div>}
        </Link>
      ))}
        </div>
      
    </div>
  );
}
