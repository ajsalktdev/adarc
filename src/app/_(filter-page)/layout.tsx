"use client"
import Wrapper from "@/components/includes/Wrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LeftFilterSection from "./_components/LeftFilterSection";
import { useEffect, useRef, useState } from "react";
import BottomMobileFilter from "./_components/BottomMobileFilter";
import SortbyMobileFilter from "./_components/SortbyMobileFilter";
import fetchApiData from "@/config/fetch-api-data";
import TopTab from "./_components/TopTab";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [filterList, setListData] = useState<any[] | null>([]);
    const [sortOption, setSortOption] = useState<string | null>(null);
    
    const sortByOptions: any[] = [
        { label: 'A – Z', slug: 'a-to-z' },
        { label: 'Z – A', slug: 'z-to-a' },
        { label: 'Price ↑', slug: 'price-low-to-high' },    
        { label: 'Price ↓', slug: 'price-high-to-low' }, 
      ];

    const [priceData, setPriceData] = useState({
        min_price: "0",
        max_price: "0"
    })
    console.log(filterList, "filterListfilterList");
    const searchParams = useSearchParams();
     const [sortBy, setSortBy] = useState<any>({});
    const router = useRouter(); // initialize router
    const pathname = usePathname();
    const priceFilterRef = useRef<{ applyFilter: () => void } | null>(null);
    const [tempfilterList, setTempListData] = useState<any[] | null>(filterList);
    const [activeFilter, setActiveFilter] = useState(false)

    const [activeType, setActiveType] = useState<'sort-by' | 'filter'>('filter');
    const getListData = async () => {
        // Extract slugs from pathname (assuming format like /category/primarySlug/secondarySlug/tertiarySlug)
        const pathSegments = pathname.split('/');
        const primarySlug = pathSegments[pathSegments.length - 3];
        const secondarySlug = pathSegments[pathSegments.length - 2];
        const tertiarySlug = pathSegments[pathSegments.length - 1];

        // Build categories parameter
        let categoriesParam = '';
        const slugs = [primarySlug, secondarySlug, tertiarySlug].filter(slug => slug && slug !== 'search');
        
        if (slugs.length > 0) {
            categoriesParam = `?categories=${slugs.join(',')}`;
        }
        
        const response = await fetchApiData<any>(`products/list-filters${categoriesParam}`);
        // const response = await fetchApiData<any>(`products/list-filters `);

        let listData = response?.data || [];

        const params = new URLSearchParams(searchParams.toString());

        listData = listData?.map((filter: any) => {
            if (filter.slug !== 'price') {
                const selectedSlugs = params.get(filter.slug)?.split(',') || [];

                const updatedFilterData = filter.filter_data.map((item: any) => ({
                    ...item,
                    is_selected: selectedSlugs.includes(item.slug),
                }));

                return { ...filter, filter_data: updatedFilterData };
            }
            return filter;
        });

        setListData(listData);

        // 👇 Handle price separately
        const minPriceFromUrl = params.get('min_price') || "0";
        const maxPriceFromUrl = params.get('max_price') || "0";

        setPriceData({
            min_price: minPriceFromUrl,
            max_price: maxPriceFromUrl
        });
    };
    const params = new URLSearchParams(searchParams.toString());

    const handleSortClick = (option: { slug: string }) => {
        setSortOption(option.slug);
        setActiveFilter(false);

        // Update URL with sortby parameter
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('sortby', option.slug);  // Set the sortby slug in the URL
        router.push(`${pathname}?${queryParams.toString()}`);
    };
    const handleApply = () => {
        console.log('Apply button clicked!');
        setListData(tempfilterList)
        setActiveFilter(false);
        if (priceFilterRef.current) {
            priceFilterRef.current.applyFilter();
        }
    };
    useEffect(() => {
        setTempListData(filterList)

    }, [filterList]);

    useEffect(() => {
        getListData();
    }, []);
    useEffect(() => {

        const sortby = params.get('sortby');

        if (sortby) {
            setSortOption(sortby);
        }
    }, [searchParams]);

    // NEW useEffect to update the URL when filterList changes
    useEffect(() => {
        if (!filterList) return;

        const queryParams: { [key: string]: string[] } = {};

        filterList.forEach((filter) => {
            if (filter.slug !== 'price') {
                const selectedSlugs = filter.filter_data
                    .filter((item: any) => item.is_selected)
                    .map((item: any) => item.slug);

                if (selectedSlugs.length > 0) {
                    queryParams[filter.slug] = selectedSlugs;
                }
            }
        });

        // Convert queryParams to URLSearchParams
        const params = new URLSearchParams();
        
        // Add grouped parameters
        Object.entries(queryParams).forEach(([key, values]) => {
            params.set(key, values.join(','));
        });

        // Add price filters if needed
        if (priceData.min_price !== "0" || priceData.max_price !== "0") {
            params.set('min_price', priceData.min_price);
            params.set('max_price', priceData.max_price);
        }

        // Add sort option if present
        if (sortOption) {
            params.set('sort', sortOption);
        }

        // Add search query if present
        const q = searchParams.get('q');
        if (q !== null) {
            params.set('q', q);
        }

        const queryString = params.toString();
        router.push(`${pathname}${queryString ? '?' + queryString : ''}`);
    }, [filterList, priceData, sortOption, pathname, router]);

    return (
        <div className='min-h-[80vh]'>
            <Wrapper className='max-sm:px-0 max-sm:pt-[115px]' >
                <div className='w-full flex mt-[12px] max-[680px]:relative'>
                    <LeftFilterSection
                        filterList={filterList}
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
                        {children}
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
    );
}
