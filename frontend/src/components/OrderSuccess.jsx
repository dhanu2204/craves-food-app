import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./OrderSuccess.css";

function OrderSuccess() {
  const { clearCart } = useCart();

  // Clear the cart when this page loads because the order is "placed"
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="z-success-page">
      <div className="z-success-card">
        <div className="z-success-icon">✔️</div>
        <h1>Order Placed Successfully!</h1>
        <p>Your delicious meal is being prepared and will be with you shortly.</p>
        <div className="z-order-details">
          <div className="z-track-item">
            <span className="dot active"></span>
            <span>Order Confirmed</span>
          </div>
          <div className="z-track-item">
            <span className="dot"></span>
            <span>Food is being prepared</span>
          </div>
          <div className="z-track-item">
            <span className="dot"></span>
            <span>Out for delivery</span>
          </div>
        </div>
        <Link to="/Home" className="z-back-home">Back to Home</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
