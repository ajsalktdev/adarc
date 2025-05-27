'use client';

import dynamic from 'next/dynamic';

const RectangleSection = dynamic(() => import('./RectangleSection'), {
  loading: () => (
    <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
  ),
  ssr: false
});

export default function ClientRectangleSection({ ...props }:any) {
  return <RectangleSection {...props} />;
}