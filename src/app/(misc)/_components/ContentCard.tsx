import React from 'react';

// Define the prop types for the component
interface ContentCardProps {
  title?: string;
  description?: string;
  bulletin?: any;
  end_description: any;
  note?: string;
}

function ContentCard({ title, description, bulletin, end_description, note }: ContentCardProps) {
  return (
    <div className='flex flex-col gap-3 py-3 border-b-[0.6px] border-solid border-primary_border last:border-b-0'>
      {title ? (<h3 className='rubik_medium text-[16px]'>{title}</h3>) : ""}
      {description ?
        <p className='rubik_regular text-[12px] leading-5   whitespace-pre-line'>{description}</p> : ""}
      {bulletin ? (<div>
        {bulletin?.map((term: any, index: any) => {
          return (
            <div key={index}>
              <p className='rubik_regular text-[12px] leading-5   whitespace-pre-line'>{term?.id ? ` ${term?.id} .` : ''} {term.text}</p>
              {term?.conditions && (
                <ul>
                  {term.conditions.map((subCondition: any, subIndex: any) => (
                    <li key={subIndex}>
                      <p className='rubik_regular text-[12px] leading-5   whitespace-pre-line'>&nbsp;&nbsp;  {subCondition.id ? ` ${subCondition.id}.` : '•'} {subCondition.text}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>) : ""}
      {end_description ?
        <p className='rubik_regular text-[12px] leading-5  whitespace-pre-line'>{end_description}</p> : ""}

      {note ?
        <p className='rubik_regular text-[12px] leading-5  whitespace-pre-line'>
          <span className='rubik_medium'>Note: </span>
          {note}</p> : ""}
    </div>

  );
}

export default ContentCard;
