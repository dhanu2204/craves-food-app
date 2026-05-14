package com.lite.zslite.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.lite.zslite.models.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
    // Line 11: This method allows us to get all categories (like 'Starter', 'Main Course') 
    // that belong to a specific restaurant.
    List<Category> findByRestaurantId(int restaurantId);
}
