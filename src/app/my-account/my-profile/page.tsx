import React from 'react'
import Form from './_components/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {  // Change 'Metadata' to 'metadata'
  title: "My Profile"
}
export default function Page() {
  return (
    <div className='w-full max-[850px]:flex max-[850px]:justify-center'>
      <Form/>
    </div>
  )
}
