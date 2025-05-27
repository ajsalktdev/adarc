import Image from 'next/image'
import React from 'react'
import Playstore from '../../../public/assets/images/playstore-group.svg'
import Appstore from '../../../public/assets/images/Appstore-group.svg'


export default function DownloadApp() {
  return (
    <div>
      <h3 className='rubik_medium text-[16px] text-center mb-3 max-sm:text-[13px]'>      Download Our APP</h3>
      <div className=' cursor-not-allowed flex gap-1 justify-center'>
        <Image src={Appstore} alt='app-store' className='max-w-[150px] max-sm:max-w-[100px]' />
        <Image src={Playstore} alt='play-store' className='max-w-[150px] max-sm:max-w-[100px]' />

      </div>

    </div>
  )
}
