// components/BannerSection/_skeletons/DesktopSingleBannerSkeleton.tsx

import React from "react";

const DesktopSingleBannerSkeleton = () => {
  return (
    <div className="max-[480px]:hidden flex max-sm:px-[4px] gap-4">
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="w-[50%] flex justify-center rounded-[12px] overflow-hidden bg-gray-200 animate-pulse"
          style={{ aspectRatio: "2.5" }}
        >
          <div className="w-full h-full bg-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default DesktopSingleBannerSkeleton;
