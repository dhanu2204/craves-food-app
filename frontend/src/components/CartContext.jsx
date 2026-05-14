import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. Load cart from LocalStorage when the app starts
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("zslite_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [restaurantId, setRestaurantId] = useState(() => {
    return localStorage.getItem("zslite_res_id") || null;
  });

  const [restaurantName, setRestaurantName] = useState(() => {
    return localStorage.getItem("zslite_res_name") || null;
  });

  // 2. Save to LocalStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("zslite_cart", JSON.stringify(cartItems));
    if (cartItems.length === 0) {
      localStorage.removeItem("zslite_res_id");
      localStorage.removeItem("zslite_res_name");
      setRestaurantId(null);
      setRestaurantName(null);
    } else {
      localStorage.setItem("zslite_res_id", restaurantId);
      localStorage.setItem("zslite_res_name", restaurantName);
    }
  }, [cartItems, restaurantId, restaurantName]);

  const addToCart = (item, resId) => {
    if (cartItems.length > 0 && restaurantId !== resId && resId !== undefined) {
      alert("Another item is already there from a different restaurant! Please clear your cart first.");
      return;
    }

    if (cartItems.length === 0) {
      setRestaurantId(resId);
      setRestaurantName(item.restaurantName || "Restaurant");
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  // 3. Logic to decrease quantity or remove item
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === itemId);
      if (existingItem.quantity === 1) {
        return prevItems.filter((i) => i.id !== itemId);
      }
      return prevItems.map((i) =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
    localStorage.removeItem("zslite_cart");
    localStorage.removeItem("zslite_res_id");
    localStorage.removeItem("zslite_res_name");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, restaurantId, restaurantName }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
