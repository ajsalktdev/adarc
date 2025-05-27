import React from 'react';

import Wrapper from '@/components/includes/Wrapper';
import FilterPage from '../_components/FilterPage';

function Page({params , searchParams}:{params:any,searchParams:any}) {
   const sortValue = searchParams?.url?.search;
  console.log(sortValue, "sortValue");

  console.log(sortValue,"urlParamsurlParams");
  
  
  
  return (

      <FilterPage params={params}  searchParams={sortValue}/>
   
  
  );
}

export default Page;
