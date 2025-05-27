// components/Page.js
"use client"
import Image from 'next/image';
import Link from 'next/link';
import Wrapper from '@/components/includes/Wrapper'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import fetchApiData from '@/config/fetch-api-data';
import ProductSection from '../_components/ProductSection';


export default function Page() {
  const searchParams = useSearchParams();
    const [paginationData, setPagination] = useState({})
    const [data, setData] = useState<any>(null);
    const page = searchParams.get('page') || 1;
    const getData = async () => {
  
      const response = await fetchApiData<any>(`products/list-products?categories=powered-by-asus&page=${page}&per_page=24`);
      console.log(response, "response");
  
      if (response.status_code === 6000) {
        setData(response?.data);
        setPagination(response?.pagination_data)
      } else if (response.status_code === 6001) {
        setData(null);
        setPagination({})
      }
    };
  
    useEffect(() => {
        getData();
    
      }, [searchParams]);
  return (
    <Wrapper className="max-xl:pt-[125px] max-mc:px-4 max-sm:px-2 max-sl:px-1 max-sk:px-[2px]  ">
      <div className="max-[480px]:px-[15px] w-full">
        <div className="mb-8">
          <picture>
            <source
              type="image/webp"
              srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/ssd/1200_612_1.webp"
            />
            <source
              type="image/jpg"
              srcSet="https://adarccomputer.com/media/wysiwyg/ssd/1200_612_1.jpg"
            />
            <img
              src="https://adarccomputer.com/media/wysiwyg/ssd/1200_612_1.jpg"
              alt="Powered by ASUS Banner"
              className="w-full h-auto"
            />
          </picture>
        </div>

        <section className="bg-[#1c1c1c] text-white py-8 rounded-lg ">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Powered by ASUS, Dominate with the best
            </h2>
            <p className="text-lg">
              Powered by ASUS is a global program across more than 40 countries and involves over 500 partners who provide the very best customized systems. These tailored rigs feature a best-selling ASUS motherboard and graphics card, with a wide array of industry-leading gaming monitors, routers, CPU coolers, power supplies, chassis, and peripherals available for a seamless fusion of synchronized features and tuned performance.
            </p>
          </div>
        </section>

        <section className="py-6 ">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/powered-by-asus/powered-by-asus-gaming/"
              className="px-6 py-3 bg-[#4472c4] text-white rounded hover:bg-blue-700 transition"
            >
              Powered by ASUS: Gaming
            </Link>
            <Link
              href="/powered-by-asus/powered-by-content-creation/"
              className="px-6 py-3 bg-[#4472c4] text-white rounded hover:bg-blue-700 transition"
            >
              Powered by ASUS: Content Creation
            </Link>
          </div>
        </section>
      </div>

      <ProductSection 
      isAsusPage={true}
      data={data} paginationData={paginationData} cardStyle="w-[19%] max-lgs:w-[24%] mb-2 max-mdx:w-[32%] max-sm:w-[49%]" title="Available PBA PCs"/>


    </Wrapper>
  );
}
