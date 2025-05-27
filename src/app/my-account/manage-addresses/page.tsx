"use client"
import React, { useEffect, useState } from 'react'
import AddressCard from './_components/AddressCard';
import AddressForm from './_components/AddressForm';
import fetchApiData from '@/config/fetch-api-data';

function Page() {
    const [isAddForm, setAddForm] = useState(false)
    const [isEdit, setEdit] = useState(false)
    const [addressData, setAddressData] = useState([])
    const [selectedCountry, setSelectedCountry] = useState({
        name: 'UAE',
        phone_code: '+971',
        phone_number_length: 10,
        web_code: 'UAE',
        flag: '🇮🇳',
    });
    const [formData, setFormData] = useState<any>({
        full_name: "",
        email: "",
        mobileNumber: "",
        country: "",
        city: "",
        streetName: "",
        buildingName: "",
        apartmentName: "",

    });

    const handleAdd = () => {
        setAddForm(true);
    }

    const getAddressData = async () => {
        try {
            const responseData = await fetchApiData<any>("users/list-address/", {
                requireAuth: true, // Access token is required
            });
            const { status_code, data } = responseData;
            if (status_code === 6000) {
                setAddressData(data)
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        getAddressData();
    }, []);

    return (
        <div className='flex flex-col max-w-[1000px] p-4 gap-2'>
            {!isAddForm &&
                <button className='flex justify-start text-[#0457C8] rubik_medium text-[14px]' onClick={handleAdd}>
                    {/* {getIcon({ icon: "plus", className: 'h-[16px] w-[4px]' })} */}
                    <h5>ADD A NEW ADDRESS</h5>
                </button>
            }
            {isAddForm &&

                <div className=" border rounded-md bg-white border-primary_border border-solid">
                    <div className='bg-gray-100 w-full rounded-t-md p-3'>
                        <h3 className=" font-medium text-lg mb-2">Add a New Address</h3>
                    </div>
                    <div className='p-4'>
                        <AddressForm

                            isEdit={isEdit}
                            setEdit={setEdit}
                            setAddForm={setAddForm}
                            selectedCountry={selectedCountry}
                            formData={formData}
                            setSelectedCountry={setSelectedCountry}
                            setFormData={setFormData}
                            getAddressData={getAddressData}
                        />
                    </div>

                </div>
            }
            {addressData?.length > 0 && addressData?.map((address, index) => (
                <AddressCard
                    key={index}
                    getAddressData={getAddressData}
                    setSelectedCountry={setSelectedCountry}
                    setFormData={setFormData}
                    address={address}
                    setAddForm={setAddForm}
                    setEdit={setEdit} />
            ))}
        </div>
    )
}

export default Page
