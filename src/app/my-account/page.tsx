'use client'
import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/my-account/my-profile')
  },[])
  return (
    <div className=' pt-[300px] '>
     
    </div>

  )
}
