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

import com.lite.zslite.models.Category;
import com.lite.zslite.service.CategoryService;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    /**
     * Line 30: Endpoint to create a new category.
     * POST /api/categories
     */
    @PostMapping
    public String addCategory(@RequestBody Category category) {
        return categoryService.addCategory(category);
    }

    /**
     * Line 39: Endpoint to update a category.
     * PUT /api/categories/{id}
     */
    @PutMapping("/{id}")
    public String updateCategory(@RequestBody Category category, @PathVariable int id) {
        return categoryService.updateCategory(category, id);
    }

    /**
     * Line 48: Endpoint to delete a category.
     * DELETE /api/categories/{id}
     */
    @DeleteMapping("/{id}")
    public String deleteCategory(@PathVariable int id) {
        return categoryService.deleteCategory(id);
    }

    /**
     * Line 57: Endpoint to get categories of a restaurant.
     * GET /api/categories/restaurant/{restaurantId}
     */
    @GetMapping("/restaurant/{restaurantId}")
    public List<Category> getCategoriesByRestaurant(@PathVariable int restaurantId) {
        return categoryService.getCategoriesByRestaurant(restaurantId);
    }

    /**
     * Line 66: Endpoint to list all categories.
     * GET /api/categories
     */
    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }
}
