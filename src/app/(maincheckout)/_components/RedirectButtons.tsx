import CustomButton from '@/components/buttons/CustomButton'
import { useRouter } from 'next/navigation'
import React from 'react'

function RedirectButtons() {

    const router =useRouter()


  return (
    <div className='flex gap-3 pb-5  py-5 justify-center'>
       <CustomButton
            onClick={()=>{router.push("/my-account/my-orders/")}}
            title='Go to My orders'
            buttonClass='border-[#C5CBD5] px-2 flex w-[150px]'
            isButtonClass={true}
            istTitleClass={true}
            titleClass='text-[#040C13]
             rubik_medium text-[14px]'/>
               <CustomButton
            onClick={()=>{router.push("/")}}
            title='Return to home'
            buttonClass='bg-[#FFE000] border-[#C5CBD5] p-1 flex w-[150px]'
            isButtonClass={true}
            istTitleClass={true}
            titleClass='text-[#040C13]
             rubik_medium text-[14px]'/>
    </div>
  )
}

export default RedirectButtons
