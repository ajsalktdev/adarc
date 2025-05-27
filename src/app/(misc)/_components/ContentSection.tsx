import React from 'react'
import ContentCard from './ContentCard'
import { cn } from '@/utils/utils'

function ContentSection({data,className}:{data:any,className?:string}) {
  return (
    <div className={cn('py-[20px] border-t-[0.6px] border-solid border-primary_border', className)}>
    {data.map((item:any, index:any) => (
        <ContentCard
            key={index}
            title={item.title}
            description={item.description}
            bulletin={item?.bulletin}
            end_description={item?.end_description}
            note={item?.note}

        />
    ))}
</div>
  )
}

export default ContentSection
