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

import com.lite.zslite.models.FoodItem;
import com.lite.zslite.service.FoodItemService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/fooditems")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping
    public String addFoodItem(@RequestBody FoodItem foodItem) {
        return foodItemService.addFoodItem(foodItem);
    }

    @PutMapping("/{id}")
    public String updateFoodItem(@RequestBody FoodItem foodItem, @PathVariable(value = "id") int fid) {
        return foodItemService.updateFoodItem(foodItem, fid);
    }

    @DeleteMapping("/{id}")
    public String deleteFoodItem(@PathVariable(value = "id") int fid) {
        return foodItemService.deleteFoodItem(fid);
    }

    @GetMapping("/{id}")
    public FoodItem getFoodItem(@PathVariable(value = "id") int fid) {
        return foodItemService.getFoodItem(fid);
    }

    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @GetMapping("/name/{name}")
    public FoodItem getFoodByName(@PathVariable(value = "name") String name) {
        return foodItemService.getFoodByName(name);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public List<FoodItem> getFoodItemsByRestaurant(@PathVariable(value = "restaurantId") int restaurantId) {
        return foodItemService.getFoodItemsByRestaurant(restaurantId);
    }

}
