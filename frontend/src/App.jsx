import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import RestaurantPage from './components/RestaurantPage'
import FoodItemPage from './components/FoodItemPage'
import Cart from './components/Cart'
import Login from './components/Login'
import OrderSuccess from './components/OrderSuccess'
import FloatingCart from './components/FloatingCart'
import { CartProvider } from './components/CartContext'
import './components/RestaurantPage.css'

const App = () => { 
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Home" element={<RestaurantPage/>} />
          <Route path="/restaurant/:id" element={<FoodItemPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/" element={<Register />} />
        </Routes>
        <FloatingCart />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
