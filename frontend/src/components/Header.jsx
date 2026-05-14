import { useState } from "react";
import "./HeadFoot.css";

function Header({ search, setSearch, vegOnly, setVegOnly, isDark, setIsDark }) {
    
    return (
        <header className="header-container">
            <div className="top-bar">
                <a href="/" className="logo">Craves</a>
                <nav className="nav-links">
                    <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
                        {isDark ? "☀️" : "🌙"}
                    </button>
                    <button className="nav-btn">Sign In</button>
                    <button className="nav-btn">Sign Up</button>
                </nav>
            </div>
            <div className="search-bar-container">
                <div className="search-input-wrapper">
                    <input 
                        className="search-input"
                        placeholder="Search Restaurant Name/Dish"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <div className="toggle-div">
                        <label className="switch">
                            <input 
                                type="checkbox"
                                checked={vegOnly}
                                onChange={(e) => setVegOnly(e.target.checked)}
                            />
                            <span className="slider round"></span>
                        </label>
                        <span className="veg-label">Veg Only</span>
                    </div>
                    <button className="cart-btn">🛒</button>
                </div>
            </div>
        </header>
    );
}

export default Header;