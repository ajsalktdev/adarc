"use client"

import Wrapper from '@/components/includes/Wrapper';
import fetchApiData from '@/config/fetch-api-data';
import React, { useEffect, useState } from 'react';
import ProductSection from '../../_components/ProductSection';
import { useSearchParams } from 'next/navigation';

function Page() {
  const searchParams = useSearchParams();
  const [paginationData, setPagination] = useState({})
  const [data, setData] = useState<any>(null);
  const page = searchParams.get('page') || 1;
  const getData = async () => {

    const response = await fetchApiData<any>(`products/list-products?categories=powered-by-asus-content-creation&page=${page}&per_page=24`);
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

    <Wrapper className='max-xl:pt-[120px] max-mc:px-4 max-sm:px-2 max-sl:px-1 max-sk:px-[2px]'>
      <h1 className='max-[480px]:px-[15px] w-full text-[33px] max-lg:text-[30px] max-md:text-[26px] font-semibold mb-4 '>Powered by ASUS: Content Creation</h1>
      <div className="page-main">
        <div className="category-image">
          <picture>
            <source
              type="image/webp"
              srcSet="https://adarccomputer.com/media/webp_image/catalog/category/creater.webp"
            />
            <source
              type="image/png"
              srcSet="https://adarccomputer.com/media/catalog/category/creater.png"
            />
            <img
              src="https://adarccomputer.com/media/catalog/category/creater.png"
              alt="Powered by ASUS: Content Creation"
              title="Powered by ASUS: Content Creation"
              className="w-full h-auto object-cover"
            />
          </picture>
        </div>
      </div>

      {/* Content Section */}
      <div className="page-main">
        <section className="container mx-auto text-center py-10 ">
          <div className="flex justify-center">
            <div className="w-full flex flex-col items-center max-w-4xl px-4">
              <div className='w-[350px]'>
                <picture className=''>
                  <source
                    type="image/webp"
                    srcSet="https://adarccomputer.com/media/webp_image/wysiwyg/image_2024_07_08T09_16_30_431Z-1.webp"
                  />
                  <source
                    type="image/png"
                    srcSet="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T09_16_30_431Z-1.png"
                  />
                  <img
                    src="https://adarccomputer.com/media/wysiwyg/image_2024_07_08T09_16_30_431Z-1.png"
                    alt="Powered by ASUS"
                    className="w-full h-auto mb-6"
                  />
                </picture>
              </div>

              <h2 className="text-gray-600 mb-4 text-[35px] max-mc:text-[30px] max-sm:text-[25px] max-md:font-semibold max-md:leading-1 font-semibold">
                Custom PCs to Fuel Your Creativity
              </h2>
              <p className="text-gray-600 text-[16px] leading-7 max-sl:leading-6 max-md:text-[14px]">
                A spark of inspiration can breathe life into a concept that leads to a masterpiece. Powered by ASUS is a global program across more than 40 countries and involves over 500 partners who provide the very best customized systems. Custom creator workstations feature award-winning ProArt motherboards, graphics cards, CPU coolers and chassis, paired with ProArt displays to accelerate your creative workflow and bring the boldest visions and ideas to life.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className='max-mc:px-3 max-sl:px-2  w-full'>
        <ProductSection cardStyle="w-[19%] max-lgs:w-[24%] mb-2 max-mdx:w-[32%] max-sm:w-[49%]" isAsusPage={true} data={data} paginationData={paginationData} />
      </div>
    </Wrapper>
  );
}

export default Page;
