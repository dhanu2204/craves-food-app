package com.lite.zslite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    // Standard CRUD operations provided by JpaRepository
}
