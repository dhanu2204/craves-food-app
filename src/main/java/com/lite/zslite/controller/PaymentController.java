package com.lite.zslite.controller;

import java.util.Optional;

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

import com.lite.zslite.models.Payment;
import com.lite.zslite.service.PaymentService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    /**
     * Line 30: Endpoint to submit a payment.
     * POST /api/payments
     */
    @PostMapping
    public Payment processPayment(@RequestBody Payment payment) {
        return paymentService.processPayment(payment);
    }

    /**
     * Line 39: Endpoint to find payment for an order.
     * GET /api/payments/order/{orderId}
     */
    @GetMapping("/order/{orderId}")
    public Optional<Payment> getPaymentByOrder(@PathVariable int orderId) {
        return paymentService.getPaymentByOrder(orderId);
    }

    /**
     * Line 48: Endpoint to update payment status.
     * PUT /api/payments/{id}/status?status=SUCCESS
     */
    @PutMapping("/{id}/status")
    public String updatePaymentStatus(@PathVariable Long id, @RequestParam Payment.PaymentStatus status) {
        return paymentService.updatePaymentStatus(id, status);
    }
}
