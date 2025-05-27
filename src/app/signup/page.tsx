import React from 'react'
import HighlightBox from './_components/HighlightBox'
import FormSection from './_components/FormSection'
import Wrapper from '@/components/includes/Wrapper'
import RightSection from '../login/_components/RightSection'
import { div } from 'framer-motion/client'


function Page() {
  
  return (
    <div className='bg-[#E4E4E4] h-full '>
       <Wrapper className='min-h-[calc(100vh-85px)]'>
      <div className=' flex flex-col md:flex-row  gap-8 justify-between items-start pb-4'>
        <FormSection />
        {/* <HighlightBox /> */}
        <RightSection/>
      </div>
    </Wrapper>
    </div>
   
  )
}

export default Page
