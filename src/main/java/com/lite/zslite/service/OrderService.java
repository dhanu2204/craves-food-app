package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.Order;
import com.lite.zslite.repository.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Line 17: This method is used to place a new order. 
     * It saves the order details (items, total amount, user) to the database.
     */
    public Order placeOrder(Order order) {
        return orderRepository.save(order);
    }

    /**
     * Line 25: This method updates the status of an order 
     * (e.g., from 'PENDING' to 'PREPARING').
     */
    public String updateOrderStatus(int id, Order.Status status) {
        Order order = orderRepository.findById(id).orElse(null);
        if (order != null) {
            order.setStatus(status);
            orderRepository.save(order);
            return "Order status updated to " + status;
        }
        return "Order not found";
    }

    /**
     * Line 39: Fetches a single order's details by its ID.
     */
    public Order getOrderById(int id) {
        return orderRepository.findById(id).orElse(null);
    }

    /**
     * Line 46: Fetches all orders placed by a specific user.
     */
    public List<Order> getOrdersByUser(int userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Line 53: Fetches all orders in the system (for admin purposes).
     */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
