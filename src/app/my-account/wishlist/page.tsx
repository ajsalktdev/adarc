'use client'
import React, { useEffect, useState } from 'react'
import product from '../../../../data.json'
import LargeCard from '@/components/includes/LargeCard'
import { useRouter } from 'next/navigation'
import Wrapper from '@/components/includes/Wrapper'
import strings from '@/utils/string'
import DropDownButton from '@/components/buttons/DropDownButton'
import CustomTextInput from '@/components/input/CustomTextInput'
import MiniSearch from '../../../../public/assets/icons/miniSearch.svg';
import RectangleSection from '@/components/includes/RectangleSection'
import Products from '../../../../data.json';
import fetchApiData from '@/config/fetch-api-data'
import TitleComponent from '@/app/product/[productTitle]/components/TitleComponent'
import useZustandStore from '@/store/useStore'
import { div } from 'framer-motion/client'
import EmptySection from '@/components/emptyContainer/EmptySection'
import postApiData from '@/config/post-api-data'


interface ApiResponse<T> {
  status_code: number;
  data: T | null;
  message?: string;
}

export default function page() {

  const { wishlist, setWishlist } = useZustandStore()

  const router = useRouter()
  const [tempSearch, setTempSearch] = useState('')
  const [search, setSearch] = useState('')

  console.log(tempSearch, "searchsearch");

  const [isRefresh, setRefresh] = useState(false)
  // console.log(wishlist,'dddd')

  // const [wishList,setWishist] = useState([])
  const getList = async () => {
    const response = await fetchApiData<ApiResponse<any>>(`wishlists/list-wishlist-items?q=${search}`, { requireAuth: true })
    if (response?.status_code == 6000) {
      // setWishist(response?.data?.cart_items)

      // response?.data?.cart_items.map((item:any)=>{
      //   setWishlist([...wishlist,item])
      // })
      setWishlist(response?.data?.cart_items)
    }

    console.log(response, 'cartResponse')
  }

  useEffect(() => {
    getList()
  }, [isRefresh,search])

  const removeItem = async (slug: string) => {
    try {
      const response = await postApiData<ApiResponse<any>>(
        `wishlists/add-wishlist-item/${slug}/`,
        {},
        undefined,
        true
      );

      if (response?.status_code === 6000) {

        // await getWishList()
        setRefresh(!isRefresh)
        console.log('resoinsse', response)

        console.log("Item added to cart successfully!", response);
      } else {
        console.error("Failed to add item to cart:", response?.message);
      }
    } catch (error) {
      console.error("An error occurred while adding to cart:", error);
    } finally {
    }
  };


  return (
    <div className='px-6 bg-white relative w-full max-[850px]:px-0'>
      {wishlist.length > 0 ? <div className='w-full flex justify-between'>
        <div className='w-full'>
          <div className='py-[16px]'><h1 className='rubik_medium text-[20px] leading-[24px] text-black '>{strings.title.wishlist}</h1></div>
          <div className='flex justify-between items-center'>
            {wishlist?.length > 0 && <div><TitleComponent title={`${wishlist?.length} items `} /></div>}
            {/* <div className='flex items-center gap-[12px]'>
              <div><TitleComponent titleClass='rubik_medium' title={'sort by'} /></div>
              <div className=' w-[100px]'><DropDownButton width={'20px'} height={'20px'} titleClass='' containerClass='' title={'Most recent'} /></div>
            </div> */}
          </div>
          <div className='w-[40%] mt-[24px]'>
            <CustomTextInput
              setData={setTempSearch}
              onIconClick={() => {
                setSearch(tempSearch)
              }}
             
              value={tempSearch}
              icon={MiniSearch}
              imageAlt={'mainSearch'}
              isIcon={true}
              className={'mb-0'}
              inputStyle='bg-[white]'
              placeholder={'Search'} />
          </div>
          <div className='w-[100%]  py-[16px] rounded-[4px] '>
            {wishlist?.map((item: any, index: any) =>
              <LargeCard removeItem={() => removeItem(item?.product?.slug)} wishlist={true} onClick={() => router.push(`/product/${item?.product?.slug}`)} key={index} product={item} />
            )}
          </div>
        </div>
        {/* <div className='w-[30%] p-[16px]'>
        <div className='w-[90%] h-full'><RectangleSection wishlist={true} className='' datas={Products.product} sectionTitle={'More items for you'}/></div>

        </div> */}

      </div> : <div><EmptySection title={'Your Wishlist is Empty'} message={'Save your favorite items here to view them anytime.'} /></div>}
    </div>
  )
}
