import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckboxSection({
  filter,
  setListData,
  index
}: any) {
  const [showAll, setShowAll] = useState(false);
  const searchParams = useSearchParams();

  // Determine the checkboxes to display
  const visibleCheckboxes = showAll ? filter.filter_data : filter?.filter_data.slice(0, 2);
  console.log(filter, "filterfsdfsdfds");

  // // Sync checkbox state with URL parameters
  // useEffect(() => {
  //   const currentParam = searchParams.get(filter.slug);
  //   if (currentParam) {
  //     const selectedValues = currentParam.split(',');
  //     const updatedFilterData = filter.filter_data.map((item: any) => ({
  //       ...item,
  //       is_selected: selectedValues.includes(item.slug)
  //     }));

  //     setListData((prevData: any) =>
  //       prevData.map((f: any) =>
  //         f.id === filter.id ? { ...f, filter_data: updatedFilterData } : f
  //       )
  //     );
  //   } else {
  //     // If no URL parameter exists, uncheck all
  //     const updatedFilterData = filter.filter_data.map((item: any) => ({
  //       ...item,
  //       is_selected: false
  //     }));

  //     setListData((prevData: any) =>
  //       prevData.map((f: any) =>
  //         f.id === filter.id ? { ...f, filter_data: updatedFilterData } : f
  //       )
  //     );
  //   }
  // }, [searchParams, filter.slug]);

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
    <div className="flex flex-col gap-4 mt-4 max-h-[300px] overflow-y-scroll" >
      {visibleCheckboxes?.map((item: any, index: any) => (
        <div
          className="flex justify-between rubik_regular  text-[14px] max-md:text-[12px] text-[#000000] text-sm"
          key={index}
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item?.is_selected || false}
              onChange={() => handleCheckboxChange(item.slug)}
              className="cursor-pointer max-md:w-[15px] max-md:h-[15px] h-[18px] w-[18px]"
            // style={{ height: 18, width: 18 }}
            />
            <h6>{item?.name}</h6>
          </div>
          <div className='text-[14px] max-md:text-[12px]'>{item?.count}</div>
        </div>
      ))}

      {filter?.filter_data?.length > 2 && !showAll && (
        <button
          className="text-[#040C13] rubik_regular text-sm underline cursor-pointer flex justify-start"
          onClick={() => setShowAll(true)}
        >
          View more
        </button>
      )}
    </div>
  );
}

export default CheckboxSection;
