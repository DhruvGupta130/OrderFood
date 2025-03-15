package com.project.orderfood.Controller;

import com.project.orderfood.DTO.FoodRequest;
import com.project.orderfood.DTO.MessageResponse;
import com.project.orderfood.Model.Food;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.FoodService;
import com.project.orderfood.Service.Impl.UserServiceImpl;
import com.project.orderfood.Service.RestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/food")
public class AdminFoodController {

    private final FoodService foodService;
    private final RestaurantService restaurantService;
    private final UserServiceImpl userServiceImpl;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody FoodRequest foodRequest,
                                           @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        Restaurant restaurant = restaurantService.getRestaurantById(user.getId());
        Food food = foodService.createFood(foodRequest, restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(food);
    }

    @PutMapping
    public ResponseEntity<Food> updateFood(@RequestBody FoodRequest foodRequest,@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        Restaurant restaurant = restaurantService.getRestaurantById(user.getId());
        Food food = foodService.updateFood(foodRequest, restaurant);
        return ResponseEntity.status(HttpStatus.OK).body(food);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id) throws Exception {
        String message = foodService.deleteFood(id);
        MessageResponse response = new MessageResponse();
        response.setMessage(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateAvailability(@PathVariable Long id) throws Exception {
        Food food = foodService.updateFoodStatus(id);
        return ResponseEntity.status(HttpStatus.OK).body(food);
    }
}
