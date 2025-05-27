"use client";

import React, { useState } from "react";
import CustomButton from "@/components/buttons/CustomButton";
import CustomTextInput from "@/components/input/CustomTextInput";
import postApiData from "@/config/post-api-data";
import ForgetPassword from "./ForgetPassword";
import Link from "next/link";
// import useStore from "@/store/useStore";
import { redirect, useRouter } from "next/navigation";
import VerifyEmail from "@/app/signup/_components/VerifyEmail";
import Modal from "@/components/modal/Modal";
import { hostname } from "os";
import { Router } from "next/router";
import useZustandStore from "@/store/useStore";
import { FormInput } from "@/components/input/FormInput";
import Image from "next/image";

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
}
function LoginForm() {
    console.log(useZustandStore.getState().userInfo, "store");
    const route = useRouter()
    const { setAccessToken, setUserInfo } = useZustandStore();

    const [formData, setFormData] = useState({
        email: "",
        host_name: '',
        password: "",
        verifyEmail: ''
    });

    const [isError, setError] = useState<any>({
        email: false,
        password: false,

    });
    const [errorFields, setErrorFields] = useState({
        email: '',
        password: 'something went wrong! check email or  password',
    });

    const [keepSignedIn, setKeepSignedIn] = useState<any>(false);
    const [loading, setLoading] = useState<any>(false);
    const [Forgotloading, setForgotLoading] = useState<any>(false);
    // const [errorFields, setErrorFields] = useState({
    //     email: '',
    //     password  :''
    // });
    // const [isError, setError] = useState<any>(false);
    const [isForgotPass, setForgotPass] = useState<any>(false);
    const colors = ['#FDB615', '#1F1F1F', '#FDB615', '#1F1F1F'];

    const handleForgotPass = async () => {
        setForgotLoading(true)
        setError(false);
        const hostname = window.location.hostname;
        try {
            const responseData:any = await postApiData("users/forget-password/", {
                email: formData.verifyEmail,
                host_name: 'http://localhost:3000/'

            });

            const { status_code, message } = responseData;

            if (status_code === 6000) {
                setForgotLoading(false)

                // setForgotPass(false)
            } else {
                // setError(true);
                console.error(message);

            }
        } catch (error) {
            console.error("Error in OTP API call:", error);

        } finally {
            setForgotLoading(false)

        }
    }

    const handleFormChange = (name: string, value: string | number) => {
        setFormData({ ...formData, [name]: value });
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError({email :false,password:false});
        setLoading(true);

        try {
            const responseData = await postApiData<ApiResponse<any>>("users/auth/login/", {
                username: formData.email,
                password: formData.password,
                keep_signed_in: keepSignedIn,
            });

            const { status_code, message, data } = responseData;

            if (status_code === 6000) {
                if (data) {
                    setAccessToken(data?.access_token);
                    setUserInfo(data?.user_info) // Update the store with the token
                }
                // Handle successful login
                setFormData({ ...formData, email: "", password: "" });
                // alert("Login successful!");
                route.push("/")

            } else if (status_code === 6001) {
                setError({ email: true, password: true });
                console.log('errrorrrrr')
                // if (message?.body) {
                // setErrorFields((prev) => ({ ...prev, email : 'please check the email',password : 'please check the passeord' }));

                // setErrorFields((prev) => ({ ...prev, ...message.body }));
                // }
            } else {
                console.warn(`Unexpected status code: ${status_code}`);
            }
        } catch (error) {
            console.error("API POST error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>


            <div className=" w-[100%] sm:w-[80%] md:max-w-[30%] flex flex-col bg-[white] md:min-w-[400px] ">
                <div className="md:hidden max-w-[220px]  sm:max-w-[300px] min-w-[145px]  self-center  flex items-center justify-center" style={{aspectRatio:2}}>
                    <div className="w-full h-full flex justify-center items-center  ">
                    <Image src={'/assets/icons/logoAdarc.png'} alt="logo Adarc" width={400} height={190} className="w-full h-full" />

                    </div>
                </div>
                <div className="p-6">
                    <h4 className="rubik_medium text-2xl  font-bold mb-4">Sign in</h4>
                    <div>
                        <FormInput
                            isLabel={false}
                            type='email'
                            label=''
                            value={formData.email}
                            name="email"
                            placeholder="Enter email"
                            error={isError.email}
                            setData={setFormData}
                            className=""
                            required={false}
                            disabled={false}
                            errorMessage={errorFields.email}
                            maxLength={40}
                            inputRef={null}
                            onChange={(value: string | number) => {
                                handleFormChange('reset_password', value)
                            }}
                            onFocus={() => {
                                setError({
                                    email: false,
                                    password: false,

                                })
                            }}
                            onBlur={() => {
                                console.log("onBlur")
                            }}
                        />
                        <FormInput
                            isLabel={false}
                            type='password'
                            label=''
                            value={formData.password}
                            name="password"
                            placeholder="Enter password"
                            error={isError.password}
                            setData={setFormData}
                            className=""
                            required={false}
                            disabled={false}
                            errorMessage={errorFields.password}
                            maxLength={40}
                            inputRef={null}
                            onChange={(value: string | number) => {
                                handleFormChange('password', value)
                            }}
                            onFocus={() => {
                                setError({
                                    email: false,
                                    password: false,

                                })
                            }}
                            onBlur={() => {
                                console.log("onBlur")
                            }}
                        />
                        {/* <CustomTextInput
                        className="mb-4"
                        placeholder="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        setData={setFormData}

                        isError={isError}
                        errorFields={errorFields}
                        setErrorFields={setErrorFields}

                    />
                    <CustomTextInput
                        className=""
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        setData={setFormData}
                        isError={isError}
                        errorFields={errorFields}
                        setErrorFields={setErrorFields}
                    /> */}
                    </div>


                    {/* <div className="flex items-center gap-2 mb-6">
                        <input
                            type="checkbox"
                            className="h-[18px] w-[18px]"
                            checked={keepSignedIn}
                            onChange={(e) => setKeepSignedIn(e.target.checked)}
                        />
                        <label className="text-sm">Keep me signed in</label>
                    </div> */}
                    <div className="w-full flex justify-start mb-2">
                        <button onClick={() => setForgotPass(true)}
                            className="text-sm text-blue-700 underline "
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <CustomButton
                        isLoading={loading}
                        onClick={handleLogin}
                        title='Login'
                        buttonClass='bg-[#FFE000]'
                        isButtonClass={true}
                        istTitleClass={true}
                        titleClass='text-[#040C13]
                           rubik_medium text-[16px]'/>
                </div>

                <div className='px-6 w-full flex gap-2 '>
                    <p>doesn't have an account ?</p>
                    <Link href={'/signup'} className='underline text-blue-700 rubik_regular text-[14px]'>sign up</Link>
                </div>


            </div>



            <Modal isOpen={isForgotPass} onClose={() => setForgotPass(false)} className='w-[530px] p-8'>

                <ForgetPassword
                    onClose={() => { setForgotPass(false) }}
                    handleSend={handleForgotPass}
                    formData={formData}
                    setFormData={setFormData}
                    loading={Forgotloading}
                />
            </Modal>

        </>
    );
}

export default LoginForm;
