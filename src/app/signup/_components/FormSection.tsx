"use client";
import CustomButton from "@/components/buttons/CustomButton";
import CustomTextInput from "@/components/input/CustomTextInput";
import postApiData from "@/config/post-api-data";
import React, { useEffect, useState } from "react";
import VerifyEmail from "./VerifyEmail";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ApiResponse<T> {
  status_code: number;
  data: T | null;
  message?: string;
}

function FormSection() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [isError, setError] = useState(false);
  const [errorFields, setErrorFields] = useState({});
  const [VerifyModal, setVerifyModal] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'UAE',
    phone_code: '+971',
    phone_number_length: 10,
    web_code: 'UAE',
    flag: '🇮🇳',
  });
  const [formData, setFormData] = useState<any>({
    fullname: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirm_password: "",
  });
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [timer, setTimer] = useState(20);
  const [isResendClicked, setResendClicked] = useState(0);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email" && value !== formData.email) {
      setIsEmailVerified(false);
    }
  };

  const handleOtpsend = async () => {
    setLoading(true);
    setError(false);
    try {
      const responseData = await postApiData<ApiResponse<any>>(
        "users/auth/send-otp/",
        {
          email: formData.email,
        }
      );

      const { status_code, message } = responseData;

      if (status_code === 6000) {
        setResendClicked(isResendClicked + 1); // Increment resend count
        setVerifyModal(true);
        setTimer(20); // Reset timer to 20 seconds on resend
        setLoading(false);
      } else {
        setError(true);
        console.error("Error sending OTP:", message);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error in OTP API call:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    try {
      const responseData:any = await postApiData<ApiResponse<any>>(
        "users/auth/sign-up/",
        {
          fullname: formData?.fullname,
          email: formData?.email,
          phone: formData?.phone,
          country: selectedCountry?.web_code || "UAE",
          password: formData?.password,
          confirm_password: formData?.confirm_password,
          keep_signed_in: keepSignedIn,
          subscribe_news_letter: false,
          otp: otp.join(""),
        }
      );

      const { status_code, message } = responseData;

      if (status_code === 6000) {
        setIsEmailVerified(true);
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          country: "",
          password: "",
          confirm_password: "",
        });
        setLoading(false);
        router.push("/login");
      } else if (status_code === 6001) {
        setIsEmailVerified(false);
        setError(true);
        setLoading(false);
        if (message?.body) {
          setErrorFields(message.body);
        }
      } else {
        console.warn(`Unexpected status code: ${status_code}`);
      }
    } catch (error) {
      console.error("API POST error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setOtpLoading(true);
    setIsEmailVerified(true);
    try {
      const response = await postApiData<ApiResponse<any>>(
        "users/auth/verify-otp/",
        {
          email: formData?.email,
          otp_code: otp.join(""), // Combine OTP digits into a single string
        }
      );

      if (response?.status_code === 6000) {
        await handleSignup();
      } else {
        setOtpLoading(false);
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      setOtpLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  const resendOtp = () => {
    if (timer === 0) {
      handleOtpsend(); // Only allow resend if the timer has expired
    }
  };

  const colors = ["#FDB615", "#1F1F1F", "#FDB615", "#1F1F1F"];

  return (
    <div className="md:max-w-[500px] md:w-[30%] bg-[#fff] md:min-w-[320px]">
      <div className="w-full flex justify-between h-[8px]">
        {colors.map((color, index) => (
          <div
            key={index}
            className="w-1/4 h-full"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>

      {!VerifyModal && (
        <div className="w-full pt-8 pb-5 px-6">
          <div>
            <h1 className="rubik_medium text-2xl ">Create an account</h1>
            <p className="rubik_regular text-[14px] ">Fill up</p>
          </div>

          <CustomTextInput
            className="mb-6 mt-6"
            placeholder="Full Name"
            name="fullname"
            value={formData.fullname}
            setData={setFormData}
            isError={isError}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
          <CustomTextInput
            className="mb-6"
            placeholder="Email Address"
            name="email"
            type="email"
            value={formData.email}
            setData={setFormData}
            isError={isError}
            errorFields={errorFields}
            onChange={handleInputChange}
            setErrorFields={setErrorFields}
          />
          <CustomTextInput
            className="mb-6"
            placeholder="Mobile Number"
            name="phone"
            type="mobile"
            value={formData.phone}
            setData={setFormData}
            isError={isError}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          <CustomTextInput
            className="mb-6"
            placeholder="Password"
            name="password"
            type="password"
            value={formData.password}
            setData={setFormData}
            isError={isError}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
          <CustomTextInput
            className="mb-6"
            placeholder="Confirm Password"
            name="confirm_password"
            type="password"
            value={formData.confirm_password}
            setData={setFormData}
            isError={isError}
            errorFields={errorFields}
            setErrorFields={setErrorFields}
          />
          <div className="w-full flex gap-2 my-8">
            <Link
              href={"/login"}
              className="underline text-blue-700 rubik_regular text-[14px]"
            >
              sign in
            </Link>
          </div>
          <CustomButton
            isLoading={isLoading}
            onClick={
              isEmailVerified && formData?.email
                ? handleSignup
                : !isEmailVerified && formData?.email
                  ? handleOtpsend
                  : handleSignup
            }
            title="Create Account"
            buttonClass="bg-[#FFE000]"
            isButtonClass={true}
            istTitleClass={true}
            titleClass="text-[#040C13]
                 rubik_medium text-[16px]"
          />

          <p className="text-[10px] rubik_regular mt-3">
            By selecting "Create Account" you agree that you are subject to
            Adarc Computers Notice of
            <span className="rubik_semibold"> Privacy Practices</span> and
            <span className="rubik_semibold">Legal Notice</span>
          </p>
        </div>
      )}

      {VerifyModal && (
        <VerifyEmail
          formData={formData}
          timer={timer}
          setTimer={setTimer}
          resendOtp={resendOtp}
          otp={otp}
          setOtp={setOtp}
          isLoading={setOtpLoading}
          handleVerify={handleVerify}
          setVerifyModal={setVerifyModal}
        />
      )}
    </div>
  );
}

export default FormSection;
