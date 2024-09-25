package com.project.orderfood.Service.Impl;

import com.project.orderfood.DTO.FoodRequest;
import com.project.orderfood.Model.*;
import com.project.orderfood.Repository.*;
import com.project.orderfood.Service.FoodService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class FoodServiceImpl implements FoodService {

    private final FoodRepo foodRepo;
    private final CategoryRepo categoryRepo;
    private final IngredientsItemRepo ingredientsItemRepo;
    private final CartItemRepo cartItemRepo;

    @Override
    public Food createFood(FoodRequest request, Restaurant restaurant) throws Exception{

        if(foodRepo.findByNameAndDescription(request.getName(), request.getDescription()).isPresent()){
            throw new Exception("This food already exists");
        }
        Food food = new Food();
        return getFoodDetails(request, restaurant, food);
    }

    @Override
    public Food updateFood(FoodRequest request, Restaurant restaurant) throws Exception {
        Food food = foodRepo.findByNameAndDescription(request.getName(), request.getDescription()).orElseThrow(()-> new Exception("Food not found"));
        return getFoodDetails(request, restaurant, food);
    }

    private Food getFoodDetails(FoodRequest request, Restaurant restaurant, Food food) {
        Category category = categoryRepo.findById(request.getCategoryId())
                .orElseThrow(()-> new RuntimeException("Category not found"));
        List<IngredientsItem> ingredientsItems = new ArrayList<>();
        if(request.getIngredientIds()!=null)
            ingredientsItems = ingredientsItemRepo.findAllById(request.getIngredientIds());
        food.setPrice(request.getPrice());
        food.setName(request.getName());
        food.setDescription(request.getDescription());
        food.setSeasonal(request.isSeasonal());
        food.setVegetarian(request.isVegetarian());
        food.setRestaurant(restaurant);
        food.setCreatedAt(LocalDate.now());
        food.setIngredients(ingredientsItems);
        food.setImages(request.getImages());
        food.setCategory(category);
        categoryRepo.save(category);
        restaurant.getFoods().add(food);
        return foodRepo.save(food);
    }

    @Override
    public String deleteFood(Long id) {
        try {
            Food food = foodRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Food Not Found"));
            for (CartItem item : food.getCartItems()) {
                item.setFood(null);
                cartItemRepo.delete(item);
            }
            foodRepo.delete(food);
            return "Food Deleted Successfully";
        }catch (Exception e){
            return "Food is in use";
        }
    }

    @Override
    public List<Food> getRestaurantFood(Long id,
                                        boolean isVeg,
                                        boolean isNonVeg, boolean isSeasonal,
                                        String foodCategory) {
        List<Food> foods = foodRepo.findByRestaurantId(id);
        if(isVeg)
            foods = filterByVeg(foods);
        if(isNonVeg)
            foods = filterByNonVeg(foods);
        if(isSeasonal)
            foods = filterBySeasonal(foods);
        if(foodCategory != null && !foodCategory.isBlank())
            foods = filterByCategory(foods, foodCategory);
        return foods;
    }

    private List<Food> filterByCategory(List<Food> foods, String foodCategory) {
        return foods.stream().filter((food -> food.getCategory().getName().equals(foodCategory))).toList();
    }

    private List<Food> filterBySeasonal(List<Food> foods) {
        return foods.stream().filter(Food::isSeasonal).toList();
    }

    private List<Food> filterByVeg(List<Food> foods) {
        return foods.stream().filter(Food::isVegetarian).toList();
    }
    private List<Food> filterByNonVeg(List<Food> foods) {
        return foods.stream().filter(food -> !food.isVegetarian()).toList();
    }

    @Override
    public List<Food> searchFood(String keyword) {
        return foodRepo.searchFood(keyword);
    }

    @Override
    public Food getFood(Long id) throws Exception {
        return foodRepo.findById(id).orElseThrow(()-> new Exception("Food Not Found"));
    }

    @Override
    public List<Food> getAllFoods() {
        return foodRepo.findAll();
    }

    @Override
    public Food updateFoodStatus(Long id) throws Exception {
        Food food = foodRepo.findById(id).orElseThrow(()-> new Exception("Food Not Found"));
        food.setAvailable(!food.isAvailable());
        return foodRepo.save(food);
    }
}
