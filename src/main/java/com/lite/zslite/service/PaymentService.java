package com.lite.zslite.service;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.Payment;
import com.lite.zslite.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    /**
     * Line 18: Processes a new payment transaction.
     * It sets the current timestamp as the payment date before saving.
     */
    public Payment processPayment(Payment payment) {
        payment.setPaymentDate(LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    /**
     * Line 27: Retrieves payment details for a specific order.
     */
    public Optional<Payment> getPaymentByOrder(int orderId) {
        return paymentRepository.findByOrderId(orderId);
    }

    /**
     * Line 34: Updates the status of a payment (e.g., 'SUCCESS', 'FAILED').
     */
    public String updatePaymentStatus(Long id, Payment.PaymentStatus status) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if (payment != null) {
            payment.setPaymentstatus(status);
            paymentRepository.save(payment);
            return "Payment status updated to " + status;
        }
        return "Payment record not found";
    }
}
