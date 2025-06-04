"use client"
import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';

export default function BottomBanner({data}:any) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 2000,
        },
      },
    ],
  };

  return (
    <div className="mb-[28px] md:mb-[48px] max-sk:px-[10px] overflow-hidden ">
      <Slider {...settings}>
        {data?.map((item:any, index:any) => (
          <Link href={'#'} key={index} className="md:px-[10px]  ">
            <div
              className="w-full  bg-PRIMARY_GREY overflow-hidden" style={{aspectRatio:3}}
            >
              <Image
                src={item?.image}
                width={660}
                quality={100}
                height={220}
                alt="banner"
                loading="lazy"
                // fill
                className="w-full  object-fill"
              />
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
}
