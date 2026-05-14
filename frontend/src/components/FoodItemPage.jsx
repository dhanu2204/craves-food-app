import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "./CartContext"; // Use the cart hook
import "./FoodItemPage.css";

// --- COMPONENTS ---

const DEFAULT_FOOD_IMAGE = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";
const DEFAULT_RES_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";

// This is the card for each food dish
function FoodCard({ id, name, description, price, image, isVeg, onAdd, onRemove, quantity }) {
  return (
    <div className="z-food-card">
      <div className="z-food-details">
        <div className="z-food-header">
          <span className={`z-veg-dot ${isVeg ? "veg" : "non-veg"}`}></span>
          <h3 className="z-food-name">{name}</h3>
        </div>
        <div className="z-food-price">₹{price}</div>
        <p className="z-food-desc">{description}</p>
      </div>
      <div className="z-food-action-area">
        <div className="z-food-img-container">
          <img 
            src={image || DEFAULT_FOOD_IMAGE} 
            alt={name} 
            className="z-food-img" 
            onError={(e) => { e.target.src = DEFAULT_FOOD_IMAGE; }}
          />
          {quantity === 0 ? (
            <button className="z-add-btn" onClick={() => onAdd({ id, name, price })}>ADD</button>
          ) : (
            <div className="z-qty-controls">
              <button className="z-qty-btn" onClick={() => onRemove(id)}>−</button>
              <span className="z-qty-val">{quantity}</span>
              <button className="z-qty-btn" onClick={() => onAdd({ id, name, price })}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
function FoodItemPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, removeFromCart } = useCart(); // Get cart functions

  // Fetch the data for THIS specific restaurant
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/restaurants/${id}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurant(data);
        }
      } catch (error) {
        console.error("Error loading menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, [id]);

  if (loading) return <div className="loader">Loading Menu...</div>;
  if (!restaurant) return <div className="error">Restaurant not found!</div>;

  return (
    <div className="z-menu-page">
      {/* Breadcrumbs */}
      <div className="z-breadcrumbs">
        <Link to="/Home">Home</Link> / <Link to="/Home">India</Link> / <Link to="/Home">Mysuru</Link> / <span>{restaurant.name}</span>
      </div>

      {/* Hero Banner */}
      <div className="z-menu-hero">
        <div className="z-hero-overlay">
          <div className="z-hero-info">
            <h1 className="z-res-name">{restaurant.name}</h1>
            <p className="z-res-cuisine">{restaurant.cuisine}</p>
            <p className="z-res-location">{restaurant.city}</p>
            <div className="z-res-meta">
              <span className="z-res-rating">⭐ {restaurant.rating}</span>
              <span className="z-res-delivery">30 min Delivery</span>
            </div>
          </div>
        </div>
        <img 
          src={restaurant.imageurl || DEFAULT_RES_IMAGE} 
          alt={restaurant.name} 
          className="z-hero-bg" 
          onError={(e) => { e.target.src = DEFAULT_RES_IMAGE; }}
        />
      </div>

      {/* Menu Navigation */}

      {/* Main Content */}
      <div className="z-menu-content">
        <div className="z-menu-sidebar">
          <h3>Categories</h3>
          <p className="active">Recommended</p>
          <p>Main Course</p>
          <p>Beverages</p>
        </div>

        <div className="z-food-list">
          <h2 className="z-list-title">Recommended Items</h2>
          {restaurant.foodItems && restaurant.foodItems.length > 0 ? (
            restaurant.foodItems.map((item) => {
              const cartItem = cartItems.find((i) => i.id === item.id);
              return (
                <FoodCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.imageurl}
                  isVeg={item.isveg}
                  onAdd={(food) => addToCart({ ...food, restaurantName: restaurant.name }, restaurant.id)}
                  onRemove={removeFromCart}
                  quantity={cartItem ? cartItem.quantity : 0}
                />
              );
            })
          ) : (
            <p className="no-items">No food items available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodItemPage;
