import Image from 'next/image'
import React, { useState } from 'react'
import PriceComponent from './PriceComponent'
import UnderLinedButton from '../buttons/UnderLinedButton'
import Strings from '../../utils/string'
import QuantityButton from '../buttons/QuantityButton'
import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent'
import Tick_icon from "../../../public/assets/icons/tick_blue.svg"
import { cn } from '@/utils/utils'
import postApiData from '@/config/post-api-data'
import RatingReviewModal from '@/app/my-account/_components/RatingReviewModal'
import Modal from '../modal/Modal'
import Cookies from 'js-cookie';
import { select_border_grey } from '../../../colors.config'
import ReturnReasonModal from '@/app/my-account/_components/ReturnReasonModal'
import CancelModal from '@/app/my-account/_components/CancelModal'

import ReturnPaymentModal from '@/app/my-account/_components/ReturnPaymentModal'
import StarRatings from 'react-star-ratings'
import { MdDeleteForever, MdOutlineDelete } from 'react-icons/md'

interface ApiResponse<T> {
    status_code: number;
    data: T | null;
    message?: string;
}


export default function LargeCard({ ischeckOut, isSelectedItems, setSelectedItems, moveItem, isRefresh, setRefresh, getList, removeItem, isCart = false, wishlist = false, product, cart = false, onClick, myOrder = false, myReviews = false }: any) {
    console.log(product, "productproductproductproduct");

    const [isratingModal, setRatingModal] = useState(false)
    console.log(isratingModal, "isratingModal");

    const [isLoading, setLoader] = useState(false)
    const [quantity, setQuantity] = useState<any>(product?.quantity || 1);
    const [returnModal, setReturnModal] = useState<any>(false)
    const [cancelModal, setCancelModal] = useState<any>(false)



    const incrementCount = async (e: any) => {
        setLoader(true)
        e.stopPropagation();
        const updatedQuantity = quantity + 1;
        setQuantity(updatedQuantity);
        await addtoCart(updatedQuantity);
    };

    const decrementCount = async (e: any) => {
        e.stopPropagation();
        if (quantity > 1) {
            const updatedQuantity = quantity - 1;
            setQuantity(updatedQuantity);
            await addtoCart(updatedQuantity);
        }
    };

    const addtoCart = async (count?: any) => {
        setLoader(true);
        console.log(product?.product?.slug, 'slug', count, 'quantity')
        try {

            const response = await postApiData<ApiResponse<any>>(
                `carts/add-cart-item/nanotech-asus-cpu-blue-128gb/`,
                {
                    quantity: count,
                    sku_code: product.sku,
                },
                undefined,
                true
            );
            console.log(response, "response===")
            if (response?.status_code === 6000) {
                Cookies.set("cart_id", response?.data?.cart_id, { path: '/', secure: true, sameSite: 'Strict' });

                setRefresh(!isRefresh)

                console.log("Item added to cart successfully!", response);
            } else {
                console.error("Failed to add item to cart:", response?.message);
            }
        } catch (error) {
            console.error("An error occurred while adding to cart:", error);
        } finally {
            setTimeout(() => {
                setLoader(false);

            }, 500);
        }
    };

    const orderData = [{ status: "active", updated_at: "2025-01-12T11:35:11.013071Z" }, { status: "pending", updated_at: "2025-01-12T11:35:11.013071Z" }]

    return (
        <>
            <Modal isOpen={isratingModal} onClose={() => setRatingModal(false)} className='w-[530px] p-8'>
                <RatingReviewModal product={product} setRatingModal={setRatingModal} />
            </Modal>

            <Modal isOpen={returnModal} onClose={() => setReturnModal(false)} className=' p-8'>
                <ReturnReasonModal
                    product={product} />
            </Modal>
            <Modal isOpen={cancelModal} onClose={() => setCancelModal(false)} className=' p-8'>
                <CancelModal
                    product={product}
                    onClose={() => setCancelModal(false)} />
            </Modal>

            <div onClick={onClick} className={cn('relative  cursor-pointer block w-[100%] mt-[12px]  max-lg:mt-0 py-[16px] border-t border-solid border-Platinum hover:opacity-[0.9]', myReviews && 'mt-0, border-0 opacity-[1] py-0', myOrder && 'mt-0, border-0 opacity-[1] py-0', ischeckOut && 'border border-solid rounded-[4px] px-3 py-2')} >

                <div className={cn('items-start  py-[16px] w-[100%] flex lg:flex-row flex-col justify-between ', ischeckOut && 'py-0 items-center')}>
                    <div className={cn('flex flex-row max-sm:flex-col lg:w-[71.42%] ', ischeckOut && 'items-center')}>
                        <div className='w-[96px] h-[104px] min-w-[96px] max-sm:self-center flex   justify-center items-center'>
                            <Image src={product?.product?.primary_attachment} width={100} height={100} className='contain-content' alt='productImage' loading='lazy' />
                        </div>
                        <div className={cn('sm:mx-[16px] w-[100%]  flex flex-col justify-between', ischeckOut ? 'h-auto' : '')}>
                            <div className=''>
                                <h1 className='rubik_medium lg:text-[16px] md:text-[14px] text-[12px] leading-[20px] md:leading-[24px] text-start text-[shadow_gray]'>
                                    {product?.product?.name}
                                </h1>
                                {ischeckOut && <h1 className='rubik_medium text-[14px] mk:text-[16px] leading-[24px] text-start text-[shadow_gray]'>
                                    quantity : {product?.quantity}
                                </h1>}
                            </div>
                            {myOrder &&
                                <div className='flex flex-col w-full'>
                                    <div className='flex mb-2'>
                                        <div className='mr-3 items-center flex'><UnderLinedButton className='no-underline' title={Strings.button.reOrder} /></div>
                                        {
                                            product?.current_status === "completed" && <div><UnderLinedButton className='text-tang_blue' title={Strings.button.rateReview} onClick={(e: any) => {
                                                e.stopPropagation(); // Prevents parent div onClick from triggering
                                                setRatingModal(true); // Open the rating modal
                                            }} /></div>
                                        }
                                    </div>
                                    {
                                        product?.current_status &&
                                        <div className='text-[#717171] p-3 my-3 w-[50%] max-[480px]:w-[100%]   rounded-[6px] text-[14px] rubik_regular text-center border border-solid border-[#0000003B]'>
                                            {product?.current_status}
                                        </div>
                                    }
                                    {product?.return_policy_end_date &&
                                        <div className='text-[#717171] rubik_regular text-[14px]'>Return policy ends on {product?.return_policy_end_date}</div>
                                    }

                                    {product?.order_history.length > 0 &&
                                        product?.order_history?.map((order: any, index: any) => (
                                            <div key={index} className='w-full flex gap-2 '>
                                                <div className='flex flex-col justify-between items-center'>
                                                    <div className='w-[20px] h-[20px]'>
                                                        <Image src={Tick_icon} alt='tick icon' />
                                                    </div>
                                                    {index !== product?.order_history?.length - 1 && (
                                                        <div className='flex-1 w-[1px] border border-[#E2E4E5] border-solid'></div>
                                                    )}


                                                </div>
                                                <div >
                                                    <h5 className='rubik_regular text-[12px] text-[#222222]'>
                                                        {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
                                                    </h5>
                                                    <p className='text-[#717171] rubik_regular text-[10px] mb-5'>
                                                        {new Date(order?.updated_at).toLocaleString('en-GB', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                            day: '2-digit',
                                                            month: 'long',
                                                            year: 'numeric',
                                                        })}
                                                    </p>
                                                </div>


                                            </div>
                                        ))
                                    }
                                </div>
                            }

                            {!ischeckOut && <div><TitleComponent title={product?.product?.stock_status?.status == 'not available' ? 'out of stock' : 'In stock'} titleClass={product?.product?.stock_status?.status == 'not available' ? 'text-error_red' : 'text-avail_green'} /></div>
                            }                            {/* )} */}
                        </div>
                    </div>
                    <div className=' flex justify-end max-lg:w-full  items-center '>
                        <div className='max-lg:mt-[-60px]'>
                            <PriceComponent
                                isHome={false}
                                badge={product?.product?.badge}
                                data={product?.product?.price_details}
                                isOffer={!myOrder ? true : false} />
                        </div>


                        {
                            (myOrder && product?.current_status !== "closed") && <div className='absolute bottom-[10px] '>
                                <div className='flex gap-3 text-[16px] rubik_regular '>

                                    {
                                        (product?.is_return_available)
                                        &&
                                        <>
                                            <button className='text-[#222222] underline'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setReturnModal(true);
                                                }}
                                            >
                                                Return Product
                                            </button>

                                        </>

                                    }   {

                                        (product?.current_status !== "shipped") &&
                                        <button className='text-[#C73E1D] underline'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCancelModal(true);
                                            }}
                                        >
                                            Cancel
                                        </button>

                                    }

                                    {
                                        (product?.current_status === "delivered") &&
                                        <button className='text-[#222222] underline'>Invoice</button>

                                    }
                                </div>
                            </div>
                        }
                    </div>
                </div>
                {
                    myReviews && <div className='w-full border-t border-solid border-Platinum py-2'>
                        <div className='w-full flex flex-col'>
                            <div className='w-full flex justify-between mt-2'>
                                <div className='rubik_medium text-[16px] text-[#1d252c]'>{product?.title}</div>
                                <div>
                                    <StarRatings
                                        rating={product?.rating || 0} // Ensure rating is always a number
                                        starRatedColor="gold"
                                        starEmptyColor="#ddd"
                                        numberOfStars={5}
                                        starDimension="20px"
                                        starSpacing="1px"
                                    />

                                </div>

                            </div>
                            <div className='rubik_regular mt-2 text-[12px]'>{product?.review}</div>
                        </div>
                        <div className='flex justify-end gap-2 mt-2'>
                            <button className='underline' >
                                Remove
                            </button>
                            <button className='underline'
                                onClick={(e: any) => {
                                    e.stopPropagation(); // Prevents parent div onClick from triggering
                                    setRatingModal(true); // Open the rating modal
                                }}>
                                Edit
                            </button>
                        </div>

                    </div>
                }

                {!myOrder && !myReviews && <div className='flex flex-row items-end justify-end gap-[20px] sk:gap-[40px] '>

                    {!wishlist && !ischeckOut && <div>
                        <UnderLinedButton onClick={(e: any) => { e.stopPropagation(); moveItem() }} title={!wishlist ? Strings.button.moveToWishlist : Strings.button.moveToCart} />
                    </div>}

                    {!ischeckOut && <div className='flex'>
                        <button className='flex' onClick={(e: any) => { e.stopPropagation(); removeItem() }}><MdDeleteForever color='red' size={20} />
                        </button>
                        {/* <UnderLinedButton title={Strings.button.remove} /> */}
                    </div>}
                    {product?.inStock && <div>

                        <UnderLinedButton onClick={(e: any) => { e.stopPropagation() }} title={wishlist ? Strings.button.addCart : Strings.button.saveLater} />
                    </div>}
                    {!wishlist && !ischeckOut && product?.product?.stock_status?.status != 'not available' &&
                        <QuantityButton
                            isLoading={isLoading}
                            incrementCount={incrementCount}
                            decrementCount={decrementCount}
                            quantity={quantity} setQuantity={setQuantity} />}

                </div>}
            </div>
        </>
    )
}
