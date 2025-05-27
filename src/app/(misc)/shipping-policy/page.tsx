import React from 'react'
import ContentSection from '../_components/ContentSection';
import data from "@/data/json/misc/shipping-policy.json"

function Page() {
    
    return (
        <ContentSection data={data} />
    );
}

export default Page;
