"use client"
import Wrapper from '@/components/includes/Wrapper';
import fetchApiData from '@/config/fetch-api-data';
import React, { lazy, useEffect, useState } from 'react';
import ProductSection from '../../_components/ProductSection';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Image2 from '../../../../../public/assets/images/asus/Asus-gaming2-mg2.webp'

function Page() {
  const searchParams = useSearchParams();
  const [paginationData, setPagination] = useState({})
  const [data, setData] = useState<any>(null);
  const page = searchParams.get('page') || 1;

  const getData = async () => {
    const response = await fetchApiData<any>(`products/list-products?categories=powered-by-asus-gaming&page=${page}&per_page=24`);
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
    <Wrapper className='max-xl:pt-[124px] max-mc:px-0 max-md:px-0'>
      <h1 className=' w-full text-[33px] max-lg:text-[30px] max-md:text-[26px] font-semibold mb-4  max-sl:px-1 max-sk:px-[2px]'>Powered by ASUS: Gaming</h1>
      <div className=" w-full  ">
        <div className="">
          <div className="">
            <picture>
              <source
                type="image/webp"
                srcSet="https://adarccomputer.com/media/webp_image/catalog/category/gaming.webp"
              />
              <source
                type="image/png"
                srcSet="https://adarccomputer.com/media/catalog/category/gaming.png"
              />
              <img
                src="https://adarccomputer.com/media/catalog/category/gaming.png"
                alt="Powered by ASUS: Gaming"
                title="Powered by ASUS: Gaming"
                className="image"
              />
            </picture>
          </div>
        </div>

        <div className="max-mc:px-3 max-sl:px-2  max-sk:px-[2px] ">
          <div className="">
            <section className=" text-center py-5">
              <div className="row justify-center">
                <div className="md:w-4/5 mx-auto">
                  <div className=' w-full flex items-center justify-center'>
                    <div className='w-[350px] '>
                      <picture className=''>
                        <source
                          type="image/webp"
                          srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/image_2024_07_08T08_24_15_128Z-1.webp"
                        />
                        <source
                          type="image/png"
                          srcSet="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T08_24_15_128Z-1.png"
                        />
                        <img
                          src="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T08_24_15_128Z-1.png"
                          alt="Powered by ASUS"
                          className="img-fluid mb-4"
                        />
                      </picture>

                    </div>


                  </div>

                  <h2 className="text-red-600 mb-4 text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-semibold max-md:leading-1 font-semibold">
                    Custom PCs with World-class Hardware
                  </h2>
                  <p className="text-gray-600 text-[16px] leading-7 max-sl:leading-6 max-md:text-[14px]" >
                    Powered by ASUS is a global program across more than 40 countries providing the very best customized systems.
                    These tailored rigs feature a best-selling ASUS motherboard and graphics card, with a wide array of industry-leading gaming monitors, routers, CPU coolers, power supplies, chassis, and peripherals available for a seamless fusion of synchronized features and tuned performance.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className='max-mc:px-3 max-sl:px-2  w-full'>
          <ProductSection cardStyle="w-[19%] max-lgs:w-[24%] mb-2 max-mdx:w-[32%] max-sm:w-[49%]" isAsusPage={true} data={data} paginationData={paginationData} />
        </div>
      </div>
      <div className="w-full mt-3">
        <div>
          <Image
            alt="banner"
            src={Image2}
            loading="lazy"
          />

        </div>
      </div>
    </Wrapper>
  );
}

export default Page;
