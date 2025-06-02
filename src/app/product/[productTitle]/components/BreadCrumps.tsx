import Link from "next/link";
import React from "react";

export default function BreadCrumps({ product }: any) {
	console.log(product, "hhhh");
	return (
		<div className="md:mb-4">
			<p className="flex flex-wrap gap-x-1 gap-y-1 text-[12px] md:text-[14px] rubik_regular leading-[16px] break-words line-clamp-1" >
				<Link className="hover:underline" href="/">
					Home
				</Link>
				{product?.category_hierarchy?.core_department?.name?.length && (
					<>
						<span>/</span>
						<Link
							href={`/${product?.category_hierarchy?.core_department?.slug}`}
							className="hover:underline">
							{product?.category_hierarchy?.core_department?.name}
						</Link>
					</>
				)}
				{product?.category_hierarchy?.core_department?.department?.name
					?.length && (
					<>
						<span>/</span>
						<Link
							href={`/${product?.category_hierarchy?.core_department?.department?.slug}`}
							className="hover:underline">
							{
								product?.category_hierarchy?.core_department
									?.department?.name
							}
						</Link>
					</>
				)}
				{product?.category_hierarchy?.core_department?.department
					?.category?.name?.length && (
					<>
						<span>/</span>
						<Link
							href={`/${product?.category_hierarchy?.core_department?.department?.category?.slug}`}
							className="hover:underline">
							{
								product?.category_hierarchy?.core_department
									?.department?.category?.name
							}
						</Link>
					</>
				)}
				<span>/</span>
				<span>
					{product?.name?.substring(0, 50)}
					{product?.name?.length > 50 && "..."}
				</span>
			</p>
		</div>
	);
}
