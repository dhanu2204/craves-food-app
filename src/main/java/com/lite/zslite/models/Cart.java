package com.lite.zslite.models;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.GenerationType;

@Entity
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
    private List<CartItem> cartitem;

    private double totalPrice;

    public Cart() {
    }

    public Cart(int id, User user, List<CartItem> cartitem, double totalPrice) {
        this.id = id;
        this.user = user;
        this.cartitem = cartitem;
        this.totalPrice = totalPrice;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<CartItem> getCartitem() {
        return cartitem;
    }

    public void setCartitem(List<CartItem> cartitem) {
        this.cartitem = cartitem;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Cart [id=" + id + ", user=" + user + ", cartitem=" + cartitem + ", totalPrice=" + totalPrice + "]";
    }
    
    

}
