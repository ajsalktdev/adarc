'use client';

import CustomButton from '@/components/buttons/CustomButton';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function PriceFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [newMinPrice, setNewMinPrice] = useState('');
  const [newMaxPrice, setNewMaxPrice] = useState('');

 useEffect(() => {
  const minFromUrl = searchParams.get('min_price');
  const maxFromUrl = searchParams.get('max_price');

  setNewMinPrice(minFromUrl ?? '');  // if null, set to ''
  setNewMaxPrice(maxFromUrl ?? '');
}, [searchParams]);


  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) value = '';
    setNewMinPrice(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (parseFloat(value) < 0) value = '';
    setNewMaxPrice(value);
  };

  const handleClick = () => {
    const min = parseFloat(newMinPrice);
    const max = parseFloat(newMaxPrice);

    if (!isNaN(min) && !isNaN(max) && max <= min) {
      alert('Max price should be greater than Min price.');
      return;
    }

    const params = new URLSearchParams(Array.from(searchParams.entries()));

    if (newMinPrice) {
      params.set('min_price', newMinPrice);
    } else {
      params.delete('min_price');
    }

    if (newMaxPrice) {
      params.set('max_price', newMaxPrice);
    } else {
      params.delete('max_price');
    }

    router.push(`?${params.toString()}`, { scroll: false });
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
        disabled={false}
      />
    </div>
  );
}

export default PriceFilter;
