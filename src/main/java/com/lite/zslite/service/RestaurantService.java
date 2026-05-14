package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.Restaurant;
import com.lite.zslite.repository.RestaurantRepository;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public String addRestaurant(Restaurant restaurant) {
        restaurantRepository.save(restaurant);
        return "Restaurant added sucessfully";
    }

    public String updateRestaurant(Restaurant restaurant, int rid) {
        if (restaurantRepository.findById(rid) != null) {
            restaurant.setId(rid);
            restaurantRepository.save(restaurant);
            return "Restaurant details updated sucessfully";
        }
        return "failed to update restaurant details";
    }

    public String deleteRestaurant(int rid) {
        Restaurant res = restaurantRepository.findById(rid);
        if (res != null) {
            restaurantRepository.delete(res);
            return "Deleted sucessfully";
        }
        return "Unable to delete";
    }

    public Restaurant getRestaurantById(int rid) {
        Restaurant res = restaurantRepository.findById(rid);
        return res;
    }

    public List<Restaurant> getAllRestaurant() {
        return restaurantRepository.findAll();
    }

    public List<Restaurant> getRestaurantByName(String name) {
        return restaurantRepository.findByName(name);
    }

    public List<Restaurant> getByCity(String city) {
        return restaurantRepository.findByCity(city);
    }

    public List<Restaurant> getByCuisine(String cuisine) {
        return restaurantRepository.findByCuisine(cuisine);
    }

}
