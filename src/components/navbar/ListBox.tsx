import React from 'react';
import { useRouter } from 'next/navigation';
import EmptySection from '../emptyContainer/EmptySection';


type ListBoxProps = {
    setModal:any;
    setSearch:any;
    listData: {
        slug: string;
        name: string;
        price_details?: { current_price: number };
        stock_status?: { status: string };
        primary_attachment:any
    }[];
};

function ListBox({ listData,setModal,setSearch }: ListBoxProps) {
    const router = useRouter();

    return (
        <div className="w-full flex flex-col  px-2 py-1">
            {listData?.length > 0 ? listData?.map((item, index) => (
                <div
                    key={index}
                    className={`py-2 px-1 flex  gap-3 hover:bg-gray-100 hover:cursor-pointer ${index !== listData.length - 1 ? 'border-b border-solid border-primary_border' : ''
                        }`}
                        onClick={() => {
                            router.push(`/product/${item.slug}`);
                            setModal(false);
                            setSearch("");
                            
                        }}
                >
                    <div className='min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] flex justify-center items-baseline'>
                        <img src={item?.primary_attachment} alt='image' />
                    </div>
                    <div className=''>
                        <div className="rubik_medium text-[12px]">{item?.name}</div>
                        <div className="text-[#CE1C18] rubik_medium text-[12px] mt-1">
                            AED {item.price_details?.current_price ?? 'N/A'}
                        </div>
                    </div>
                </div>
                
            )):
                      <EmptySection title={'No Data Found!'} button={false}/>
            
            }
        </div>
    );
}

export default ListBox;
