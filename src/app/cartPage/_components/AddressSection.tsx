import AddressCard from '@/app/my-account/manage-addresses/_components/AddressCard';
import Modal from '@/components/modal/Modal';
import fetchApiData from '@/config/fetch-api-data';
import React, { useEffect, useState } from 'react'
import AddressForm from "../../my-account/manage-addresses/_components/AddressForm";

interface AddressSectionProps {
    addressData: any[];

    onClose: () => void;
    getAddressData: any
}

function AddressSection({ addressData, getAddressData, onClose }: AddressSectionProps) {
    const [isAddForm, setAddForm] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const handleAdd = () => {
        setAddForm(true);
    };
    const [deliveryAddressPk, setDeliveryAddressPk] = useState<string | null>(null);
    console.log(deliveryAddressPk,"deliveryAddressPkdeliveryAddressPkdeliveryAddressPk");
    
   
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
    const [selectedCountry, setSelectedCountry] = useState({
        name: "UAE",
        phone_code: "+971",
        phone_number_length: 10,
        web_code: "UAE",
        flag: "🇮🇳",
    });

    useEffect(() => {
         const defaultAddress = addressData?.find((item) => item.is_default === true);
        setDeliveryAddressPk(defaultAddress?.pk)
    }, []);


    return (<>
        <Modal
            isOpen={isAddForm}
            onClose={() => setAddForm(false)}
            className="w-[680px]">
            <div className="border rounded-md bg-white border-primary_border border-solid">

                <div className="p-4">
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
        </Modal>


            <button
                className="flex justify-start text-[#0457C8] rubik_medium text-[14px] mb-2"
                onClick={handleAdd}>
                <h5>ADD A NEW ADDRESS</h5>
            </button>
        
        <div className='flex flex-col w-full gap-2'>


            {addressData.length > 0 && [...addressData]
                .sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0))
                .map((address, index) => (
                    <AddressCard
                        key={index}
                        name="deliveryAddress"
                        getAddressData={getAddressData
                        }
                        setSelectedCountry={setSelectedCountry}
                        setFormData={setFormData}
                        address={address}
                        setAddForm={setAddForm}
                        radioButton={true}
                        deliveryAddress={deliveryAddressPk}
                        setEdit={setEdit}
                        setDeliveryAddress={setDeliveryAddressPk}
                        cartPage={true}
                    />
                ))}
        </div>
    </>)
}

export default AddressSection
