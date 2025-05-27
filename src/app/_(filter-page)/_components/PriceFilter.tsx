import CustomButton from '@/components/buttons/CustomButton';
import React, { useState } from 'react';

function PriceFilter({ priceData, setPriceData }: any) {
  const { min_price = '', max_price = '' } = priceData;

  const [newMinPrice, setNewMinPrice] = useState(min_price);
  const [newMaxPrice, setNewMaxPrice] = useState(max_price);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) {
      value = ''; 
    }
    setNewMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) {
      value = ''; // Reset if negative
    }
    setNewMaxPrice(value);
  };

  const handleClick = () => {
    const min = parseFloat(newMinPrice);
    const max = parseFloat(newMaxPrice);

    // Validation: max should be greater than min
    if (!isNaN(min) && !isNaN(max) && max <= min) {
      alert('Max price should be greater than Min price.');
      return;
    }

    setPriceData({
      ...priceData,
      min_price: newMinPrice,
      max_price: newMaxPrice,
    });
  };

  return (
    <div className="mt-4">
      <div className="flex gap-4 justify-between">
        <div className="mb-4">
          <input
            type="number"
            id="min_price"
            value={newMinPrice}
            onChange={handleMinChange}
            placeholder="Min"
            className="w-full p-1 border border-[#D0D5DD] border-solid rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-[#4B4B4B] placeholder:font-[500] placeholder:text-[14px] font-rubik"
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            id="max_price"
            value={newMaxPrice}
            onChange={handleMaxChange}
            placeholder="Max"
            className="w-full p-1 border border-[#D0D5DD] border-solid rounded focus:outline-none focus:ring focus:ring-blue-300 placeholder:text-[#4B4B4B] placeholder:font-[500] placeholder:text-[14px] font-rubik"
          />
        </div>
      </div>
      <CustomButton
        onClick={handleClick}
        title="Apply"
        buttonClass=""
        isButtonClass={true}
        isTitleClass={true}
        titleClass="text-[#040C13] rubik_medium text-[16px]"
        disabled={false} // Optional: disable the button while loading
      />
    </div>
  );
}

export default PriceFilter;
