import React from 'react'
import ContentSection from '../_components/ContentSection'
import data from '@/data/json/misc/privacy-policy.json'

function Page() {
  return (
    <>
      <div className='text-[14px] rubik_regular mb-3'>
        <p className='text-[14px] rubik_regular leading-[18px]'>{data?.paragraph}</p>
      </div>
      <ContentSection data={data?.data} className='pt-4' />
    </>
  )
}

export default Page
