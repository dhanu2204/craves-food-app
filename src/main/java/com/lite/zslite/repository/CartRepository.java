package com.lite.zslite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer>{

    Cart findByUserId(int userId);
}
