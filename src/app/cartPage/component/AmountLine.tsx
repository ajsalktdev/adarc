import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent'
import { cn } from '@/utils/utils'
import React from 'react'
import Strings from '../../../utils/string'

export default function AmountLine({ title, amount, count, isTitle = true, isCount = false, isAmount = true, titleClass, amountClass,lineThrough=false }: any) {
    return (
        <div className={cn('flex flex-row justify-between',!isTitle && 'justify-end')}>
            {isTitle &&
                <div className='flex flex-row gap-x-[6px] justify-items-start '>
                        <TitleComponent title={title} titleClass={titleClass} containerClass='mb-0 ' />
                        {isCount &&
                            <span className='block rubik_regular text-[16px] leading-[20px] text-start'>
                                {`(${count} ${count > 1  ?' items' : ' item' })`}
                            </span>
                        }

                </div>
            }
            {isAmount && <div>
                <TitleComponent title={amount} titleClass={cn('rubik_regular text-[16px] leading-[20px]', amountClass)} lineThrough={lineThrough} containerClass='mb-0 ' />
            </div>}
        </div>
    )
}
