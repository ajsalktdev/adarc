'use client'
import React from 'react'
import Icon from '../includes/Icon'
import { navBarMiddle } from '@/utils/staticUtils';
// import useStore from '@/store/useStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useZustandStore from '@/store/useStore';
import searchIcon from '../../../public/assets/icons/search-gray.svg';



function MiddleRightSection({ setSearchVisble, searchvisible }: any) {
  const router = useRouter()
  const userInfo = useZustandStore.getState().userInfo;
  const { cartlist } = useZustandStore()


  const filterednavBarMiddle = navBarMiddle.filter((item) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 480 && item.label === 'My Account') {
      return false; // Remove 'My Account' or 'Login' when screen width is 480px or smaller
    }
    if (item.label === 'My Account' && !userInfo) {
      return {
        ...item,
        label: 'Login',
        route: '/login',
      };
    }
    return true;
  });

  return (
    <div className='flex gap-4 max-sm:gap-3 max-[480px]:gap-2 '>
      {/* <button className='hidden max-sm:flex justify-center items-center min-w-[26px] h-[26px] '
        onClick={() => { setSearchVisble(!searchvisible) }}>
        <Icon src={searchIcon} width={26} height={26} alt="icon" className="min-w-[20px] inline-block" />
      </button> */}

      {filterednavBarMiddle?.map((item: any, index) => (
        <Link aria-label={`go to ${item?.route}`} key={index} className='flex justify-between items-center gap-1' href={item?.route} >
          <div className='relative'>
            <Icon src={item?.icon} width={'24px'} height={'24px'} alt="icon" className="min-w-[24px] w-[24px]   inline-block" />
            {index == 2 && cartlist?.length > 0 && <div className='absolute -top-[14px] left-1   bg-yellow-500 rounded-full w-[15px] h-[15px] flex items-center justify-center'>
              <span className=' text-white text-[10px] rubik_regular'>{cartlist?.length}</span>
            </div>}
          </div>
          <h5 className='text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]'>{item?.label}</h5>
        </Link>
      ))}

    </div>
  )
}

export default MiddleRightSection
