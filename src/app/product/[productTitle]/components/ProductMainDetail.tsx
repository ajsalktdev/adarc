import React from 'react'
import SelectionComponent from './SelectionComponent'
import AboutComponent from './AboutComponent'
import Link from 'next/link'
import SpecGlance from './SpecGlance'


export default function ProductMainDetail({ productTitle,product }: any) {
    return (
        <div className='pt-[24px] '>
            <div className='pb-[16px] border-b-[.6px] border-solid border-primary_border'>
               {product?.brand?.name && <div className='mb-[12px]'>
                    <Link href={`/${product?.brand?.slug}?brand=${product?.brand?.slug}`} className='text-link_blue text-[12px] block rubik_medium underline'>
                        {product?.brand?.name}
                    </Link>
                </div>}

                <div className='mb-[8px]'>
                    <h1 className='rubik_semibold text-[18px] md:text-[20px] leading-[24px]'>{product?.name}</h1>
                </div>
                <div className='flex flex-row'>
                    <div className='mr-[8px]'><h6 className='rubik_regular  text-[10px] text-nickel_grey'>Model : {product?.model_name?.name}</h6></div>
                    <div><h6 className='rubik_regular text-nickel_grey text-[10px]'>SKU : {product?.sku}</h6></div>
                </div>
            </div>
            {product?.variants.length >= 1 && <div className=' pb-[16px] border-b-[.6px] border-solid border-primary_border'>
                {product?.variants?.map((item: any) => (
                    <SelectionComponent productTitle={productTitle} title={item?.name} data={item} />
                ))}
            </div>}
            { product?.short_description?.length >= 5 && <div className='py-[16px]  border-b-[.6px] border-solid border-primary_border'>
                <AboutComponent data={product?.short_description} />
            </div>}
           {product?.specs.length >= 1 &&  <div className='hidden md:block py-[16px]'>
                <SpecGlance data={product?.specs} />
            </div>}

        </div>
    )
}
