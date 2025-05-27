import React from 'react';

function SkeletonLoader ({ count }: { count?: number }) {
  const loaders = Array.from({ length: 8 });

  return (
    <>
      {count ? (
        loaders.map((_, index) => (
          <div
            role="status"
            className="max-w-full animate-pulse flex items-center mb-[12px] mt-[12px]"
            key={index}
          >
            <div className="bg-gray-200 rounded-[50%] w-[30px] h-[30px] min-w-[30px] min-h-[30px] mr-3"></div>
            <div className="h-[30px] bg-gray-200 rounded-full w-full "></div>
          </div>
        ))
      ) : (
        <div
          role="status"
          className="max-w-full animate-pulse flex items-center  mb-[12px] mt-[12px]"
        >
          <div className="bg-gray-200 rounded-[50%] w-[30px] h-[30px] min-w-[30px] min-h-[30px] mr-3"></div>
          <div className="h-[30px] bg-gray-200 rounded-full w-full "></div>
        </div>
      )}
    </>
  );
}

export default SkeletonLoader;
