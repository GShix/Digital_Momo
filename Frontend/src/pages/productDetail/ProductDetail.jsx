import React from 'react'
import ProductDeta from './component/product/ProductDeta'
import ReviewDeta from './component/review/ReviewDeta'
import {useParams} from 'react-router-dom'
const ProductDetail = () => {
  const {id}=useParams();
  // console.log(id)
  return (
    <div>ProductDetail
        <ProductDeta id={id}/>
        <ReviewDeta/>
    </div>
  )
}

export default ProductDetail