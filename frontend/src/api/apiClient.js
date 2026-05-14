const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Something went wrong');
    }
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
        return response.json();
    } else {
        return response.text();
    }
};

export const api = {
    // Auth
    login: (email, password) => 
        fetch(`${BASE_URL}/users/login?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`, { method: 'POST' }).then(handleResponse),
    
    register: (userData) => 
        fetch(`${BASE_URL}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        }).then(handleResponse),

    // Restaurants
    getAllRestaurants: () => fetch(`${BASE_URL}/restaurants`).then(handleResponse),
    
    // Food Items
    getFoodItemsByRestaurant: (restaurantId) => fetch(`${BASE_URL}/fooditems/restaurant/${restaurantId}`).then(handleResponse),

    // Cart
    getCart: (userId) => fetch(`${BASE_URL}/cart/user/${userId}`).then(handleResponse),
    addToCart: (userId, foodItemId, quantity) => 
        fetch(`${BASE_URL}/cart/add?userId=${userId}&foodItemId=${foodItemId}&quantity=${quantity}`, { method: 'POST' }).then(handleResponse),
    updateCartItem: (cartItemId, quantity) => 
        fetch(`${BASE_URL}/cart/updateItem/${cartItemId}?quantity=${quantity}`, { method: 'PUT' }).then(handleResponse),
    removeFromCart: (cartItemId) => fetch(`${BASE_URL}/cart/removeItem/${cartItemId}`, { method: 'DELETE' }).then(handleResponse),
    
    // Orders
    placeOrder: (userId, restaurantId, deliveryAddress, paymentMethod) => 
        fetch(`${BASE_URL}/orders/place?userId=${userId}&restaurantId=${restaurantId}&deliveryAddress=${encodeURIComponent(deliveryAddress)}&paymentMethod=${encodeURIComponent(paymentMethod)}`, { method: 'POST' }).then(handleResponse),
    
    getOrdersByUser: (userId) => fetch(`${BASE_URL}/orders/user/${userId}`).then(handleResponse),
};
