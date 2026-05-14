package com.lite.zslite.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.repository.CartRepository;

import com.lite.zslite.models.Cart;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart getCart(int userId) {
        return cartRepository.findByUserId(userId);
    }

}
