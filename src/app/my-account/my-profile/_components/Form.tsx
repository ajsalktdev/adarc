"use client"
import React, { useEffect, useState } from 'react';
import CustomButton from '@/components/buttons/CustomButton';
import CustomTextInput from '@/components/input/CustomTextInput';
import PasswordModal from '../modal/PasswordModal';
import fetchApiData from '@/config/fetch-api-data';
import postApiData from '@/config/post-api-data';
import { useRouter } from 'next/navigation';

export default function Form() {
    const router = useRouter()
    const [isError, setError] = useState(false);
    const [errorFields, setErrorFields] = useState({});
    const [isPasswordModal, setPasswordModal] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [initialData, setInitialData] = useState<any>({});
    const [selectedCountry, setSelectedCountry] = useState({
        name: 'UAE',
        phone_code: '+971',
        phone_number_length: 10,
        web_code: 'UAE',
        flag: '🇮🇳',
    });

    const [isSubmitEnabled, setSubmitEnabled] = useState(false);

    const handleSubmit = async () => {
        if (!isSubmitEnabled) {
            return
        }
        try {
            const responseData = await postApiData<any>(
                "users/update-profile-info/",
                {
                    name: formData?.name,
                    phone: formData?.phone,
                    country: selectedCountry?.web_code,
                },
                undefined,
                true
            );

            const { status_code, message } = responseData;

            if (status_code === 6000) {
                // router.refresh()
                // window.location.reload()
                // Handle success
                getProfileData()
            } else if (status_code === 6001) {
                if (message?.body) {
                    setErrorFields((prevData) => ({
                        ...prevData,
                        ...message.body,
                    }));
                }
            } else {
                console.warn(`Unexpected status code: ${status_code}`);
            }
        } catch (error) {
            console.error("API POST error:", error);
        }
    };

    const getProfileData = async () => {
        try {
            const responseData = await fetchApiData<any>("users/profile-details/", {
                requireAuth: true,
            });
            const { status_code, data } = responseData;
            if (status_code === 6000) {
                setFormData(data);
                setInitialData(data); // Save initial data for comparison
                setSelectedCountry(data?.country);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const closeModal = () => {
        setPasswordModal(false);
    };

    const handleModal = () => {
        setPasswordModal(true);
    };

    // Compare form data with initial data to enable/disable submit button
    useEffect(() => {
        const isDataChanged = JSON.stringify(formData) !== JSON.stringify(initialData);
        setSubmitEnabled(isDataChanged);
    }, [formData]);

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <>
            <PasswordModal isOpen={isPasswordModal} onClose={closeModal} />
            <div className='w-[450px]  max-sm:w-[80%]  max-[480px]:w-[90%] ml-[70px] max-sm:ml-[0px] max-sm:mb-[40px] '>
                <CustomTextInput
                    className="mb-5"
                    placeholder="Full Name"
                    name="name"
                    value={formData.name}
                    setData={setFormData}
                    isError={isError}
                    errorFields={errorFields}
                    label="Full Name"
                    readonlyOption={true}
                />
                <CustomTextInput
                    className="mb-5"
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    setData={setFormData}
                    isError={isError}
                    errorFields={errorFields}
                    label="Email Address"
                    readonlyOption={false}
                    isDisabled={true}
                />
                <CustomTextInput
                    className="mb-5"
                    placeholder="Mobile Number"
                    name="phone"
                    type="mobile"
                    value={formData?.phone}
                    setData={setFormData}
                    isError={isError}
                    errorFields={errorFields}
                    label="Mobile Number"
                    readonlyOption={true}
                    selectedCountry={selectedCountry}
                    setSelectedCountry={setSelectedCountry}
                />
                <CustomButton
                    onClick={handleSubmit}
                    title='Save Changes'
                    buttonClass={`bg-[#FFE000] ${isSubmitEnabled ? "cursor-pointer " : "cursor-not-allowed"
                        }`}
                    isButtonClass={true}
                    istTitleClass={true}
                    titleClass='text-[#040C13] rubik_medium text-[16px]'
                />
                <CustomButton
                    onClick={handleModal}
                    title='Change Password'
                    buttonClass='border-[#fff]'
                    isButtonClass={true}
                    istTitleClass={true}
                    titleClass='text-[blue] rubik_regular text-[12px] mt-8 text-left'
                />
            </div>
        </>
    );
}
