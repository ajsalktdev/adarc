import { getIcon } from '@/components/image/Icon';
import { useSearchParams, useRouter, usePathname, useParams } from 'next/navigation';
import React from 'react';
import FilterDropdown from '@/components/input/FilterDropdown';

function TopTab({ priceData, sortByOptions, setPriceData, setSortBy, sortBy, filterList, setListData }: any) {
    const searchParams = useSearchParams();
    const params = useParams()
    const router = useRouter();
    const pathname = usePathname();

    const removeFilter = (key: string, slug: string) => {
        const params = new URLSearchParams(searchParams.toString());

        const currentValues = params.get(key)?.split(',') || [];
        const newValues = currentValues.filter(v => v !== slug.toLowerCase());

        if (newValues.length > 0) {
            params.set(key, newValues.join(','));
        } else {
            params.delete(key);
        }

        // Update URL using Next.js router
        const newUrl = `${pathname}${params.toString() ? '?' + params.toString() : ''}`;
        router.push(newUrl);

        // Update filterList to uncheck the corresponding checkbox
        if (filterList) {
            const updatedFilterList = filterList.map((filter: any) => {
                if (filter.slug === key) {
                    return {
                        ...filter,
                        filter_data: filter.filter_data.map((item: any) => ({
                            ...item,
                            is_selected: item.slug === slug ? false : item.is_selected
                        }))
                    };
                }
                return filter;
            });
            setListData(updatedFilterList);
        }
    };

    const removePathFilter = (path: string) => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPathSegments = pathSegments.filter(segment =>
            segment.toLowerCase() !== path.toLowerCase()
        );

        if (newPathSegments.length === 0) {
            router.push('/');
            return;
        }

        const newPath = `/${newPathSegments.join('/')}`;
        router.push(newPath);
    };

    const formatSearchParams = (searchParams: any): { key: string; value: string }[] => {
        if (!searchParams) return [];

        // Get all entries from URLSearchParams
        const entries = Array.from(new URLSearchParams(searchParams).entries());

        // Group entries by key
        const groupedEntries = entries.reduce((acc: { [key: string]: string[] }, [key, value]) => {
            if (key === 'q' || key === 'page' || key === 'min_price' || key === 'max_price') {
                return acc;
            }

            if (!acc[key]) {
                acc[key] = [];
            }
            // Split by comma in case there are already comma-separated values
            acc[key].push(...value.split(','));
            return acc;
        }, {});

        // Convert grouped entries to the required format
        return Object.entries(groupedEntries).flatMap(([key, values]) =>
            values.map(value => ({
                key,
                slug: value,
                value: value
                    .replace(/[_-]/g, ' ')
                    .trim()
                    .replace(/\b\w/g, (char) => char.toUpperCase())
            }))
        );
    };

    const formattedParams = formatSearchParams(searchParams?.toString());
    const pathSegments = pathname
        .split('/')
        .filter(Boolean)
        .filter(segment => {
            const segmentStr = Array.isArray(segment) ? segment[0] : segment;
            const primarySlugStr = Array.isArray(params?.primarySlug) ? params.primarySlug[0] : params?.primarySlug;
            return segmentStr.toLowerCase() !== 'search' &&
                segmentStr.toLowerCase() !== primarySlugStr?.toLowerCase();
        });

    const formatHeading = (slug: string | string[]) => {
        const slugStr = Array.isArray(slug) ? slug[0] : slug;
        return slugStr
            .replace(/[-_]/g, ' ') // replace - or _ with space
            .split(' ') // split into words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
            .join(' ');
    };

    const getSlugValue = (slug: string | string[] | undefined) => {
        if (!slug) return null;
        return Array.isArray(slug) ? slug[0] : slug;
    };

    const heading = (() => {
        const tertiary = getSlugValue(params?.tertiarySlug);
        if (tertiary) return formatHeading(params.tertiarySlug as string | string[]);

        const secondary = getSlugValue(params?.secondarySlug);
        if (secondary) return formatHeading(params.secondarySlug as string | string[]);

        const primary = getSlugValue(params?.primarySlug);
        if (primary && primary !== 'search') return formatHeading(params.primarySlug as string | string[]);

        return null;
    })();

    return (<div className=''>
        <div>
            {
                heading && <h1>{heading}</h1>
            }
        </div>

        <div className="flex justify-between py-3 max-sm:py-2 max-sk:py-1">
            <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Display path segments as separate filters */}
                    {/* {!pathname.includes('/search') && pathSegments.map((segment, index) => (
                        <div
                            key={`path-${index}`}
                            className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                        >
                            <div className='truncate max-w-[150px] text-[14px]'>{segment.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</div>
                            <button onClick={() => removePathFilter(segment)}>
                                {getIcon({ icon: "close_icon", className: "w-[8px] min-w-[8px]" })}
                            </button>
                        </div>
                    ))} */}

                    {/* Display formatted URL parameters */}
                    {formattedParams?.map((param: any, index: number) => (
                        <div
                            key={`${param.key}-${param.value}-${index}`}
                            className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1"
                        >
                            <div className='truncate max-w-[150px] text-[14px]'>{param.value}</div>
                            <button onClick={() => removeFilter(param.key, param?.slug)}>
                                {getIcon({ icon: "close_icon", className: "w-[8px] min-w-[8px]" })}
                            </button>
                        </div>
                    ))}

                    {/* Display price filters */}
                    {priceData?.min_price !== "0" && priceData?.min_price !== "" && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div className='truncate max-w-[150px] text-[14px]'>Min Price: {priceData?.min_price} AED</div>
                            <button onClick={() => setPriceData({ ...priceData, min_price: "0" })}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px] min-w-[8px]' })}
                            </button>
                        </div>
                    )}

                    {/* {priceData?.max_price !== "0" && priceData?.max_price !== "" && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div className='truncate max-w-[150px] text-[14px] '>Max Price: {priceData?.max_price} AED</div>
                            <button onClick={() => setPriceData({ ...priceData, max_price: "0" })}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px] min-w-[8px]' })}
                            </button>
                        </div>
                    )} */}
                    {searchParams.get("min_price") && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div className='truncate max-w-[150px] text-[14px] '>Min Price: {searchParams.get("min_price")} AED</div>
                            <button onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("min_price");
                               
                                const newUrl = `${pathname}?${params.toString()}`;
                                router.push(newUrl);
                            }}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px] min-w-[8px]' })}
                            </button>
                        </div>
                    )}

                    {searchParams.get("max_price") && (
                        <div className="flex h-[28px] rounded-[6px] items-center justify-center gap-2 bg-[#EEEEEE] px-2 py-1">
                            <div className='truncate max-w-[150px] text-[14px] '>Max Price: {searchParams.get("max_price")} AED</div>
                            <button onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("max_price");
                                
                                const newUrl = `${pathname}?${params.toString()}`;
                                router.push(newUrl);
                            }}>
                                {getIcon({ icon: 'close_icon', className: 'w-[8px] min-w-[8px]' })}
                            </button>
                        </div>
                    )}

                </div>
            </div>
            <div className='w-[160px] min-w-[150px] max-sm:hidden'>
                <FilterDropdown
                    setOption={setSortBy}
                    options={sortByOptions}
                    selectedOption={sortBy}
                    title="Sort by"
                />
            </div>
        </div>
    </div>);
}

export default TopTab;
