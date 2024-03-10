
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import router from './route'
import Home from './pages/home/Home'
import Footer from './globals/components/footer/Footer'


function App() {
  return (
    <>
      <RouterProvider router ={router} /> 
      <Footer/>
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
