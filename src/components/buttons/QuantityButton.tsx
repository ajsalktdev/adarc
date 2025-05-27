'use client'
import React from 'react'
import CustomButton from './CustomButton'

export default function QuantityButton({isLoading=false,incrementCount,decrementCount ,quantity,setQuantity}:any) {
  return (
    <div className='flex flex-row'>
                    <div className='w-[32px]' ><CustomButton isDisabled={isLoading} onClick={decrementCount} 
                        istTitleClass={true} titleClass='text-[16px] rubik_regular' title='-' isButtonClass={true} buttonClass='border-0 bg-isabelline h-[32px]' /></div>
                   
                    
                   <div className='w-[32px] h-[32px] justify-center items-center flex bg-white'>
                    { isLoading ? <div className="w-5 h-5 border-4 border-t-transparent border-gray-400 border-solid rounded-full animate-spin"></div>
                        : <span className='block rubik_medium text-[16px] leading-[18px] text-BLACK'>{quantity}</span>}
                    </div>
                    <div className='w-[32px]' ><CustomButton isDisabled={isLoading} onClick={incrementCount} istTitleClass={true} titleClass='text-[16px] rubik_regular' title='+' isButtonClass={true} buttonClass='border-0 bg-isabelline h-[32px]' /></div>
                </div>
  )
}
