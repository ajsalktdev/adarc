// 'use client';

// import dynamic from 'next/dynamic';

// const RectangleSection = dynamic(() => import('./RectangleSection'), {
//   loading: () => (
//     <div className="w-full h-[400px] animate-pulse bg-gray-200 rounded-lg" />
//   ),
//   ssr: false
// });

// export default function ClientRectangleSection({ ...props }:any) {
//   return <RectangleSection {...props} />;
// }

"use client";

import dynamic from "next/dynamic";
import RectangleSectionSkeleton from "../skeltons/RectangleSectionSkeleton";

// No loader fallback here to avoid double loaders
const RectangleSection = dynamic(() => import("./RectangleSection"), {
	ssr: false,
});

export default function ClientRectangleSection({ ...props }: any) {
	// Show skeleton if no data yet
	if (props?.datas.length > 0) {
		return <RectangleSection {...props} />;
	}else{
    return <RectangleSectionSkeleton />;
  }

	
}
