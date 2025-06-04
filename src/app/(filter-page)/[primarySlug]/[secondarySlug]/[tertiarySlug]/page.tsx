import React from 'react';

import FilterPage from '@/app/(filter-page)/_components/FilterPage';

function Page({ params, searchParams }: { params: any, searchParams: any }) {

  return (
<div className='min-h-[60vh]'>
   <FilterPage
      params={params}
      searchParams={searchParams} />
  </div>
   


  );
}

export default Page;