package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.FoodItem;
import com.lite.zslite.repository.FoodItemRepository;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public String addFoodItem(FoodItem foodItem) {
        foodItemRepository.save(foodItem);
        return "Food item added successfully";
    }

    public String updateFoodItem(FoodItem foodItem, int fid) {
        FoodItem food = foodItemRepository.findById(fid);
        if (food != null) {
            food.setId(fid);
            foodItemRepository.save(foodItem);
            return "Food item updated successfully";
        }
        return "Food item not found";
    }

    public String deleteFoodItem(int fid) {
        FoodItem food = foodItemRepository.findById(fid);
        if (food != null) {
            foodItemRepository.delete(food);
            return "Food item deleted successfully";
        }
        return "Food item not found";
    }

    public FoodItem getFoodItem(int fid) {
        return foodItemRepository.findById(fid);
    }

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodItem getFoodByName(String name) {
        return foodItemRepository.findByName(name);
    }

    public List<FoodItem> getFoodItemsByRestaurant(int restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }

}
