import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';


function MobileCheckboxSection({

  filter,
  setListData,
  index
}: any) {
  const [showAll, setShowAll] = useState(false);
  const searchParams = useSearchParams();


  const handleCheckboxChange = (slug: string) => {
    // Update the selected state of the clicked checkbox
    const updatedFilterData = filter.filter_data.map((item: any) =>
      item.slug === slug ? { ...item, is_selected: !item.is_selected } : item
    );

    // Update the parent state with the modified filter data
    setListData((prevData: any) =>
      prevData.map((f: any) =>
        f.id === filter.id ? { ...f, filter_data: updatedFilterData } : f
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-4 w-full" >
       {filter?.filter_data?.map((item:any,index:any) => (
        <div
          className="flex justify-between w-full rubik_regular text-[#000000] text-sm"
          key={index}
        >
          <label className="flex p-1 items-center justify-between w-full gap-2"         >
         
            <h6>{item.name}</h6>
            <input
              type="checkbox"
              checked={item?.is_selected || false}
              onChange={() => handleCheckboxChange(item.slug)}
              className="cursor-pointer"
              style={{ height: 18, width: 18 }}
            />
          </label>
        </div>
      ))}


    </div>
  );
}

export default MobileCheckboxSection;
