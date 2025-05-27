import CustomButton from '@/components/buttons/CustomButton';
import Modal from '@/components/modal/Modal';
import React, { useState } from 'react';
import ReturnPaymentModal from './ReturnPaymentModal';
import postApiData from '@/config/post-api-data';

function ReturnReasonModal({ product }: any) {
  console.log(product,"productproduct");
  
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [paymentMethode, setPaymentMethode] = useState(false);

  const reasons = [
    'The product quality is unsatisfactory.',
    'I need to return a non-functional, unsealed product.',
    'I changed my mind or the product was not as expected.',
    'The product information was misleading.',
    'The product was not delivered.'
  ];

  const handleCheckboxChange = (reason: string) => {
    setSelectedReason(reason === selectedReason ? null : reason);
  };

  const handleSubmit = async () => {
    try {
        const responseData = await postApiData<any>(`orders/return-product/${product?.pk}/`, {
          reason:selectedReason
        
        }, undefined, true);
  
        const { status_code, message } = responseData;
  
        if (status_code === 6000) {   setPaymentMethode(true);
 
        } else if (status_code === 6001 && message?.body) {
        } else {
          console.warn(`Unexpected status code: ${status_code}`);
        }
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    };

   
 

  return (
    <>
      {paymentMethode ? (
        <ReturnPaymentModal product={product}/>
      ) : (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">
            What is the primary reason for returning the product?
          </h3>
          <div className="space-y-2">
            {reasons.map((reason, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="returnReason"
                  value={reason}
                  checked={selectedReason === reason}
                  onChange={() => handleCheckboxChange(reason)}
                  className="w-4 h-4"
                />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <CustomButton
            onClick={handleSubmit}
            title="Continue"
            buttonClass="bg-[#FFE000]"
            isButtonClass={true}
            isTitleClass={true}
            titleClass="text-[#040C13] rubik_medium text-[16px]"
            disabled={!selectedReason}
          />
        </div>
      )}
    </>
  );
}

export default ReturnReasonModal;
