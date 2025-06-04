import React, { useState } from 'react';
import CustomTextInput from '@/components/input/CustomTextInput';
import postApiData from '@/config/post-api-data'; // Assuming this is your API helper function
import CustomButton from '@/components/buttons/CustomButton';

function EnquireForm() {
    const [isError, setError] = useState(false);
    const [errorFields, setErrorFields] = useState({});
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        mobileNumber: '',
        description: '',
    });
    const [isLoading, setLoading] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const handleSignup = async () => {
        setSuccess(false);
        setLoading(true);

        const { fullname, email, mobileNumber, description } = formData;

        try {
            const responseData:any = await postApiData('users/auth/sign-up/', {
                fullname,
                email,
                mobileNumber,
                description,
            });

            const { status_code, message } = responseData;

            if (status_code === 6000) {
                setSuccess(true);
                alert('Enquiry submitted successfully!');
            } else if (status_code === 6001) {
                setError(true);
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
            console.error('API POST error:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="enquiry-form">
            <CustomTextInput
                className="mb-6 "
                placeholder="Full Name"
                name="fullname"
                value={formData.fullname}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomTextInput
                className="mb-6"
                placeholder="Email Address"
                name="email"
                type="email"
                value={formData.email}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomTextInput
                className="mb-6"
                placeholder="Mobile Number"
                name="mobileNumber"
                type="tel"
                value={formData.mobileNumber}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomTextInput
                className="mb-6"
                placeholder="What’s on your mind"
                name="description"
                value={formData.description}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomButton
                onClick={handleSignup}
                title="Submit Enquiry"
                buttonClass="bg-[#FFE000]"
                isButtonClass={true}
                isTitleClass={true}
                titleClass="text-[#040C13] rubik_medium text-[16px]"
                disabled={isLoading} // Optional: disable the button while loading
            />
        </div>
    );
}

export default EnquireForm;
