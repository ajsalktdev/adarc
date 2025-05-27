import React from 'react'
import RectangleSection from './RectangleSection'
import Products from '../../../data.json'; 

interface Product {
  description: string;
  price: string;
}
function ProductSection() {
 

  return (
    <div>
      <RectangleSection className='' datas={Products} sectionTitle={'Products'}/>
    </div>
  )
}

export default ProductSection
