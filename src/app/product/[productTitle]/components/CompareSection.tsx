"use client";
import ProductCard from '@/components/includes/ProductCard';
import React, { useState } from 'react';
import Products from '../../../../data.json';
import CustomButton from '@/components/buttons/CustomButton';
import RightIcon from '../../../../public/assets/icons/vector_black.svg';

function CompareSection() {
    const data = [
        { label: 'Display Type', values: ['LED', 'other', 'LED', 'other'] },
        { label: 'Resolution', values: ['1080p', '720p', '4K', '1080p'] },
        { label: 'Refresh Rate', values: ['60Hz', '120Hz', '144Hz', '60Hz'] },
        { label: 'Size', values: ['32 inch', '24 inch', '27 inch', '32 inch'] },
        { label: 'Display Type', values: ['LED', 'other', 'LED', 'other'] },
        { label: 'Resolution', values: ['1080p', '720p', '4K', '1080p'] },
        { label: 'Refresh Rate', values: ['60Hz', '120Hz', '144Hz', '60Hz'] },
        { label: 'Size', values: ['32 inch', '24 inch', '27 inch', '32 inch'] },
    ];

    const [showAll, setShowAll] = useState(false);

    const handleClick = () => {
        setShowAll(!showAll);
    };

    return (
        <div className="w-full">
            <table className="w-full ">
                <thead>
                    <tr>
                        {Products?.product.slice(0, 4).map((data: any, index: number) => (
                            <th key={index} className="min-w-1/6 w-1/6 pr-[10px] min-h-[330px]">
                                <ProductCard key={index} data={data} MoreItems={true} className="" />
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {(showAll ? data : data.slice(0, 4)).map((row, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="text-[Text_BLACK] opensans_semibold text-[16px] pt-5 pb-1">{row.label}</td>
                            </tr>
                            <tr className="bg-[#F1F9FF] rounded-[4px]">
                                {row.values.map((value, idx) => (
                                    <td key={idx} className="p-[6px] rubik_regular text-[14px]">{value}</td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            <CustomButton
                onClick={handleClick}
                title={showAll ? "Show Few Specs" : "Show More Specs"}
                rightIcon={RightIcon}
                isRightICon={true}
                isTitle={true}
                rotateIcon={showAll}
                isButtonClass={true}
                titleClass="text-dark_charcoal text-[14px] rubik_medium"
                buttonClass="bg-light_grey hover:bg-grey mt-6 transition duration-200"
            />
        </div>
    );
}

export default CompareSection;
