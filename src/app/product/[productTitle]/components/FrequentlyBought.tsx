import FrequentlyBoughtCard from '@/components/cards/FrequentlyBoughtCard'
import TitleSection from '@/components/includes/TitleSection'
import React from 'react'
import Products from '../../../../data.json';


function FrequentlyBought() {
    return (
        <div>
            <TitleSection sectionTitle="Frequently Bought" />
            <div className='flex gap-2 no-scrollbar overflow-x-scroll '>
                {Products?.product.map((item: any, index: any) => (
                    <FrequentlyBoughtCard item={item} key={index} />))}
            </div>
        </div>
    )
}

export default FrequentlyBought
