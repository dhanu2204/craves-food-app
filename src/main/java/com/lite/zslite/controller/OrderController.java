package com.lite.zslite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lite.zslite.models.Order;
import com.lite.zslite.service.OrderService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * Line 30: Endpoint to place a new order.
     * POST /api/orders
     */
    @PostMapping
    public Order placeOrder(@RequestBody Order order) {
        return orderService.placeOrder(order);
    }

    /**
     * Line 39: Endpoint to update order status.
     * PUT /api/orders/{id}/status?status=DELIVERED
     */
    @PutMapping("/{id}/status")
    public String updateOrderStatus(@PathVariable int id, @RequestParam Order.Status status) {
        return orderService.updateOrderStatus(id, status);
    }

    /**
     * Line 48: Endpoint to get specific order details.
     * GET /api/orders/{id}
     */
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable int id) {
        return orderService.getOrderById(id);
    }

    /**
     * Line 57: Endpoint to get order history of a user.
     * GET /api/orders/user/{userId}
     */
    @GetMapping("/user/{userId}")
    public List<Order> getOrdersByUser(@PathVariable int userId) {
        return orderService.getOrdersByUser(userId);
    }

    /**
     * Line 66: Endpoint to view all orders (Admin).
     * GET /api/orders
     */
    @GetMapping
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
}
