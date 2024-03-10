import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Footer from "./globals/components/footer/Footer";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Home/>
    }
])

export default router 