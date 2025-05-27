import PaginationComponent from '@/app/_(filter-page)/_components/PaginationComponent';
import EmptySection from '@/components/emptyContainer/EmptySection';
import ProductCard from '@/components/includes/ProductCard';
import { cn } from '@/utils/utils';
import React from 'react';

function ProductSection({ data, paginationData, cardStyle, title,
  isMsiPage = false,
  isAsusPage = false }: {
    data: any,
    paginationData: any, cardStyle?: any,
    isAsusPage?: any,
    isMsiPage?: any,
    title?: any
  }) {
  return (
    <div className='w-full block '>
      {title &&
        <div className='flex items-center justify-center text-[30px] max-mc:text-[25px] max-sm:text-[21px] max-md:font-normal max-md:leading-1 font-bold'>{title ?? ""} </div>
      }

      {data?.length > 0 ? (
        <div className='flex flex-wrap gap-[1%]'>
          {data.map((item: any, index: number) => (
            <ProductCard
              isMsiPage={isMsiPage}
              isAsusPage={isAsusPage}
              key={index}
              data={item}
              className={cn('', cardStyle)}
            />
          ))}
        </div>
      ) : (
        <EmptySection title='No Data Found!' button={false} />
      )}

      {/* Pagination should be inside the main wrapper */}
      <div className='w-full flex justify-center items-center py-4'>
        <PaginationComponent paginationData={paginationData} />
      </div>
    </div>
  );
}

export default ProductSection;
