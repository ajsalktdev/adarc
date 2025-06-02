// 'use client'
// import React from 'react'
// import Icon from '../includes/Icon'
// import { navBarMiddle } from '@/utils/staticUtils';
// // import useStore from '@/store/useStore';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import useZustandStore from '@/store/useStore';
// import searchIcon from '../../../public/assets/icons/search-gray.svg';

// function MiddleRightSection({ setSearchVisble, searchvisible }: any) {
//   const router = useRouter()
//   const userInfo = useZustandStore.getState().userInfo;
//   const { cartlist } = useZustandStore()
//   console.log(cartlist,'cartlistnravba')

//   const filterednavBarMiddle = navBarMiddle
//   .map((item) => {
//     // Hide My Account on small screens
//     if (typeof window !== 'undefined' && window.innerWidth <= 480 && item.label === 'My Account') {
//       return null;
//     }

//     // Replace My Account with Login if not logged in
//     if (item.label === 'My Account' && (!userInfo || !userInfo?.username)) {
//       return {
//         ...item,
//         label: 'Login',
//         route: '/login',
//       };
//     }

//     return item;
//   })
//   .filter(Boolean); // Remove nulls

//   const getTotalCartQuantity = () => {
//     if (!Array.isArray(cartlist)) return 0;
//     return cartlist.reduce((total: number, item: any) => {
//       const qty = typeof item.quantity === 'number' ? item.quantity : 0;
//       return total + qty;
//     }, 0);
//   };

//   return (
//     <div className='flex gap-4 max-sm:gap-3 max-[480px]:gap-2 '>
//       {/* <button className='hidden max-sm:flex justify-center items-center min-w-[26px] h-[26px] '
//         onClick={() => { setSearchVisble(!searchvisible) }}>
//         <Icon src={searchIcon} width={26} height={26} alt="icon" className="min-w-[20px] inline-block" />
//       </button> */}

//       {filterednavBarMiddle?.map((item: any, index) => (
//         <Link aria-label={`go to ${item?.route}`} key={index} className='flex justify-between items-center gap-1' href={item?.route} >
//           <div className='relative'>
//             <Icon src={item?.icon} width={'24px'} height={'24px'} alt="icon" className="min-w-[24px] w-[24px]   inline-block" />
//             {index == 2 && cartlist?.length > 0 && <div className='absolute -top-[14px] left-1   bg-yellow-500 rounded-full w-[15px] h-[15px] flex items-center justify-center'>
//               <span className=' text-white text-[10px] rubik_regular'>
//                 {/* {cartlist?.length} */}
//                 {getTotalCartQuantity()}

//                 </span>
//             </div>}
//           </div>
//           <h5 className='text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]'>{item?.label}</h5>
//         </Link>
//       ))}

//     </div>
//   )
// }

// export default MiddleRightSection

"use client";
import React from "react";
import Icon from "../includes/Icon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useZustandStore from "@/store/useStore";
import Profile from "../../../public/assets/icons/profile.svg";
import ShoppingBag from "../../../public/assets/icons/shoppingBag.svg";
import Cart from "../../../public/assets/icons/cart.svg";

function MiddleRightSection({ setSearchVisble, searchvisible }: any) {
	const router = useRouter();
	const { cartlist, userInfo } = useZustandStore();

	const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

	const getTotalCartQuantity = () => {
		if (!Array.isArray(cartlist)) return 0;
		return cartlist.reduce((total: number, item: any) => {
			const qty = typeof item.quantity === "number" ? item.quantity : 0;
			return total + qty;
		}, 0);
	};

	return (
		<div className="flex gap-4 max-sm:gap-3 max-[480px]:gap-2">
			{/* Conditionally show "My Account" or "Login", hidden on mobile */}
			{!isMobile && (
				<Link
					aria-label="go to my account or login"
					href={
						userInfo && userInfo.username ? "/my-account" : "/login"
					}
					className="flex justify-between items-center gap-1">
					<div className="relative">
						<Icon
							src={Profile}
							width={"24px"}
							height={"24px"}
							alt="icon"
							className="min-w-[24px] w-[24px] inline-block"
						/>
					</div>
					<h5 className="text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]">
						{userInfo && userInfo.username
							? userInfo.first_name.length > 8
								? userInfo.first_name.slice(0, 8) + "..."
								: userInfo.first_name
							: "Login"}
					</h5>
				</Link>
			)}

			{/* Wishlist */}
			<Link
				aria-label="go to wishlist"
				href="/my-account/wishlist"
				className="flex justify-between items-center gap-1">
				<div className="relative">
					<Icon
						src={ShoppingBag}
						width={"24px"}
						height={"24px"}
						alt="icon"
						className="min-w-[24px] w-[24px] inline-block"
					/>
				</div>
				<h5 className="text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]">
					Wishlist
				</h5>
			</Link>

			{/* Cart */}
			<Link
				aria-label="go to cart"
				href="/cartPage"
				className="flex justify-between items-center gap-1">
				<div className="relative">
					<Icon
						src={Cart}
						width={"24px"}
						height={"24px"}
						alt="icon"
						className="min-w-[24px] w-[24px] inline-block"
					/>
					{cartlist?.length > 0 && (
						<div className="absolute -top-[10px] sm:-top-[14px] z-10 left-1 bg-yellow-500 rounded-full w-[15px] h-[15px] flex items-center justify-center">
							<span className="text-white text-[8px] sm:text-[10px] rubik_regular">
								{getTotalCartQuantity()}
							</span>
						</div>
					)}
				</div>
				<h5 className="text-[#fff] max-lg:hidden text-[14px] max-[980px]:text-[13px]">
					Cart
				</h5>
			</Link>
		</div>
	);
}

export default MiddleRightSection;
