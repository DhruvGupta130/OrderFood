package com.project.orderfood.Service;

import com.project.orderfood.DTO.FoodRequest;
import com.project.orderfood.Model.Food;
import com.project.orderfood.Model.Restaurant;

import java.util.List;

public interface FoodService {

    Food createFood(FoodRequest food, Restaurant restaurant) throws Exception;
    Food updateFood(FoodRequest food, Restaurant restaurant) throws Exception;
    String deleteFood(Long id) throws Exception;
    List<Food> getRestaurantFood(Long id, boolean isVeg, boolean isNonVeg, boolean isSeasonal, String foodCategory);
    List<Food> searchFood(String keyword);
    Food getFood(Long id) throws Exception;
    List<Food> getAllFoods();
    Food updateFoodStatus(Long id) throws Exception;

}
