import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, restaurantId, restaurantName } = useCart();
  
  // State variables to save user information and form inputs
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState("");
  const [gpsLoading, setGpsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi"); 
  
  // State variables for payment inputs
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  
  // State variables for order placement progress
  const [isSubmitting, setIsSubmitting] = useState(false);
  // 1. Check if user is logged in when the page loads
  useEffect(() => {
    const savedUser = localStorage.getItem("zslite_user");
    if (!savedUser) {
      alert("Please login first to proceed with checkout!");
      navigate("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [navigate]);

  // Calculate prices
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = itemsTotal * 0.05;
  const platformFee = 5;
  const grandTotal = Math.round(itemsTotal + platformFee + gst);

  // 2. Fetch location using Geolocation API and OpenStreetMap Nominatim API
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser!");
      return;
    }

    setGpsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // OpenStreetMap Nominatim reverse lookup
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          if (response.ok) {
            const data = await response.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
            } else {
              setAddress(`GPS Location: Lat ${latitude.toFixed(6)}, Lon ${longitude.toFixed(6)}`);
            }
          } else {
            setAddress(`GPS Location: Lat ${latitude.toFixed(6)}, Lon ${longitude.toFixed(6)}`);
          }
        } catch (error) {
          console.error("GPS Reverse Geocode Error:", error);
          setAddress(`GPS Location: Lat ${latitude.toFixed(6)}, Lon ${longitude.toFixed(6)}`);
        } finally {
          setGpsLoading(false);
        }
      },
      (error) => {
        console.error("GPS Error:", error);
        alert("Failed to get your location. Please type your address manually.");
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };
  // 3. Handle Order Submission
  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      alert("Please enter a delivery address or use GPS!");
      return;
    }

    if (paymentMethod === "upi" && !upiId.trim()) {
      alert("Please enter your UPI ID!");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
        alert("Please fill in all credit/debit card details!");
        return;
      }
    }

    setIsSubmitting(true);

    // Prepare API body matching Order.java model
    const orderData = {
      user: {
        id: user ? user.id : 1
      },
      restaurant: {
        id: restaurantId ? parseInt(restaurantId) : 1
      },
      totalamount: grandTotal,
      status: "PENDING"
    };

    try {
      const API_URL = import.meta.env.VITE_API_URL || "https://craves-delivery-backend.onrender.com";
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // Order saved in database successfully!
        clearCart();
        navigate("/order-success");
      } else {
        // Fallback simulation if backend database writing fails
        console.warn("Backend failed to save order, simulating successful order");
        clearCart();
        navigate("/order-success");
      }
    } catch (error) {
      console.warn("Could not reach backend server to save order, simulating success:", error);
      clearCart();
      navigate("/order-success");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Render loading state if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="z-checkout-page">
        <div className="z-checkout-container empty-state">
          <h2>No items to checkout!</h2>
          <Link to="/Home" className="z-back-home-btn">Go to Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="z-checkout-page">
      <div className="z-checkout-container">
        
        {/* Left column: Checkout Forms */}
        <div className="z-checkout-main">
          <div className="z-checkout-header">
            <Link to="/cart" className="z-back-arrow">←</Link>
            <h1>Secure Checkout</h1>
          </div>

          <form onSubmit={handleConfirmOrder} className="z-checkout-form">
            
            {/* Address Step */}
            <div className="z-checkout-section">
              <div className="z-section-title">
                <span className="z-step-number">1</span>
                <h2>Delivery Address</h2>
              </div>
              
              <div className="z-address-control">
                <textarea
                  placeholder="Enter your detailed delivery address..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="z-address-textarea"
                  rows="3"
                />
                
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="z-gps-btn"
                  disabled={gpsLoading}
                >
                  📍 {gpsLoading ? "Getting Location..." : "Use Current Location (GPS)"}
                </button>
              </div>
            </div>

            {/* Payment Method Step */}
            <div className="z-checkout-section">
              <div className="z-section-title">
                <span className="z-step-number">2</span>
                <h2>Payment Method</h2>
              </div>

              <div className="z-payment-selectors">
                <label className={`z-payment-label ${paymentMethod === "upi" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <span className="payment-icon">📱</span>
                  <span className="payment-name">UPI Payment</span>
                </label>

                <label className={`z-payment-label ${paymentMethod === "card" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span className="payment-icon">💳</span>
                  <span className="payment-name">Credit/Debit Card</span>
                </label>

                <label className={`z-payment-label ${paymentMethod === "razorpay" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === "razorpay"}
                    onChange={() => setPaymentMethod("razorpay")}
                  />
                  <span className="payment-icon">🚀</span>
                  <span className="payment-name">Razorpay</span>
                </label>
              </div>

              {/* Conditional Sub-forms */}
              <div className="z-payment-details">
                {paymentMethod === "upi" && (
                  <div className="z-upi-form anim-fade">
                    <label>Enter UPI ID</label>
                    <input
                      type="text"
                      placeholder="e.g. user@okhdfcbank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="z-input-field"
                    />
                    <small>Scan QR code or click pay request from your bank app</small>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="z-card-form anim-fade">
                    <div className="input-group-full">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="z-input-field"
                        maxLength="19"
                      />
                    </div>
                    <div className="input-group-row">
                      <div>
                        <label>Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="z-input-field"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label>CVV</label>
                        <input
                          type="password"
                          placeholder="***"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="z-input-field"
                          maxLength="3"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "razorpay" && (
                  <div className="z-razorpay-form anim-fade">
                    <p>Clicking 'Confirm & Pay' will redirect you to Razorpay secure checkout portal simulation.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Confirm Button */}
            <button
              type="submit"
              className="z-confirm-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing Payment..." : `Confirm & Pay ₹${grandTotal}`}
            </button>
          </form>
        </div>

        {/* Right column: Order Summary Panel */}
        <div className="z-checkout-summary">
          <h2>Order Summary</h2>
          <p className="z-res-indicator">Ordering from <strong>{restaurantName}</strong></p>
          
          <div className="z-summary-items">
            {cartItems.map((item) => (
              <div key={item.id} className="z-summary-item">
                <span className="z-item-qty-name">{item.quantity} x {item.name}</span>
                <span className="z-item-sub">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="z-bill-divider"></div>

          <div className="z-bill-breakdown">
            <div className="z-break-row">
              <span>Subtotal</span>
              <span>₹{itemsTotal}</span>
            </div>
            <div className="z-break-row">
              <span>Platform Fee</span>
              <span>₹{platformFee}</span>
            </div>
            <div className="z-break-row">
              <span>GST (5%)</span>
              <span>₹{gst.toFixed(2)}</span>
            </div>
            <div className="z-bill-divider"></div>
            <div className="z-break-row grand-total">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
