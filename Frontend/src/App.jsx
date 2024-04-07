
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import router from './route'
import Home from './pages/home/Home'
import Footer from './globals/components/footer/Footer'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import {Provider} from 'react-redux'
import store from './store/store'

function App() {
  return (
    <>
      {/* <RouterProvider router ={router} /> 
      <Footer/> */}
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
