import React from 'react'
import Image from 'next/image';
import Image1 from "../../../../public/temp/4.png"

function CircleImageSection() {
    const imageItems = [
        { id: 1, src: Image1, label: 'windows Laptop' },
        { id: 2, src: Image1, label: 'Macbook' },
        { id: 3, src: Image1, label: 'Gaming laptop' },
        { id: 4, src: Image1, label: 'Touch screen Laptop' },
        { id: 5, src: Image1, label: 'Gaming laptop' },


    ];
  return (
    <div className=" flex gap-2 border-y-[1px] py-4 border-solid border-primary_border ">
            {imageItems.map(item => (
                <div key={item.id} className="flex flex-col items-center  w-[96px]">
                    <div className="w-[72px] h-[72px] rounded-[50%] border border-solid border-[#C5CBD5] flex justify-center items-center">
                        <div className="w-[32px] flex justify-center items-center">
                            <Image src={item.src} width={100} height={100} alt="banner" />
                        </div>
                    </div>
                    <div className='text-[#1D252C] text-center w-full rubik_medium'>{item.label}</div>
                </div>
            ))}
        </div>
  )
}

export default CircleImageSection
