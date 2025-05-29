'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { accountMenu } from '@/utils/staticUtils';
import Link from 'next/link';

function TopNavigation() {
    const pathname = usePathname();

    return (
        <div className="gap-2 flex-wrap mb-6 max-[850px]:flex hidden">
            {accountMenu?.map((item, index) => (
                <React.Fragment key={index}>
                    {item?.items?.map((route) => {
                        const isActive = pathname === route.route;

                        return (
                            <Link
                                key={route.id}
                                href={route.route}
                                className={`cursor-pointer px-2 max-sk:px-[6px] max-sk:py-[2px] text-[16px] max-sm:text-[14px] max-sk:text-[12px] max-sj:text-[10px] py-1 border border-solid border-gray-700 rounded-full text-sm transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#ffe000] text-black'
                                        : 'bg-white text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                {route.title}
                            </Link>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}

export default TopNavigation;
