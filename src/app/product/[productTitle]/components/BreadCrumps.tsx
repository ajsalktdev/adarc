import Link from 'next/link'
import React from 'react'

export default function BreadCrumps({product}:any) {

    console.log(product.name.length,'hhhh')
  return (
    <div className="md:mb-4">
        <p className='flex gap-2 text-[12px] md:text-[14px] rubik_regular  leading-[16px]' ><Link className='text-[12px] md:text-[14px] rubik_regular leading-[16px] text-[#74767C]' href="/">Home  </Link>
        {product?.category_hierarchy?.core_department?.name?.length &&<Link href="/" className="">
                {" "}
                {" / "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.name
                }{" "}
            </Link>}
            {product?.category_hierarchy?.core_department
                        ?.department?.name?.length &&<Link href="/" className="">
                {" "}
                {" / "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.department?.name
                }{" "}
            </Link>}
            {product?.category_hierarchy?.core_department
                        ?.department?.category?.name?.length &&<Link href="/" className="">
                {" "}
                {" / "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.department?.category?.name
                }{" "}
            </Link >}
            {" "}
            {" / "}   {product?.name?.substring(0, 50)}
            {product?.name?.length > 50 && "..."}
        </p>
    {/* <ul className="flex flex-wrap">
        <li className=" text-[12px] md:text-[14px] rubik_regular leading-[16px] text-[#74767C]">
            <Link href="/">Home </Link>
        </li>
    {product?.category_hierarchy?.core_department?.name?.length &&	<li className= "text-[12px] md:text-[14px] rubik_regular  leading-[16px] ml-2">
            <Link href="/" className="">
                {" "}
                {" > "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.name
                }{" "}
            </Link>
        </li>}
        {product?.category_hierarchy?.core_department
                        ?.department?.name?.length && <li className= "text-[12px] md:text-[14px] rubik_regular  leading-[16px] ml-2">
            <Link href="/" className="">
                {" "}
                {" > "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.department?.name
                }{" "}
            </Link>
        </li>}
        {product?.category_hierarchy?.core_department
                        ?.department?.category?.name?.length && <li className= "text-[12px] md:text-[14px] rubik_regular  leading-[16px] ml-2">
            <Link href="/" className="">
                {" "}
                {" > "}{" "}
                {
                    product?.category_hierarchy?.core_department
                        ?.department?.category?.name
                }{" "}
            </Link >
        </li>}
        <li className="ml-2  text-[12px] md:text-[14px] rubik_regular  leading-[16px]">
            {" "}
            {" > "}   {product?.name?.substring(0, 50)}
            {product?.name?.length > 50 && "..."}
        </li>
    </ul> */}
</div>
  )
}
