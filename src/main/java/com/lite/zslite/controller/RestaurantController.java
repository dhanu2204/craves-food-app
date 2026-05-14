package com.lite.zslite.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lite.zslite.models.Restaurant;
import com.lite.zslite.service.RestaurantService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public String addRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @PutMapping("/{id}")
    public String updateRestaurant(@RequestBody Restaurant restaurant, @PathVariable("id") int rid) {
        return restaurantService.updateRestaurant(restaurant, rid);
    }

    @DeleteMapping("/{id}")
    public String deleteRestaurant(@PathVariable("id") int rid) {
        return restaurantService.deleteRestaurant(rid);
    }

    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable("id") int rid) {
        return restaurantService.getRestaurantById(rid);
    }

    @GetMapping("/all")
    public List<Restaurant> getAllRestaurant() {
        return restaurantService.getAllRestaurant();
    }

    @GetMapping("/name/{name}")
    public List<Restaurant> getRestaurantByName(@PathVariable("name") String name) {
        return restaurantService.getRestaurantByName(name);
    }

    @GetMapping("/city/{city}")
    public List<Restaurant> getByCity(@PathVariable("city") String city) {
        return restaurantService.getByCity(city);
    }

    @GetMapping("/cuisine/{cuisine}")
    public List<Restaurant> getByCuisine(@PathVariable("cuisine") String cuisine) {
        return restaurantService.getByCuisine(cuisine);
    }

}
