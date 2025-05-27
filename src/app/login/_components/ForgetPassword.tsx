import CustomButton from '@/components/buttons/CustomButton';
import CustomTextInput from '@/components/input/CustomTextInput';
import Link from 'next/link';
import React from 'react'

function ForgetPassword({onClose,loading, formData, setFormData, handleSend}: {onClose: () => void;loading:boolean; handleSend:any; formData: any; setFormData: any }) {

    return (
        <><h2 className='rubik_medium text-[#46474A] text-[24px] mb-3'>Forgot password?</h2>
            <p className='rubik_regular text-[#000] text-[14px] mb-6'>Don’t worry! Fill in your email and we’ll send you a link to reset your password</p>

            <CustomTextInput
                className="mb-4"
                placeholder="Email Address"
                name="verifyEmail"
                type="email"
                value={formData.verifyEmail}
                setData={setFormData}

                isError={false}
            />
            <CustomButton
            isLoading = {loading}
                onClick={handleSend}
                title='Send Email'
                buttonClass='bg-[#FFE000]'
                isButtonClass={true}
                istTitleClass={true}
                titleClass='text-[#040C13]
                                       rubik_medium text-[16px]'/>
            <div className="w-full flex justify-center items-center">
                <button onClick={onClose}
                    className="text-sm text-blue-500 underline mt-4 "

                >
                    Back to login
                </button>
            </div></>

    )
}

export default ForgetPassword
