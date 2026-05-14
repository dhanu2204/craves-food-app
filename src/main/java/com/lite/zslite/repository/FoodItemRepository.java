package com.lite.zslite.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.FoodItem;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Integer> {

    FoodItem findById(int fid);

    FoodItem findByName(String name);

    java.util.List<FoodItem> findByRestaurantId(int restaurantId);
}
