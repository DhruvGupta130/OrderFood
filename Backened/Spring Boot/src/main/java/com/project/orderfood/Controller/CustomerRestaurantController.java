package com.project.orderfood.Controller;

import com.project.orderfood.DTO.RestaurantDTO;
import com.project.orderfood.Model.Food;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Model.User;
import com.project.orderfood.Repository.FoodRepo;
import com.project.orderfood.Service.RestaurantService;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
@AllArgsConstructor
public class CustomerRestaurantController {

    private final RestaurantService restaurantService;
    private final UserService userService;
    private final FoodRepo foodRepo;

    @GetMapping("/search")
    public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String name){
        List<Restaurant> list = restaurantService.getRestaurantByName(name);
        return ResponseEntity.status(HttpStatus.OK).body(list);
    }

    @GetMapping
    public ResponseEntity<List<Restaurant>> getRestaurants(){
        List<Restaurant> restaurants = restaurantService.getAllRestaurant();
        return ResponseEntity.status(HttpStatus.OK).body(restaurants);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurant> getRestaurant(@PathVariable long id) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        return ResponseEntity.status(HttpStatus.OK).body(restaurant);
    }

    @PutMapping("/{id}/add-favorites")
    public ResponseEntity<RestaurantDTO> addFavoriteRestaurant(@PathVariable long id,
                                                            @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        RestaurantDTO dto = restaurantService.addToFavorites(id, user);
        return ResponseEntity.ok(dto);
    }
}
