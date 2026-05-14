import { useCart } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const { cartItems, clearCart, addToCart, removeFromCart, restaurantName } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    navigate("/order-success");
  };

  return (
    <div className="z-cart-page">
      <div className="z-cart-container">
        {cartItems.length > 0 ? (
          <>
            <div className="z-cart-header">
              <div className="z-header-left">
                <Link to="/Home" className="z-back-link">←</Link>
                <div>
                  <h1 className="z-hotel-title">Ordering from {restaurantName}</h1>
                  <p className="z-item-count">{cartItems.length} Items in your cart</p>
                </div>
              </div>
              <button className="z-clear-all" onClick={clearCart}>Clear Cart</button>
            </div>

            <div className="z-cart-content">
              <div className="z-cart-items-list">
                {cartItems.map((item) => (
                  <div key={item.id} className="z-cart-item">
                    <div className="z-item-info">
                      <h3 className="z-item-name">{item.name}</h3>
                      <p className="z-item-price-tag">₹{item.price}</p>
                    </div>
                    
                    <div className="z-item-controls">
                      <div className="z-qty-stepper">
                        <button onClick={() => removeFromCart(item.id)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addToCart(item, undefined)}>+</button>
                      </div>
                      <div className="z-item-subtotal">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="z-bill-details">
                <h2 className="z-bill-title">Bill Details</h2>
                <div className="z-bill-row">
                  <span>Item Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="z-bill-row">
                  <span>Delivery Fee | 2.5 kms</span>
                  <span className="z-free">FREE</span>
                </div>
                <div className="z-bill-row">
                  <span>Platform Fee</span>
                  <span>₹5</span>
                </div>
                <div className="z-bill-row">
                  <span>GST and Restaurant Charges</span>
                  <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                </div>
                <div className="z-bill-divider"></div>
                <div className="z-bill-row z-total-row">
                  <span>To Pay</span>
                  <span>₹{(totalPrice + 5 + (totalPrice * 0.05)).toFixed(0)}</span>
                </div>
                <button className="z-place-order-btn" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="z-empty-cart">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Empty Cart" />
            <h2>Your cart is as light as air!</h2>
            <p>Add some delicious items from our menu.</p>
            <Link to="/Home" className="z-shop-now-btn">Go to Restaurants</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
