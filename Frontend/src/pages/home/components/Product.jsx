
import React, { useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { add } from '../../../store/cartSlice';
import { fetchProducts } from '../../../store/productSlice';
import { useNavigate } from 'react-router-dom';

const Product =() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {data:products,status} = useSelector((state)=>state.product);

    useEffect(()=>{
      dispatch(fetchProducts())
    },[])

    const addToCart = (product)=>{
      dispatch(add(product))
    }
    if(status=="loading"){
      return <h1>Loading</h1>
    }
    if(status=="error"){
      return <h1>Error ! Something Went Wrong..</h1>
    }
  return (
    <div>
  <div className='items-center justify-center min-h-screen from-[#F9F5F3] via-[#F9F5F3] to-      [#F9F5F3] bg-gradient-to-br px-2'>
    <div className='w-full max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden'>
        {
          products.map((product)=>{
            return(
              <div onClick={()=>navigate(`productdetails/${product._id}`)} key={product._id} className='max-w-md mx-auto'>
          <div className='h-[236px]' style={{backgroundImage:`url(${product.productImgae})`,backgroundSize:"cover",backgroundPosition:"center"}}>
           </div>
          <div className='p-4 sm:p-6'>
            <p className='font-bold text-gray-700 text-[22px] leading-7 mb-1'>{product.productName}</p>
            <div className='flex flex-row'>
              <p className='text-[#3C3C4399] text-[17px] mr-2 line-through'>MVR 700</p>
              <p className='text-[17px] font-bold text-[#0FB478]'>{product.productPrice}</p>
            </div>
            <p className='text-[#7C7C80] font-[15px] mt-6'>Our shrimp sauce is made with mozarella, a creamy taste of shrimp with extra kick of spices.</p>


              <a target='_blank' href='foodiesapp://food/1001' className='block mt-10 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform bg-[#FFC933] rounded-[14px] hover:bg-[#FFC933DD] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                  View on foodies
              </a>
            <a target='' onClick={()=>addToCart(product)} className='block mt-1.5 w-full px-4 py-3 font-medium tracking-wide text-center capitalize transition-colors duration-300 transform rounded-[14px] hover:bg-[#F2ECE7] hover:text-[#000000dd] focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-80'>
                  Add to Cart
              </a>
          </div>
        </div>
            )
          })
        }
    </div>
</div>
    </div>
  )
}

export default Product