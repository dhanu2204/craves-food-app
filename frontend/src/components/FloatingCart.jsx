import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import "./FloatingCart.css";

function FloatingCart() {
  const { cartItems } = useCart();
  const location = useLocation();

  // Don't show the floating cart on the login, register, or cart page itself
  const hiddenPaths = ["/", "/Login", "/Register", "/cart"];
  if (hiddenPaths.includes(location.pathname) || cartItems.length === 0) {
    return null;
  }

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Link to="/cart" className="floating-cart">
      <div className="cart-details">
        <span className="items-count">{totalItems} Item{totalItems > 1 ? "s" : ""}</span>
        <span className="separator">|</span>
        <span className="total-val">₹{totalPrice}</span>
      </div>
      <div className="view-cart">
        View Cart 🛒
      </div>
    </Link>
  );
}

export default FloatingCart;
