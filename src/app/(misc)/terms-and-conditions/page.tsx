import React from 'react'
import ContentSection from '../_components/ContentSection'
import data from '@/data/json/misc/terms-conditions.json'

function Page() {
  return (
    <>
      <div className='text-[14px] rubik_regular mb-3'>
        {data?.paragraph.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
            <p className='mt-2'>  <span className='rubik_medium'>Note:</span>  {data?.note}</p>
      </div>
      <ContentSection data={data?.data} className='pt-4' />
    </>



  )
}

export default Page
