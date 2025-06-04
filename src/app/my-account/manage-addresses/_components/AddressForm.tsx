"use client"
import CustomButton from '@/components/buttons/CustomButton'
import CustomTextInput from '@/components/input/CustomTextInput';
import SelectInput from '@/components/input/SelectInput';
import fetchApiData from '@/config/fetch-api-data';
import postApiData from '@/config/post-api-data';
import React, { useEffect, useState } from 'react'

export default function Form(
    { setAddForm,
        formData,
        setFormData
        , selectedCountry,
        setSelectedCountry,
        getAddressData,
        isEdit,
        setEdit

    }
        :
        {
            setAddForm: any,
            formData: any,
            setFormData: any,
            selectedCountry: any,
            setSelectedCountry: any,
            getAddressData: any,
            isEdit: any,
            setEdit: any
        }) {
    const [isError, setIsError] = useState(false);
    const [errorFields, setErrorFields] = useState<any>({});
    const [cityList, setCityList] = useState({})
    const [isPasswordModal, setPasswordModal] = useState(false);

    console.log(formData, "formData");


    // Function to handle form submission
    const getData = async () => {
        try {
            const responseData = await fetchApiData<any>("core/list-regions/", {
            });
            const { status_code, data } = responseData;
            if (status_code === 6000) {
                setCityList(data)
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };
    const handleSubmit = async () => {
        setIsError(false);


        try {

            const endpoint = isEdit ? `users/edit-address/${formData?.pk}/` : "users/add-address/";

            const responseData = await postApiData<any>(endpoint, {
                full_name: formData?.full_name,
                email: formData?.email,
                telephone: formData?.telephone,
                country: selectedCountry?.country || "UAE",
                city: formData?.city,
                region: formData?.region?.slug,

                street_address: formData?.street_address,
                building_name: formData.building_name,
                apartment_address: formData.apartment_address


            },
                undefined,
                true
            );

            const { status_code, message } = responseData;

            if (status_code === 6000) {
                setFormData({

                });
                setEdit(true)
                getAddressData()
                setAddForm(false);

            } else if (status_code === 6001) {
                setIsError(true);
                if (message?.body) {
                    setErrorFields(message.body)


                }
            } else {
                console.warn(`Unexpected status code: ${status_code}`);
            }
        } catch (error) {
            console.log(error)
            setIsError(true);
        } finally {
        }
    };

    const closeModal = () => {
        setPasswordModal(false);
    };

    const handleCancel = () => {
        setAddForm(false);
        setFormData({})
        setEdit(false)

    };
    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div className='w-full'>
                <div className='w-full flex flex-wrap gap-[2%] '>
                    {/* Full Name */}
                    <div className='w-[48%]'>
                        <CustomTextInput
                            className="mb-5 "
                            placeholder="Full Name"
                            name="full_name"
                            value={formData.full_name}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}

                        />
                    </div>

                    <div className='w-[48%]'>
                        <SelectInput
                            label=""
                            name="region"
                            placeholder="Choose Emirate "
                            required={true}
                            value={formData?.region}
                            setData={setFormData}
                            error={isError}
                            className=" text-[#364152] text-[14px] font-medium"
                            dropDownValues={cityList}
                            isLoading={false}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}
                        />

                    </div>
                     <div className='w-[48%]'>
                        <CustomTextInput
                            className="mb-5 "
                            placeholder="city"
                            name="city"
                            value={formData.city}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}

                        />
                    </div>
                    <div className='w-[48%]' >

                        {/* Mobile Number */}
                        <CustomTextInput
                            className="mb-5"
                            placeholder="Mobile Number"
                            name="telephone"
                            type="mobile"
                            value={formData?.telephone}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            selectedCountry={selectedCountry}
                            setSelectedCountry={setSelectedCountry}
                        />
                    </div>


                    <div className='w-[48%]' >

                        {/* Street Name */}
                        <CustomTextInput
                            className="mb-5 "
                            placeholder="Street Name/No."
                            name="street_address"
                            value={formData.street_address}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}

                        />
                    </div>
                    <div className='w-[48%]' >

                        {/* Building Name */}
                        <CustomTextInput
                            className="mb-5 "
                            placeholder="Building Name/No."
                            name="building_name"
                            value={formData.building_name}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}

                        />
                    </div>
                    <div className='w-[48%]' >
                        {/* Apartment Name */}
                        <CustomTextInput
                            className="mb-5 "
                            placeholder="Apartment/Office No."
                            name="apartment_address"
                            value={formData.apartment_address}
                            setData={setFormData}
                            isError={isError}
                            errorFields={errorFields}
                            setErrorFields={setErrorFields}

                        />
                    </div>
                </div>
                <div className='flex'>
                    <CustomButton
                        onClick={handleSubmit}
                        title="Save"
                        buttonClass="bg-[#FFE000] max-w-[250px]"
                        isButtonClass={true}
                        istTitleClass={true}
                        titleClass="text-[#040C13] rubik_regular text-[16px"
                    />

                    <CustomButton
                        onClick={handleCancel}
                        title="Cancel"
                        buttonClass="border-[#fff] max-w-[100px] text-[blue] rubik_regular text-[12px] "
                        isButtonClass={true}
                        titleClass="text-[#040C13] rubik_regular text-[16px]"

                        istTitleClass={true}
                    />
                </div>
            </div>
        </>
    );
}
