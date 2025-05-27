import React, { useState } from 'react';

type Option = {
  label: string;
  slug: string;
};


const SortbyMobileFilter: React.FC<any> = ({ handleClick,sortByOptions, setSelectedOption, selectedOption  }:any) => {



  return (
    <div className="w-full p-3">
      {sortByOptions.map((option:any, index:any) => (
        <button
          key={index}
          className={`px-2 text-left w-full p-1 text-[14px] flex justify-between rubik_normal text-[#1D252C] hover:bg-gray-100 ${
            selectedOption === option.slug ? 'bg-gray-200' : 'bg-transparent'
          }`}
          onClick={() => handleClick(option)}
        >
          {option.label}
          <input
            type="radio"
            name="sortFilter"
            value={option.slug}
            checked={selectedOption === option.slug}
            className="form-radio w-4 h-4 text-blue-500"
          />
        </button>
      ))}
    </div>
  );
};

export default SortbyMobileFilter;
