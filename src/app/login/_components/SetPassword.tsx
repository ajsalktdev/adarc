import CustomButton from '@/components/buttons/CustomButton'
import CustomTextInput from '@/components/input/CustomTextInput'
import React from 'react'

function SetPassword({ formData,
    setFormData,
    isError,
    errorFields,
    handleSubmit,
}:
    {
        formData: any,
        isError: boolean,
        setFormData: React.Dispatch<React.SetStateAction<any>>,
        errorFields: any,
        handleSubmit: () => void,
    }) {


    return (
        <div>
         
            <CustomTextInput
                className="mb-6"
                placeholder="Password"
                name="new_password"
                type="password"
                value={formData.new_password}
                setData={setFormData}
                isError={isError}
                errorFields={errorFields}
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
            />
            <CustomButton
                onClick={handleSubmit}
                title='Submit'
                buttonClass='bg-[#FFE000]'
                isButtonClass={true}
                istTitleClass={true}
                titleClass='text-[#040C13]
                                                   rubik_medium text-[16px]'/>
        </div>
    )
}

export default SetPassword
