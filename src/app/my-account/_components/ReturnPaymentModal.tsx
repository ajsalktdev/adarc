import CustomButton from '@/components/buttons/CustomButton';
import Modal from '@/components/modal/Modal';
import postApiData from '@/config/post-api-data';
import React, { useCallback, useState } from 'react';

function ReturnPaymentModal({product}:any) {
  const [selectedReason, setSelectedReason] = useState(null);

  // Handle radio button selection
  const handleRadioChange = (event:any) => {
    setSelectedReason(event.target.value);
  };



  // Handle the submit button click
  const handleSubmit = async () => {
    try {
        const responseData = await postApiData<any>(`orders/return-product/${product?.pk}/`, {
          reason:selectedReason
        
        }, undefined, true);
  
        const { status_code, message } = responseData;
  
        if (status_code === 6000) {
 
        } else if (status_code === 6001 && message?.body) {
        } else {
          console.warn(`Unexpected status code: ${status_code}`);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    };

  return (
    <div>
      <h3>Choose the method for receiving payment</h3>

      <div className='flex items-baseline gap-2'>
        <input
          type="radio"
          id="refund"
          name="paymentOption"
          value="refund"
          onChange={handleRadioChange}
        />
        <label htmlFor="refund">
          <h6>I want a refund</h6>
          <p>We will process your refund, which may take up to 7 business days.</p>
        </label>
      </div>

      <div className='flex items-baseline gap-2'>
        <input
          type="radio"
          id="replacement"
          name="paymentOption"
          value="replacement"
          onChange={handleRadioChange}
        />
        <label htmlFor="replacement">
          <h6>I would like a replacement product</h6>
          <p>We will replace your product with a new one.</p>
        </label>
      </div>

      <CustomButton
        onClick={handleSubmit}
        title="Place Return Order"
        buttonClass="bg-[#FFE000]"
        isButtonClass={true}
        isTitleClass={true}
        titleClass="text-[#040C13] rubik_medium text-[16px]"
        disabled={!selectedReason} // Disable button if no option is selected
      />
    </div>
  );
}

export default ReturnPaymentModal;
