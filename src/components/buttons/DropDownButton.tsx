'use client'
import React, { useState } from 'react'
import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent'
import { cn } from '@/utils/utils'
import VectorIcon from '../../../public/assets/icons/vector_black.svg'
import Icon from '../includes/Icon'
import WhiteDrop from '../../../public/assets/icons/dropWhite.svg'
import Data from '../../../data.json'


export default function DropDownButton({
  title,
  icon,
  buttonStyle,
  titleClass,
  containerClass,
  isActive = false,
  height,
  width,
  onclick,
  rotate_angle,
  dropdown = true,
  isIcon = false,
  accountPage = false,
  dropWhite = false,
  setActive,
  selectedItem,
  SetselectedItem,
  elbrateMenu = false,
  SideBar = false
}: any) {



  return (
    <div className='relative'>
      <button onClick={onclick} className={cn(' flex flex-row justify-between w-full items-center overflow-hidden', buttonStyle)}>
        <div className='flex'>
          {isIcon && <div className='mr-2 items-center justify-center flex'>
            <Icon height={accountPage ? '20px' : SideBar ? '15px' : '24px'} width={accountPage ? '20px' : SideBar ? '15px' : '24px'} alt={'selectIcon'} src={icon} />
          </div>}
          <div className={`${SideBar ? 'w-full' : 'w-full'}`}>
            <TitleComponent titleClass={titleClass} containerClass={containerClass} title={title} />
          </div>
        </div>

        {dropdown && <div className={cn('flex items-center justify-center  transition-transform duration-300', isActive ? `${rotate_angle ?? '-rotate-90'}` : 'rotate-0')}>
          {dropWhite ? <Icon height={height ?? '24px'} width={width ?? '24px'} alt={'vectorIcon'} src={WhiteDrop} />
            : <Icon height={height ?? '16px'} width={width ?? '16px'} alt={'vectorIcon'} src={VectorIcon} />}
        </div>}
      </button>
      {isActive && elbrateMenu &&
        <div className={cn('absolute top-[30px]  z-20 bg-black py-1 px-[6px] w-[150px] md:w-[240px] rounded-[6px]  ')}>
          <ul>
            {Data.emirates.map((emirate, index) => (
              <li className={cn('px-[10px] py-1 rounded-[4px] ', selectedItem?.title == emirate.title && 'bg-black_shade')} key={index}>
                <button className='text-[14px] leading-[20px] rubik_regular' 
                // onClick={() => { SetselectedItem(emirate.title); setActive(!isActive) }} 
                onClick={() => {
                  SetselectedItem(emirate); // set whole emirate object
                  setActive(!isActive);
                }}
                >
                  {emirate?.title}

                </button>
              </li>

            ))

            }
          </ul>

        </div>}
    </div>

  )
}
