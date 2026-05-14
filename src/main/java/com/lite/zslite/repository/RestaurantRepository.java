package com.lite.zslite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Restaurant;

@Repository
public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {

    Restaurant findById(int id);

    List<Restaurant> findByName(String name);

    boolean existsByName(String name);

    List<Restaurant> findByCity(String city);

    List<Restaurant> findByCuisine(String cuisine);
}
