import React, { useEffect, useRef, useState } from 'react'
import LeftFilterSection from './LeftFilterSection'
import RightcardSection from './RightcardSection'
import fetchApiData from '@/config/fetch-api-data';
import { usePathname, useSearchParams } from 'next/navigation';



function FilterComponents({ params }: { params?: Promise<{ primarySlug?: string; secondarySlug?: string; tertiarySlug?: string }> }) {
  const searchParams = useSearchParams();
  const pathname= usePathname()
  const [sortBy, setSortBy] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState(false)
  const [activeType, setActiveType] = useState<'sort-by' | 'filter'>('filter');
  const [priceData, setPriceData] = useState({
    min_price: "0",
    max_price: "0"
  })
  const [paginationData , setPagination]= useState({})
console.log(paginationData,"paginationDataaaaaaa");

  const [filteredData, setData] = useState<any>(null);
  const [filterList, setListData] = useState<any[] | null>([]);
  const [tempfilterList, setTempListData] = useState<any[] | null>(filterList);
  const [resolvedParams, setResolvedParams] = useState<{ primarySlug?: string; secondarySlug?: string; tertiarySlug?: string }>({});

  const priceFilterRef = useRef<{ applyFilter: () => void } | null>(null);

  useEffect(() => {
    if (params) {
      params.then(resolved => {
        setResolvedParams(resolved);
      });
    }
  }, [params]);

  const generateQueryParams = () => {
    if (!filterList) return '';
    const queryParams: string[] = [];
    // Check if min_price and max_price are not "0" or ""

    if (priceData.min_price !== "0" && priceData.min_price !== "") {
      queryParams.push(`min_price=${priceData?.min_price}`);
    }
    if (priceData.max_price !== "0" && priceData.max_price !== "") {
      queryParams.push(`max_price=${priceData?.max_price}`);
    }

    // Add primary, secondary, and tertiary slug parameters if they exist
  const slugs: string[] = [];

  if (resolvedParams?.primarySlug && resolvedParams.primarySlug !== "search") {
    slugs.push(resolvedParams.primarySlug);
  }
  if (resolvedParams?.secondarySlug) {
    slugs.push(resolvedParams.secondarySlug);
  }
  if (resolvedParams?.tertiarySlug) {
    slugs.push(resolvedParams.tertiarySlug);
  }

  // Add categories only if at least one slug exists
  if (slugs.length > 0) {
    queryParams.push(`categories=${slugs.join(',')}`);
  }


    filterList.forEach((filter) => {
      if (filter.slug !== 'price') {
        const selectedSlugs = filter.filter_data
          .filter((item: any) => item.is_selected)
          .map((item: any) => item.slug)
          .join(',');

        if (selectedSlugs) {
          queryParams.push(`${filter?.slug}=${selectedSlugs}`);
        }
      }
    });

    return queryParams.join('&');
  };

  const queryParams = generateQueryParams();

  const getListData = async () => {
    const response = await fetchApiData<any>(`products/list-filters`);
    setListData(response?.data);
    console.log(response?.data,'filtersssss')
    // setTempListData(response?.data)

  };

  const getData = async () => {
    const queryString = searchParams  ? `${searchParams}&${queryParams}` : `${queryParams}`;
    const response = await fetchApiData<any>(`products/list-products?${queryString}`);
    console.log(response, "response");

    if (response?.status_code === 6000) {
      setData(response?.data);
      setPagination(response?.pagination_data)
    } else if (response.status_code === 6001) {
      setData(null);
      setPagination({})
    }
  };



  const handleApply = () => {
    console.log('Apply button clicked!');
    setListData(tempfilterList)
    setActiveFilter(false);
    if (priceFilterRef.current) {
      priceFilterRef.current.applyFilter();
    }
    // Add any logic here to apply the filter/sort
  };


  useEffect(() => {
    getListData();
  }, []);

  useEffect(() => {
    getData();

  }, [queryParams, searchParams, priceData]);

  useEffect(() => {
    setTempListData(filterList)

  }, [filterList]);

  return (<>

    <div className=''>
   

      <RightcardSection
        filteredData={filteredData}
        filterList={filterList}
        setListData={setListData}
        priceData={priceData}
        setPriceData={setPriceData}
        setSortBy={setSortBy}
        sortBy={sortBy}
        paginationData={paginationData}
      />


    </div>
    
  </>
  )
}

export default FilterComponents
