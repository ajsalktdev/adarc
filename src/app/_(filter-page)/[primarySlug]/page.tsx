"use client";
import React from 'react';

import Wrapper from '@/components/includes/Wrapper';
import FilterComponents from '../_components/FilterComponents';

function Page({params}:{params:any}) {
  
  return (

      <FilterComponents params={params}/>
   
  
  );
}

export default Page;
