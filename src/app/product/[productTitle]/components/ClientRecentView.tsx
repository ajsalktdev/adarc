'use client'
import React from 'react'

// import RecentlyViewed from './RecentlyViewed'
import dynamic from 'next/dynamic';

const RecentlyViewed = dynamic(() => import('./RecentlyViewed'), {
    loading: () => (
      <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
    ),
    ssr: false
  });

export default function ClientRecentView() {
  return (
    <RecentlyViewed className=" py-[32px]" />
)
}
