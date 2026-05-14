package com.lite.zslite.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lite.zslite.models.Category;
import com.lite.zslite.repository.CategoryRepository;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    /**
     * Line 17: Adds a new food category (like 'Beverages') to the system.
     */
    public String addCategory(Category category) {
        categoryRepository.save(category);
        return "Category added successfully";
    }

    /**
     * Line 25: Updates the name or details of a category.
     */
    public String updateCategory(Category category, int id) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            categoryRepository.save(category);
            return "Category updated successfully";
        }
        return "Category not found";
    }

    /**
     * Line 37: Deletes a category by its ID.
     */
    public String deleteCategory(int id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return "Category deleted successfully";
        }
        return "Category not found";
    }

    /**
     * Line 47: Retrieves all categories available in a specific restaurant.
     */
    public List<Category> getCategoriesByRestaurant(int restaurantId) {
        return categoryRepository.findByRestaurantId(restaurantId);
    }

    /**
     * Line 54: Retrieves all categories across all restaurants.
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
}
