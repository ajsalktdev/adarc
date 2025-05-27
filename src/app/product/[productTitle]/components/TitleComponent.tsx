import { cn } from '@/utils/utils';
import React from 'react';

export default function TitleComponent({
  title,
  titleClass,
  containerClass,
  lineThrough = false,
  onClick
}: {
  title: any,
  titleClass?: any,
  containerClass?: any,
  lineThrough?: any,
  onClick?: any
}) {
  const formattedTitle =
    typeof title === 'string'
      ? title.charAt(0).toUpperCase() + title.slice(1)
      : title;

  return (
    <div className={cn('', containerClass)} onClick={onClick}>
      <h5
        className={cn(
          'text-[12px] leading-[14.22px] text-BLACK',
          titleClass,
          lineThrough && 'line-through'
        )}
      >
        {formattedTitle}
      </h5>
    </div>
  );
}
