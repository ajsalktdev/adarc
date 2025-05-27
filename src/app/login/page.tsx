"use client";

import React, { useState } from 'react'
import LoginForm from './_components/LoginForm'
import Wrapper from '@/components/includes/Wrapper'
import RightSection from './_components/RightSection'
import { div } from 'framer-motion/client';


function LoginPage() {

  return (
    <div className=''>
      <Wrapper
      className={`min-h-[calc(100vh-85px)] bg-white"
        `}
    >
      <div className={`flex md:flex-row  flex-col items-center w-full gap-5 justify-between `}>
        <LoginForm />
        <RightSection />

      </div>
    </Wrapper>
    </div>
    
  )
}

export default LoginPage
