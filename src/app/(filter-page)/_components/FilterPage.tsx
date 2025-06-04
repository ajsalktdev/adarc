import React from 'react';
import Wrapper from '@/components/includes/Wrapper';
import FilterComponents from '../_components/FilterComponents';
import fetchApiData from '@/config/fetch-api-data';

const getFilterData = async (param: any) => {
    console.log('[API] Fetching filters:', `products/list-filters?${param}`);
    const response = await fetchApiData<any>(
        `products/list-filters?categories=${param}`
    );
    return response;
};

// const getProductData = async (filterParam:any, searchParams:any) => {
//     // Create URLSearchParams object
//     const params = new URLSearchParams();
    
//     // Add categories parameter
//     params.append('categories', filterParam);
    
//     // Add all search parameters if they exist
//     if (searchParams && typeof searchParams === 'object') {
//         Object.entries(searchParams).forEach(([key, value]) => {
//             if (value) {
//                 // Handle array values
//                 if (Array.isArray(value)) {
//                     value.forEach(v => params.append(key, v.toString()));
//                 } else {
//                     params.append(key, value.toString());
//                 }
//             }
//         });
//     }

//     const queryString = params.toString();
//     console.log('[API] Fetching products:', `products/list-products?${queryString}`);
    
//     const response = await fetchApiData<any>(
//         `products/list-products?${queryString}`
//     );
//     return response;
// };

// export async function generateMetadata({ params }: { params: Params }) {
//   const { productTitle } = params;
//   const productData = await getProductData(productTitle);

//   const product = productData?.data;

//   return {
//     title: product?.meta_title || product?.name || 'Product',
//     description: product?.meta_description || 'Default description',
//     keywords: product?.meta_keywords || '',
//   };
// }

const FilterPage = async ({ params, searchParams }: { 
    params: { tertiarySlug?: string; secondarySlug?: string; primarySlug: string },
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const { tertiarySlug, secondarySlug, primarySlug } = await params;
    const filterParam = tertiarySlug ?? secondarySlug ?? primarySlug;

    const productData = [];
    const filterData = await getFilterData(filterParam);

    if (filterData?.status_code !== 6000 ) {
        return (
            <Wrapper className=''>
                <div className="text-center py-[48px]">
                    <h1>Product Not Found</h1>
                    <p>Please check the product title or try again later.</p>
                </div>
            </Wrapper>
        );
    }

    return (
        <FilterComponents
            params={params}
            filterData={filterData?.data}
        />
    );
};

export default FilterPage;