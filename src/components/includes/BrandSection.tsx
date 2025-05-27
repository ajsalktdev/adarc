import React from 'react'
import RoundSection from './RoundSection'
import fetchApiData from '@/config/fetch-api-data';

const getData = async () => {
  const response = await fetchApiData<any>('products/list-brands/');
  return response;
}

const  BrandSection  = async function () {
const apiData = await getData();
let brands = null;
if (apiData?.status_code === 6000) {
  brands = apiData?.data;
} else {
  brands = null; 
};


  return (
    <div>
    <RoundSection sectionTitle={'Shop by Brands'} data={brands} />
  </div>
  )
}
export default BrandSection;