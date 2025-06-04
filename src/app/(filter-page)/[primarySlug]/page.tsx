import React from 'react';

import FilterPage from '../_components/FilterPage';

function Page({ params, searchParams }: { params: any, searchParams: any }) {
  const sortValue = searchParams?.url?.search;
  console.log(sortValue, "sortValue");

  console.log(sortValue, "urlParamsurlParams");



  return (
    <div className='min-h-[60vh]'>
      <FilterPage
        params={params}
        searchParams={searchParams} />
    </div>


  );
}

export default Page;
