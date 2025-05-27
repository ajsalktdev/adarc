import React from "react";
import TitleComponent from "@/app/product/[productTitle]/components/TitleComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MegaMenu({ data, section, setActiveMegaMenu, setActiveIndex }: any) {
    return (
        <>
            <div
                onMouseLeave={() => {
                    setActiveMegaMenu(false);
                    setActiveIndex(null)
                }}
                className="bg-white min-w-[672px] max-w-[672px]  min-h-[500px] p-[16px] border-[1.6px] border-solid border-primary_border rounded-br-[6px] rounded-tr-[6px]">
                <div className="flex flex-wrap w-full gap-[16px] items-start">
                    {data?.map((item: any, index: any) => (
                        <div
                            key={index}
                            className="py-[24px] flex flex-col px-[16px] w-[calc(33.33%-16px)]"
                            style={{ height: 'auto' }}
                        >
                            <Link href={`/${section}/${item?.slug}`} className="text-[16px] rubik_semibold text-[black] leading-[24px]">{item?.name}</Link>
                            <div className="w-full mt-[12px] flex flex-col">
                                {item?.categories?.map((list: any, listIndex: number) => (
                                    <Link
                                        key={listIndex}
                                        href={`/${section}/${item?.slug}/${list?.slug}/`}
                                        className="hover:underline block text-[16px] rubik_regular leading-[24px] mb-[12px]"
                                    >
                                        {list?.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
