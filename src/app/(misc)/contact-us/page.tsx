"use client"
import React from 'react'
import ContentSection from '../_components/ContentSection';
import EnquireForm from '../_components/EnquireForm';
import data from "@/data/json/misc/contact-us.json"

function Page() {

    return (<>

        <ContentSection data={data} className='pb-0 mb-0'/>
        <div className='w-[500px] pb-5 border-t-[0.6px] border-solid border-primary_border max-sm:w-full mb-6'>
            <h2 className='rubik_medium text-[16px] text-left mb-3 mt-2'>Reach out to us</h2>
            <EnquireForm />

        </div>

    </>

    );
}

export default Page;
