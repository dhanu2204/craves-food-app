package com.lite.zslite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    
    // Line 11: This method helps us fetch the entire order history for a particular user.
    List<Order> findByUserId(int userId);
}
