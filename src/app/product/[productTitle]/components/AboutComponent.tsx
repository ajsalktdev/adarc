'use client'
import React, { useEffect, useRef, useState } from 'react';
import Strings from '../../../../utils/string';
import TitleComponent from './TitleComponent';
import UnderLinedButton from '@/components/buttons/UnderLinedButton';

export default function AboutComponent({ data }: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentOverflow, setIsContentOverflow] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleViewMore = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (contentRef.current) {
      // Check if the content's height exceeds the height of 6 lines
      const contentHeight = contentRef.current.scrollHeight;
      const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight || '20'); // Assuming line-height of 20px
      const maxHeight = lineHeight * 6; // Height for 6 lines

      setIsContentOverflow(contentHeight > maxHeight);
    }
  }, [data]);

  return (
    <div>
      <TitleComponent
        title={Strings.productPage.aboutTitle}
        titleClass="rubik_bold"
        containerClass=""
      />
      <div>
        <div
          ref={contentRef}
          className={`rubik_regular text-[12px] md:text-[14px] text-shadow_gray ${
            !isExpanded ? 'line-clamp-6 ' : ''
          }`}
          style={
            !isExpanded
              ? { overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6 }
              : {}
          }
          dangerouslySetInnerHTML={{ __html: data }}
        />
      </div>
      {isContentOverflow && (
        <div className="mt-[12px]">
          <UnderLinedButton
            className="text-[12px] rubik_regular leading-[14.22px]"
            title={isExpanded ? Strings.button.viewLess : Strings.button.viewMore}
            onClick={toggleViewMore}
          />
        </div>
      )}
    </div>
  );
}
