import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Product from './pages/Products'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import CategoryDetails from './pages/CategoryDetails'
import ProductDetails from './pages/ProductDetails'
import { BookProvider } from './context/bookContext'

export default function App(){

    return(
        <BookProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/products" element={<Product/>}></Route>
                    <Route path="/cart" element={<Cart/>}></Route>
                    <Route path="/category/:category_Id" element={<CategoryDetails/>} />
                    <Route path="/products/:productId" element={<ProductDetails/>} ></Route>
                    <Route path="/wishlist" element={<Wishlist/>}></Route>
                </Routes>
            </Router>
        </BookProvider>
        
    )
}