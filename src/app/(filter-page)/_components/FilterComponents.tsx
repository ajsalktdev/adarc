
"use client";

import React, { useEffect, useRef, useState } from 'react'
import LeftFilterSection from './LeftFilterSection'
import RightcardSection from './RightcardSection'
import fetchApiData from '@/config/fetch-api-data';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Wrapper from '@/components/includes/Wrapper';
import TopTab from './TopTab';
import SortbyMobileFilter from './SortbyMobileFilter';
import BottomMobileFilter from './BottomMobileFilter';
import FilterPageBreadCrumbs from './FilterPageBreadCrumbs';



function FilterComponents(
  {
    params,
    filterData }:
    {
      params?: any,
      filterData: any,
    }) {
  const searchParams = useSearchParams();
  console.log(searchParams, "searchParamssearchParams");

  const pathname = usePathname()
  const [sortOption, setSortOption] = useState<string | null>(null);
  const router = useRouter(); // initialize router

  const [sortBy, setSortBy] = useState<any>({});
  const [activeFilter, setActiveFilter] = useState(false)
  const [activeType, setActiveType] = useState<'sort-by' | 'filter'>('filter');
  const [priceData, setPriceData] = useState({
    min_price: "0",
    max_price: "0"
  })
  const [paginationData, setPagination] = useState({})
  console.log(paginationData, "paginationDataaaaaaa");

  const [filteredData, setData] = useState<any>(null);
  const [filterList, setListData] = useState<any[] | null>([]);
  const [tempfilterList, setTempListData] = useState<any[] | null>(filterList);
  const [resolvedParams, setResolvedParams] = useState<{ primarySlug?: string; secondarySlug?: string; tertiarySlug?: string }>({});
  console.log(tempfilterList, "tempfilterListtempfilterList");

  const priceFilterRef = useRef<{ applyFilter: () => void } | null>(null);
  const sortByOptions: any[] = [
    { label: 'A – Z', slug: 'a-to-z' },
    { label: 'Z – A', slug: 'z-to-a' },
    { label: 'Price ↑', slug: 'price-low-to-high' },
    { label: 'Price ↓', slug: 'price-high-to-low' },
    { label: 'Old to New', slug: 'old-to-new' },
    { label: 'New to Old', slug: 'new-to-old' },

  ];

  useEffect(() => {
    if (params) {
      params.then((resolved: any) => {
        setResolvedParams(resolved);
      });
    }
  }, [params]);
  const handleSortClick = (option: { slug: string }) => {
    // setSortOption(option.slug);
    setActiveFilter(false);

    // Update URL with sortby parameter
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('sort', option.slug);  // Set the sortby slug in the URL
    router.push(`${pathname}?${queryParams.toString()}`);
  };

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

    // const slugs: string[] = [];

    // if (resolvedParams?.primarySlug && resolvedParams.primarySlug !== "search") {
    //   slugs.push(resolvedParams.primarySlug);
    // }
    // if (resolvedParams?.secondarySlug) {
    //   slugs.push(resolvedParams.secondarySlug);
    // }
    // if (resolvedParams?.tertiarySlug) {
    //   slugs.push(resolvedParams.tertiarySlug);
    // }

    // // Add categories only if at least one slug exists
    // if (slugs.length > 0) {
    //   queryParams?.push(`categories=${slugs.join(',')}`);
    // }

    const slug = resolvedParams?.tertiarySlug ?? resolvedParams?.secondarySlug ??
      (resolvedParams?.primarySlug !== "search" ? resolvedParams.primarySlug : null);


    if (slug) {
      queryParams.push(`categories=${slug}`);
    }

    // filterList?.forEach((filter) => {
    //   if (filter?.slug !== 'price') {
    //     const selectedSlugs = filter?.filter_data.length > 0 && filter?.filter_data?.filter((item: any) => item.is_selected)
    //       .map((item: any) => item?.slug)
    //       .join(',');

    //     if (selectedSlugs) {
    //       queryParams?.push(`${filter?.slug}=${selectedSlugs}`);
    //     }
    //   }
    // });

    return queryParams.join('&');
  };

  const queryParams = generateQueryParams();

  // const getListData = async () => {
  //   const response = await fetchApiData<any>(`products/list-filters`);
  //   setListData(response?.data);
  //   console.log(response?.data, 'filtersssss')
  //   // setTempListData(response?.data)

  // };

  // const getData = async () => {
  //   const queryString = searchParams ? `${searchParams}&${queryParams}` : `${queryParams}`;
  const getData = async () => {
    const params = new URLSearchParams(searchParams.toString()); // clone searchParams
    const extraParams = new URLSearchParams(queryParams); // clone queryParams

    // ✅ Only remove `categories` from queryParams if it exists in both
    if (params.has("categories") && extraParams.has("categories")) {
      extraParams.delete("categories");
    }

    // Merge the rest of the params
    for (const [key, value] of extraParams.entries()) {
      params.set(key, value);
    }

    const queryString = params.toString();
    const response = await fetchApiData<any>(`products/list-products?${queryString}`);
    console.log(response, "response");

    if (response.status_code === 6000) {
      setData(response?.data);
      setPagination(response?.pagination_data)
    } else if (response.status_code === 6001) {
      setData(null);
      setPagination({})
    }
  };



  const handleApply = () => {
    console.log('Apply button clicked!');
    setListData(tempfilterList);
    setActiveFilter(false);

    const currentParams = new URLSearchParams(Array.from(searchParams.entries()));

    tempfilterList?.forEach((group: any) => {
      if (group.type === 'multiple_choice') {
        const selectedSlugs = group.filter_data
          .filter((item: any) => item.is_selected)
          .map((item: any) => item.slug);

        if (selectedSlugs.length > 0) {
          currentParams.set(group.slug, selectedSlugs.join(','));
        } else {
          currentParams.delete(group.slug); // remove if none selected
        }
      }

      // Optionally handle range filters like price here

    });

    // Push to router
    router.push(`?${currentParams.toString()}`, { scroll: false });

    // Optionally trigger price filter logic
    if (priceFilterRef?.current) {
      priceFilterRef.current.applyFilter();
    }
  };


  // useEffect(() => {
  //   getListData();
  // }, []);




  useEffect(() => {
    if (queryParams) {
      getData();

    }

  }, [queryParams, searchParams, priceData]);

  // useEffect(() => {
  //   setTempListData(filterData)

  // }, [params]);

  useEffect(() => {
    if (!filterData || !searchParams) return;

    const updatedFilters = filterData.map((group: any) => {
      const selectedValues = searchParams.get(group.slug)?.split(',') || [];

      const updatedFilterData = group.filter_data.length > 0 && group.filter_data?.map((item: any) => ({
        ...item,
        is_selected: selectedValues.includes(item.slug),
      }));

      return {
        ...group,
        filter_data: updatedFilterData,
      };
    });

    setTempListData(updatedFilters);
    setListData(updatedFilters); // optional if you want to sync this as well
  }, [filterData, searchParams]);

  return (<>
    <div className='min-h-[80vh]'>
      <Wrapper className='max-sm:px-0 max-sm:pt-[115px]' >
        <FilterPageBreadCrumbs />

        <div className='w-full flex mt-[12px] max-[680px]:relative'>
          <LeftFilterSection
            filterList={filterData}
            setListData={setListData}
            priceData={priceData}
            setPriceData={setPriceData}
          />

          <div className="flex-1 max-sm:px-2">
            <TopTab
              filterList={filterList}
              setListData={setListData}
              priceData={priceData}
              setPriceData={setPriceData}
              setSortBy={setSortBy}
              sortBy={sortBy}
              sortByOptions={sortByOptions}
              setSortOption={setSortOption}
            />


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
        </div>
        <div className="w-full hidden max-sm:block max-sm:sticky bottom-0">
          {activeFilter && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setActiveFilter(false)}></div>
          )}

          <div
            className={`relative z-30 transition-all duration-300 ease-in-out rounded-t-[6%] overflow-hidden bg-[#fff] ${activeFilter ? 'max-h-[70vh]' : 'max-h-0'}`}
          >
            <div className='text-center py-3'>{activeType.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</div>

            {activeType === 'sort-by' ? (
              <SortbyMobileFilter
                selectedOption={sortOption}
                setSelectedOption={setSortOption}
                handleClick={handleSortClick}
                sortByOptions={sortByOptions}
                searchParams={searchParams}
              />
            ) : (
              <BottomMobileFilter
                filterList={tempfilterList}
                setListData={setTempListData}
                priceData={priceData}
                setPriceData={setPriceData}
                priceFilterRef={priceFilterRef}
              />
            )}
          </div>

          <div className="w-full flex h-[40px] bg-[#F2F6F8] z-30">
            {!activeFilter ? (
              <>
                <button
                  className="w-[50%] text-center flex items-center justify-center"
                  onClick={() => {
                    setActiveFilter(!activeFilter);
                    setActiveType('sort-by');
                  }}
                >
                  SORT
                </button>

                <button
                  className="w-[50%] text-center flex items-center justify-center"
                  onClick={() => {
                    setActiveFilter(!activeFilter);
                    setActiveType('filter');
                  }}
                >
                  FILTER
                </button>
              </>
            ) : (
              <>

                {
                  activeType === 'sort-by' ?
                    <button
                      className="w-[100%] bg-[#F2F6F8] z-30 text-center flex items-center justify-center"
                      onClick={() => {
                        setActiveFilter(false);
                        setActiveType('sort-by');
                      }}
                    >
                      CLOSE
                    </button>
                    :
                    <>

                      <button
                        className="w-[50%] bg-[#F2F6F8] z-30 text-center flex items-center justify-center"
                        onClick={() => {
                          setActiveFilter(false);
                          setActiveType('sort-by');
                        }}
                      >
                        CLOSE
                      </button>

                      <button
                        className="w-[50%] bg-[#F2F6F8] z-30 text-center flex items-center justify-center"
                        onClick={handleApply}
                      >
                        APPLY
                      </button>
                    </>

                }
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </div>

  </>
  )
}

export default FilterComponents
