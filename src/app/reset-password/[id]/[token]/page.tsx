'use client';

import CustomButton from '@/components/buttons/CustomButton';
import Wrapper from '@/components/includes/Wrapper';
import CustomTextInput from '@/components/input/CustomTextInput';
import { FormInput } from '@/components/input/FormInput';
import PasswordVerify from '@/components/passwordVerify/PasswordVerify';
import postApiData from '@/config/post-api-data';
import { form } from 'framer-motion/client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface ApiResponse<T> {
  status_code: number;
  data: T | null;
  message?: T | null;
}

export default function Page() {
  const colors = ['#FDB615', '#1F1F1F', '#FDB615', '#1F1F1F'];

  const pathname = usePathname()

  const uid =pathname.split('/')[2];
  const token = pathname.split('/')[3];
  const router = useRouter()

console.log(uid,'uid')
console.log(token,'token')
  const [formData, setFormData] = useState({
    uid: 'uid',
    token: '',
    reset_password: '',
    new_password: '',

  });
  const [isError, setError] = useState({
    reset_passwordError: false,
    new_passwordError: false,

  });
  const [errorFields, setErrorFields] = useState({
    new_passwordErrorMsg: 'check the password',
    reset_passwordErrorMsg: 'check the password',
  });

  const [isButtonLoading, setButtonLoading] = useState(false);
  const [isDisabled,setDisabled] = useState(false)





  const handleCreatePass = async () => {
    setButtonLoading(true);


    try {
      const responseData = await postApiData<ApiResponse<any>>(
        'users/reset-password/',
        {
          uid: uid,
          token: token, 
          new_password: formData.new_password,

        }
      );

      const { status_code, message } = responseData;

      if (status_code === 6000) {
        router.push('/login');
      } else if (status_code === 6001) {
        console.log(status_code,responseData, 'Something went wrong');

        if (message?.body) {
          setError({
            ...isError,
            new_passwordError: !!message?.body?.new_password, 
          });
          setErrorFields({
            ...errorFields,
            new_passwordErrorMsg: message?.body?.new_password || '',
          });
        }
      } else {
        console.warn(`Unexpected status code: ${status_code}`);
      }
    } catch (error) {
      console.error('API POST error:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  const handleFormChange = (name: string, value: string | number) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="bg-[#E4E4E4]">
      <Wrapper
        className={`min-h-[calc(100vh-85px)] flex justify-center items-center`}
      >
        <div className="bg-[white] flex flex-col max-w-[500px] w-[30%] min-w-[320px]">
          <div className="w-full flex justify-between h-[8px]">
            {colors.map((color, index) => (
              <div
                key={index}
                className="w-1/4 h-full"
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
          <div className="p-6">
            <FormInput
              type='password'
              label='Confirm new password'
              value={formData.reset_password}
              name="reset_password"
              placeholder="Enter new password"
              error={isError.reset_passwordError}
              setData={setFormData}
              className=""
              required={true}
              disabled={false}
              errorMessage={errorFields.reset_passwordErrorMsg}
              maxLength={16}
              inputRef={null}
              onChange={(value: string | number) => {
                handleFormChange('reset_password', value)
              }}
              onFocus={() => {
                setError({
                  reset_passwordError: false,
                  new_passwordError: false,

                })
              }}
              onBlur={() => {
                console.log("onBlur")
              }}
            />
            <FormInput
              type='password'
              label='Confirm new password'
              value={formData.new_password}
              name="new_password"
              placeholder="Confirm new password"
              error={isError.new_passwordError}
              setData={setFormData}
              className=""
              required={true}
              disabled={false}
              errorMessage={errorFields.new_passwordErrorMsg}
              maxLength={16}
              inputRef={null}
              onChange={(value: string | number) => {
                handleFormChange('new_password', value)
              }}
              onFocus={() => {
                setError({
                  reset_passwordError: false,
                  new_passwordError: false,

                })
              }}
              onBlur={() => {
                console.log("onBlur")
              }}
            />
            <div className='mt-1 mb-8 rubik_normal'>
              <PasswordVerify isDisabled={isDisabled} setDisabled={setDisabled}  data={formData.new_password} />
            </div>
            <CustomButton
            isDisabled={isDisabled || formData.new_password != formData.reset_password}
              isLoading={isButtonLoading}
              onClick={()=>{handleCreatePass()}}
              title="Create new Password"
              buttonClass="bg-[#FFE000]"
              isButtonClass={true}
              istTitleClass={true}
              titleClass="text-[#040C13] rubik_medium text-[16px]"
            />

          </div>
        </div>
      </Wrapper>
    </div>
  );
}
