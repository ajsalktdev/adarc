import React, { useState, useRef, useEffect } from 'react'
import { getIcon } from '@/components/image/Icon'
import CustomButton from '@/components/buttons/CustomButton';
import postApiData from '@/config/post-api-data';

function AddressCard(
  { address, setAddForm,
    setFormData,
    setSelectedCountry,
    getAddressData,
    radioButton = false,
    deliveryAddress,
    setDeliveryAddress,
    setEdit,
    name,
    defaultlabel = true,
    defaultbutton = true,
    cartPage = false,
  }:
    {
      address: any,
      setAddForm: any,
      setFormData: any,
      setSelectedCountry: any,
      getAddressData: any,
      radioButton?: any,
      deliveryAddress?: any,
      setDeliveryAddress?: any,
      setEdit: any,
      name?: any,
      defaultlabel?: any,
      defaultbutton?: any,
      cartPage?: any,


    }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleEdit = () => {
    setAddForm(true)
    setIsModalOpen(false);
    setSelectedCountry(address?.country)
    setEdit(true)
    setFormData({
      full_name: address.full_name || "", // ensure it defaults to an empty string if undefined
      email: address.email || "", // add email field if available in the address object
      telephone: address.telephone || "", // use the telephone field
      country: address.city.region.country.name || "", // assuming address structure has this path
      city: address.city || "",
      street_address: address.street_address || "",
      building_name: address.building_name || "",
      apartment_address: address.apartment_address || "",
      pk: address.pk || ""
    });
  };

  const handleDelete = async (pk: any) => {
    try {
      const responseData = await postApiData<any>(
        `users/delete-address/${pk}/`,
        undefined,
        undefined,
        true
      );

      const { status_code, message } = responseData;

      if (status_code === 6000) {
        setIsModalOpen(false);

        getAddressData()
      } else if (status_code === 6001) {
      } else {
      }
    } catch {
    }
  };
  const handleSetDefault = async (pk: any) => {
    try {
      // Make an API call using postApiData
      const responseData = await postApiData<any>(
        `users/set-address-as-default/${pk}/`,
        undefined,
        undefined,
        true
      );

      // Destructure the response
      const { status_code, message } = responseData;

      // Handle different status codes
      if (status_code === 6000) {
        getAddressData()
     
        console.log("Address set as default successfully:");
      } else if (status_code === 6001) {
        console.error("Failed to set default address:", message);
      } else {
        console.error("Unexpected response:", responseData);
      }
    } catch {
      console.error("Error setting default address:");
    }
  };


  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
        setEdit(false)
      }
    };

    if (isModalOpen) {

      document.addEventListener('mousedown', handleOutsideClick);
    } else {

      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {

      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className='relative border border-solid border-[#E2E4E5] rounded-[6px] py-3 px-4 bg-[#FFF9E94D]'>
      <div className='flex w-full items-start'>
        {radioButton && (
          <input
            type="radio"
            name={name}
            value={address.pk}
            checked={deliveryAddress === address?.pk}
            onChange={() => {
              if (cartPage) {
                handleSetDefault(address?.pk);
              }
              setDeliveryAddress(address?.pk);
            }}
            className="mr-2 mt-3"
          />
        )}

        <div className='w-full'>
          <div className='flex justify-between items-baseline mb-1 rubik_regular text-[#222222] text-[16px] '>


            <div className='flex flex-col'>
              {defaultlabel && address?.is_default && (
                <div>
                  <span className=" text-gray-700 text-[11px] px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300">
                    Default Address
                  </span>
                </div>
              )}
              <h4 className='pt-1 w-full'>
                {address?.full_name}, {address?.telephone}
              </h4>
            </div>

            <button onClick={toggleModal}>
              {getIcon({ icon: 'dots', className: 'h-[16px] w-[4px]' })}
            </button>

            {isModalOpen && (
              <div
                ref={modalRef}
                className="absolute top-0 right-0 mt-2  bg-white px-4 py-2  border rounded-[6px] shadow-md z-50"
              >
                <button
                  onClick={() => handleEdit()}
                  className="block text-blue-500 mb-2 w-full rubik_regular text-[12px]  text-left"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.pk)}
                  className="block text-red-500 w-full rubik_regular text-[12px] text-left"
                >
                  Delete
                </button>

              </div>
            )}
          </div>



          <p className='rubik_regular text-[#717171] text-[14px]'>
            {address?.building_name}, {address?.apartment_address}, {address?.street_address},
            {address.city.name}, {address.city.region.country.name}
          </p>

          {!cartPage && defaultbutton && !address?.is_default &&
            <div className=''>
              <CustomButton
                onClick={() => handleSetDefault(address?.pk)}
                title="Set as Default"
                buttonClass=" border-0 flex flex justify-start"
                isButtonClass={true}
                istTitleClass={true}
                titleClass=" rubik_regular   text-blue-600 text-[12px]"
              />
            </div>}
        </div>
      </div>
    </div>
  );
}

export default AddressCard;
