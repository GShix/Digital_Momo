import React from 'react'
import Navbar from '../../globals/components/navbar/Navbar'
import Hero from './components/Hero'
import Product from './components/Product'
import Footer from '../../globals/components/footer/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Product/>
      <Footer/>
    </div>
  )
}

export default Home