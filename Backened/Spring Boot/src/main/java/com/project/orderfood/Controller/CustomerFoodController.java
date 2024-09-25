package com.project.orderfood.Controller;

import com.project.orderfood.Model.Food;
import com.project.orderfood.Service.FoodService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/food")
public class CustomerFoodController {

    private final FoodService foodService;

    @GetMapping("/search")
    public ResponseEntity<List<Food>> searchFood(@RequestParam String search) {
        List<Food> foods = foodService.searchFood(search);
        return ResponseEntity.ok(foods);
    }

    @GetMapping("/restaurant/{id}")
    public ResponseEntity<List<Food>> searchRestaurant(@PathVariable Long id,
                                                       @RequestParam(name = "veg", required = false) boolean isVegetarian,
                                                       @RequestParam(name = "non-veg", required = false) boolean isNonVegetarian,
                                                       @RequestParam(name = "seasonal", required = false) boolean isSeasonal,
                                                       @RequestParam(name = "category", required = false) String foodCategory) {
        List<Food> foods = foodService.getRestaurantFood(id, isVegetarian, isNonVegetarian, isSeasonal, foodCategory);
        return ResponseEntity.ok(foods);
    }

    @GetMapping
    public ResponseEntity<List<Food>> getAllFood(){
        return ResponseEntity.status(HttpStatus.OK).body(foodService.getAllFoods());
    }
}
