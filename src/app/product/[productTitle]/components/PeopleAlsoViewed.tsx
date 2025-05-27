import RectangleSection from '@/components/includes/RectangleSection'
import React from 'react'
// import Products from '../../../../data.json';


function PeopleAlsoViewed({data}:any) {
    const slider_settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
    };
    return (<div className='block'>
        <div className=' w-[100%] block px-7  pb-[12px]'>
            <RectangleSection className='' datas={data} sectionTitle={'People also viewed'} slider_settings={slider_settings} />
        </div>
    </div>
    )
}

export default PeopleAlsoViewed
