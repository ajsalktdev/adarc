'use client'
import { navMenu } from '@/utils/staticUtils'
import React, { useState } from 'react'
import VectorIcon from '../../../public/assets/icons/vector_black.svg'
import Icon from '../includes/Icon'
import MegaMenu from './MegaMenu'
import { cn } from '@/utils/utils'
import Link from 'next/link'

export default function MainMenu({ data }: any) {
    
    const [isActiveMegaMenu, setActiveMegaMenu] = useState(false)
    const [activeIndex, setActiveIndex] = useState<any>(null)
    const [activeSection, setActiveSection] = useState<any>('')
    return (
        <>
            <div className=" w-full rounded-tl-[6px] rounded-bl-[6px]  bg-PRIMARY_GREY h-full py-6  flex flex-col overflow-y-scroll no-scrollbar" onMouseLeave={()=>{
                        setActiveMegaMenu(false);
                                setActiveIndex(null)
                                setActiveSection('')
                    }}>
                {data?.map((section: any, index: any) => (
                    <Link href={`/${section?.slug}`}
                        // onClick={() => {
                        //     if (isActiveMegaMenu == false) {
                        //         setActiveMegaMenu(true);
                        //         setActiveIndex(index)
                        //         setActiveSection(section?.slug)
                        //     }
                        //     else{
                        //         setActiveMegaMenu(false);
                        //         setActiveIndex(null)
                        //         setActiveSection('')


                        //     }
                        // }}
                        onMouseEnter={() => {
                                setActiveMegaMenu(true);
                                setActiveIndex(index)
                                setActiveSection(section?.slug)
                            
                        }}


                        key={index} className="flex px-4 group justify-between items-center cursor-pointer py-4">
                        <div className='flex gap-1'>
                            <Icon src={section?.small_icon} height={'24px'} width={'24px'} alt={'vectorIcon'} />

                            <h4 className=' opensans_regular group-hover:text-blue-500 group-hover:underline transition-all transform duration-200  rubik_medium'>{section?.name}</h4>
                        </div>
                        {/* <div>{getIcon({ icon: 'vector_black', className: 'w-[15px] rotate-0' })}</div>
             */}

                        <div
                            className={cn(
                                'transition-transform duration-300',
                                index == activeIndex ? '-rotate-90' : 'rotate-0'
                            )}
                        >
                            <Icon src={VectorIcon} height={'24px'} width={'24px'} alt={'vectorIcon'} />
                        </div>
                    </Link>
                ))}
                {
                    isActiveMegaMenu &&
                    <div className='absolute -left-[-100%] top-0 z-10'  >
                        <MegaMenu setActiveMegaMenu={setActiveMegaMenu} setActiveIndex={setActiveIndex} section={activeSection} data={data?.[activeIndex]?.departments} />
                    </div>
                }
            </div>


        </>
    )
}
