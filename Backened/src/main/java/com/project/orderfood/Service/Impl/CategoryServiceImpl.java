package com.project.orderfood.Service.Impl;

import com.project.orderfood.Model.Category;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Repository.CategoryRepo;
import com.project.orderfood.Service.CategoryService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;
    private final RestaurantServiceImpl restaurantService;

    @Override
    public Category createCategory(String categoryName, Long userId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantByUserId(userId);
        if (categoryRepo.findByName(categoryName).isPresent()) {
            throw new Exception("Category already exists");
        }
        Category category = new Category();
        category.setName(categoryName);
        category.setRestaurant(restaurant);
        return categoryRepo.save(category);
    }

    @Override
    public List<Category> findCategoryByRestaurant(Long restId){
        return categoryRepo.findByRestaurantId(restId);
    }

    @Override
    public Category findCategoryById(Long id) throws Exception {
        return categoryRepo.findById(id).orElseThrow(() -> new Exception("Category not found"));
    }

    @Override
    public String deleteCategoryById(Long id) {
        try{
            categoryRepo.deleteById(id);
        }catch(Exception e){
            return "Category is already in use";
        }
        return "Category is deleted Successfully!";
    }
}
