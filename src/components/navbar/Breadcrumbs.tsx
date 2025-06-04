import Link from 'next/link'
import React from 'react'

export default function Breadcrumbs() {

  const breadcrumbsMenu = [
    {Link : 'Home' },
    {Link : 'Best Deals' },
    {Link : 'GamingPC' },
  ]
  return (
    <div className='h-[48px] w-full justify-center  px-[48px] flex   items-center border-b border-solid border-Platinum bg-white'>
        <div className='flex gap-[12px] items-center w-full'>

            {breadcrumbsMenu.map((title,index)=>(
              <div key={index} className='hover:opacity-[.6] gap-[12px] flex'>
                <Link className='text-[14px] leading-[16px] rubik_regular text-black ' href={`/adcfr/${title.Link}`} >{title.Link}</Link>
                {breadcrumbsMenu.length-1 != index &&  <span className='text-[14px] leading-[16px] rubik_regular text-black '>/</span>}
            </div>))}



        </div>

        
        
    </div>
  )
}
