import React from 'react'
import Image from 'next/image';
import Notfound from '../../../public/assets/images/notfound.svg'
import Link from 'next/link';

function NotFoundComponent() {
  return (
    <div className="flex justify-center flex-col items-center w-full">
      <div className='w-[360px] h-auto overflow-hidden'>
        <Image src={Notfound} alt="notfound" height={100} width={100} loading='lazy' />
      </div>
      <h2 className='rubik_semibold text-[56px]'>Uh oh. This page doesn&apos;t exist.</h2>
      <div className='rubik_regular text-[18px]'>
        Why don&apos;t you head back to our
        <Link href="/" className="text-[#0457C8] no-underline">
          {" "} homepage {" "}
        </Link>
        that does exist.
      </div>
    </div>
  )
}

export default NotFoundComponent
