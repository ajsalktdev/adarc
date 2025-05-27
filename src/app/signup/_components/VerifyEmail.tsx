import CustomButton from '@/components/buttons/CustomButton';
import OtpInput from '@/components/input/OtpInput';
import postApiData from '@/config/post-api-data';
import React, { useEffect, useState } from 'react'

function maskEmail(email: string) {
  if (!email) return '';
  const [localPart, domain] = email.split('@');
  if (localPart.length > 2) {
    return `${localPart[0]}${'*'.repeat(localPart.length - 2)}${localPart.slice(-1)}@${domain}`;
  }
  return email; // In case the local part is too short to mask.
}

function VerifyEmail({setTimer,timer,isLoading,handleVerify, formData, otp, setOtp, resendOtp }: {setTimer:any;timer:number;isLoading?:any,handleVerify?:any, formData?: any, otp?: any, setOtp?: any, setVerifyModal?: any, setVerified?: any ;resendOtp :any }) {


  const maskedEmail = maskEmail(formData?.email);



  return (
    <div className='w-full pt-8 pb-5 px-6 flex flex-col gap-8'>
      <div>
        <h1 className='rubik_medium text-2xl '>Verify your Email</h1>
        <p className='rubik_regular text-[14px] '>Please enter the code we sent to {maskedEmail}</p>
      </div>
      <div className='flex items-center flex-col'>
        <OtpInput otp={otp} setOtp={setOtp} />
        <div className='text-[#999999] rubik_regular text-[12px] flex '><span>Didn’t recieve a code? </span>
          <button disabled={timer>0 ? true :false} onClick={resendOtp} className='text-[#0071DC] ml-[2px]'>Resend OTP</button>{timer >0 && <span className='ml-[2px]'>in {timer} sec</span>} </div>
      </div>
      <CustomButton
      isLoading={isLoading}
        onClick={()=>handleVerify()}
        title='Verify Email'
        buttonClass='bg-[#FFE000]'
        isButtonClass={true}
        istTitleClass={true}
        titleClass='text-[#040C13]
              rubik_medium text-[16px]'/>
    </div>
  )
}

export default VerifyEmail
