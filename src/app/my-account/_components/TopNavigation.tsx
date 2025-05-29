'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { accountMenu } from '@/utils/staticUtils';
import Link from 'next/link';

function TopNavigation() {
    const router = useRouter();
    const pathname = usePathname();

    // Local state to store clicked route temporarily
    const [activePath, setActivePath] = useState<string | null>(null);

    const handleClick = (path: string) => {
        setActivePath(path);
        router.push(path);
    };

    return (
        <div className="gap-2 flex-wrap mb-6 max-[850px]:flex hidden">
            {accountMenu?.map((item, index) => (
                <React.Fragment key={index}>
                    {item?.items?.map((route) => {
                        // Show temporary active state if recently clicked, else check actual path
                        const isActive = activePath === route.route || pathname === route.route;

                        return (
                            <button
                                key={route.id}
                                onClick={() => handleClick(route.route)}
                                className={`cursor-pointer px-2 max-sk:px-[6px] max-sk:py-[2px] text-[16px] max-sm:text-[14px] max-sk:text-[12px] max-sj:text-[10px]  py-1 border border-solid borde-1 border-gray-700  rounded-full text-sm transition-all duration-200 ${
                                    isActive
                                        ? 'bg-[#ffe000] text-black'
                                        : 'bg-white text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                {route.title}
                            </button>
                        );
                    })}
                </React.Fragment>
            ))}
        </div>
    );
}

export default TopNavigation;