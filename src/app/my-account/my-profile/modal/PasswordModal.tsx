import CustomButton from '@/components/buttons/CustomButton';
import CustomTextInput from '@/components/input/CustomTextInput';
import Modal from '@/components/modal/Modal'
import postApiData from '@/config/post-api-data';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
// import useStore from '@/store/useStore';
import useZustandStore from '@/store/useStore';


function PasswordModal({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: any;

}) {
    const router = useRouter()
    const { clearAccessToken } = useZustandStore();

    const [isError, setError] = useState(false);
    const [errorFields, setErrorFields] = useState({});
    const [formData, setFormData] = useState<any>({

        current_password: "",
        new_password: "",
        confirm_password: "",
    });
    const handleSetPassword = async () => {
        try {
            const responseData = await postApiData<any>("users/update-password/", {

                current_password: formData?.current_password,
                new_password: formData?.new_password,
                confirm_password: formData?.confirm_password,
            },
                undefined,
                true
            );

            const { status_code, message } = responseData;

            if (status_code === 6000) {
                onClose()
                router.push("/login")
                Cookies.remove('accessToken');
                clearAccessToken();


            } else if (status_code === 6001) {
                setError(true);
                if (message?.body) {
                    setErrorFields((prevData: any) => ({
                        ...prevData,
                        ...message.body,
                    }));


                }

            } else {
                console.warn(`Unexpected status code: ${status_code}`);
            }
        } catch (error) {
            console.error("API POST error:", error);
        } finally {
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} className='w-[530px] p-8'>
            <CustomTextInput
                className="mb-5"
                placeholder="Current Password"
                label="Current Password"
                name="current_password"
                type="password"
                value={formData.current_password}
                setData={setFormData}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomTextInput
                className="mb-5"
                placeholder="New Password"
                label="New Password"
                name="new_password"
                type="password"
                value={formData.new_password}
                setData={setFormData}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomTextInput
                className="mb-5"
                placeholder="Re-enter Password"
                label="Re-enter Password"
                name="confirm_password"
                type="password"
                value={formData.confirm_password}
                setData={setFormData}
                isError={isError}
                errorFields={errorFields}
            />
            <CustomButton
                onClick={handleSetPassword}
                title='Change Password'
                buttonClass='bg-[#FFE000]'
                isButtonClass={true}
                istTitleClass={true}
                titleClass='text-[#040C13]
                 rubik_medium text-[16px]'/>

        </Modal>


    )
}

export default PasswordModal
