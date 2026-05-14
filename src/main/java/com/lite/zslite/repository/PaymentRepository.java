package com.lite.zslite.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    
    // Line 11: This method helps us find the payment details for a specific order.
    // Since an order usually has only one payment, we use Optional to handle the case if it's not found.
    Optional<Payment> findByOrderId(int orderId);
}
