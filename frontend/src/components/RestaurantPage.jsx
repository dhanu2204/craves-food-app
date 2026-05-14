import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; // Import the cart hook
import "./RestaurantPage.css";

// --- DATA ---
// --- DATA ---
// We will now fetch this data from the backend instead of having it hardcoded.

// --- COMPONENTS ---

// This is the Header component. It's now an internal function.
function Header({ search, setSearch, vegOnly, setVegOnly, rating4Plus, setRating4Plus, isDark, setIsDark, selectedCuisine, setSelectedCuisine }) {
    const { cartItems } = useCart();
    const cuisines = ["All", "South Indian", "North Indian", "Continental", "Chinese", "Desserts"];

    return (
        <header className="z-header">
            <div className="z-top-nav">
                <Link to="/Home" className="z-logo">Craves</Link>
                <div className="z-search-container">
                    <span className="search-icon">🔍</span>
                    <input 
                        className="z-search-input"
                        placeholder="Search for restaurant, cuisine or a dish"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="z-user-nav">
                    <button className="z-nav-link" onClick={() => setIsDark(!isDark)}>
                        {isDark ? "☀️ Light" : "🌙 Dark"}
                    </button>
                    <Link to="/cart" className="z-cart-btn">
                        🛒 Cart {cartItems.length > 0 && <span className="z-badge">{cartItems.length}</span>}
                    </Link>
                    <button className="z-profile">Profile</button>
                </div>
            </div>
            
            <div className="z-filter-chips">
                <button 
                    className={`z-chip ${vegOnly ? 'active' : ''}`}
                    onClick={() => setVegOnly(!vegOnly)}
                >
                    🌱 Pure Veg
                </button>
                <button 
                    className={`z-chip ${rating4Plus ? 'active' : ''}`}
                    onClick={() => setRating4Plus(!rating4Plus)}
                >
                    ⭐ Rating: 4.0+
                </button>
                {cuisines.map(c => (
                    <button 
                        key={c}
                        className={`z-chip ${selectedCuisine === c ? 'active' : ''}`}
                        onClick={() => setSelectedCuisine(c)}
                    >
                        {c}
                    </button>
                ))}
            </div>
        </header>
    );
}

const DEFAULT_RES_IMAGE = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80";

// This is the RestaurantCard component. Also an internal function.
function RestaurantCard({ id, name, cuisine, rating, image, isveg }) {
    return (
        <Link to={`/restaurant/${id}`} className="z-card-link">
            <div className="z-card">
                <div className="z-card-img-wrapper">
                    <img 
                        src={image || DEFAULT_RES_IMAGE} 
                        alt={name} 
                        className="z-card-img" 
                        onError={(e) => { e.target.src = DEFAULT_RES_IMAGE; }}
                    />
                </div>
                <div className="z-card-info">
                    <div className="z-card-header">
                        <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                            <div className={`z-veg-indicator ${isveg ? 'veg' : 'non-veg'}`}>
                                <div className="z-veg-dot"></div>
                            </div>
                            <h3 className="z-card-name">{name}</h3>
                        </div>
                        <div className="z-card-rating">
                            {rating} <span style={{fontSize: '0.7rem'}}>★</span>
                        </div>
                    </div>
                    <div className="z-card-footer">
                        <p className="z-card-cuisine">{cuisine}</p>
                        <p className="z-card-price">₹200 for one</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// --- MAIN PAGE COMPONENT ---
// This is the main component that brings everything together.
function RestaurantPage() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [vegOnly, setVegOnly] = useState(false);
  const [rating4Plus, setRating4Plus] = useState(false); 
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [isDark, setIsDark] = useState(false);

  // FETCH LOGIC: Runs once when the page loads
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/restaurants/all");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data); // Save data to state
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };
    loadData();
  }, []);

  // Theme logic
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

  // This logic filters the restaurants based on search and Veg toggle
  // FILTER LOGIC: Updates as you type or toggle Veg
  const filteredRestaurants = restaurants.filter((res) => {
    const matchesSearch = res.name.toLowerCase().includes(search.toLowerCase()) || 
                          res.cuisine.toLowerCase().includes(search.toLowerCase());
    
    const matchesVeg = vegOnly ? res.isveg === true : true;
    const matchesRating = rating4Plus ? res.rating >= 4.0 : true;
    const matchesCuisine = selectedCuisine === "All" ? true : res.cuisine.toLowerCase().includes(selectedCuisine.toLowerCase());

    return matchesSearch && matchesVeg && matchesRating && matchesCuisine;
  });

  return (
    <div className="z-app">
      <Header 
        search={search} 
        setSearch={setSearch} 
        vegOnly={vegOnly} 
        setVegOnly={setVegOnly}
        rating4Plus={rating4Plus}
        setRating4Plus={setRating4Plus}
        isDark={isDark}
        setIsDark={setIsDark}
        selectedCuisine={selectedCuisine}
        setSelectedCuisine={setSelectedCuisine}
      />
      
      <div className="z-container">
        <div className="z-section-title">
          <h2>Delivery Restaurants in Mysuru</h2>
        </div>
        <div className="z-grid">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((res) => (
              <RestaurantCard
                key={res.id}
                id={res.id}
                name={res.name}
                cuisine={res.cuisine}
                rating={res.rating}
                image={res.imageurl}
                isveg={res.isveg}
              />
            ))
          ) : (
            <div className="z-no-results">
              <h2>No Restaurants Found</h2>
              <p>Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>

      <footer className="z-footer">
        <div className="z-footer-content">
          <div className="z-footer-section">
            <h2 className="z-logo">Craves</h2>
            <p>Making Mysuru delicious, one delivery at a time.</p>
          </div>
          <div className="z-footer-section">
            <h4>COMPANY</h4>
            <Link to="#">About Us</Link>
            <Link to="#">Blog</Link>
            <Link to="#">Careers</Link>
          </div>
          <div className="z-footer-section">
            <h4>LEGAL</h4>
            <Link to="#">Terms & Conditions</Link>
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Cookie Policy</Link>
          </div>
          <div className="z-footer-section">
            <h4>SOCIAL</h4>
            <div className="z-social-links">
              <span>FB</span> <span>TW</span> <span>IG</span>
            </div>
          </div>
        </div>
        <div className="z-footer-bottom">
          <p>© 2026 Craves. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default RestaurantPage;
