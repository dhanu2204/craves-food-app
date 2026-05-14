package com.lite.zslite.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lite.zslite.service.CartService;
import com.lite.zslite.models.Cart;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return cartService.addToCart(cart);
    }

    @org.springframework.web.bind.annotation.GetMapping("/user/{userId}")
    public Cart getCart(@org.springframework.web.bind.annotation.PathVariable("userId") int userId) {
        return cartService.getCart(userId);
    }

}
