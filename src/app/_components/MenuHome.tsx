import fetchApiData from '@/config/fetch-api-data';
import React from 'react'

export default async function MenuHome() {

    const getData = async () => {
            const response = await fetchApiData<any>(
                "products/list-all-categories/"
            );
            console.log(response, "categoriessss");
            return response;
        };
    
        const apiData = await getData();
        let categories = null;
        if (apiData?.status_code === 6000) {
            categories = apiData?.data;
        } else {
            categories = null;
        }
    
  return (
    <div>
      
    </div>
  )
}
