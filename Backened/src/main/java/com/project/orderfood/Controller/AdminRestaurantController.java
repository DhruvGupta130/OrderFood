package com.project.orderfood.Controller;

import com.project.orderfood.DTO.EventResponse;
import com.project.orderfood.DTO.MessageResponse;
import com.project.orderfood.DTO.RestaurantRequest;
import com.project.orderfood.Model.Event;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Model.User;
import com.project.orderfood.Repository.EventRepo;
import com.project.orderfood.Service.RestaurantService;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/restaurants")
@AllArgsConstructor
public class AdminRestaurantController {

    private final RestaurantService restaurantService;
    private final UserService userService;
    private final EventRepo eventRepo;

    @PostMapping()
    public ResponseEntity<Restaurant> createRestaurant(@RequestBody RestaurantRequest restaurant,
                                                       @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        Restaurant rest = restaurantService.createRestaurant(restaurant, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(rest);
    }

    @PutMapping("/update")
    public ResponseEntity<Restaurant> updateRestaurant(@RequestBody RestaurantRequest restaurant,
                                                       @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        Restaurant rest = restaurantService.updateRestaurant(user.getId(), restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(rest);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<MessageResponse> deleteRestaurant(@RequestHeader("Authorization") String token) throws Exception {
        MessageResponse messageResponse = new MessageResponse();
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        restaurantService.deleteRestaurant(user.getId());
        messageResponse.setMessage("Restaurant deleted Successfully");
        return ResponseEntity.status(HttpStatus.OK).body(messageResponse);
    }

    @PutMapping("/status")
    public ResponseEntity<Restaurant> updateStatus(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        Restaurant restaurant = restaurantService.updateRestaurantStatus(user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurant);
    }

    @GetMapping("/user")
    public ResponseEntity<Restaurant> findRestaurant(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        Restaurant restaurant = restaurantService.getRestaurantById(user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(restaurant);
    }

    @GetMapping("/events/{id}")
    public List<Event> getRestaurantEvents(@PathVariable long id) {
        return eventRepo.findAllByRestaurantId(id);
    }

    @PostMapping("/events/{id}")
    public EventResponse restaurantEvent(@PathVariable long id, @RequestBody Event event) {
        EventResponse eventResponse = new EventResponse();
        try {
            event.setRestaurant(restaurantService.getRestaurantById(id));
            eventRepo.save(event);
            eventResponse.setMessage("Event successfully created");
        }catch (Exception e){
            eventResponse.setMessage(e.getMessage());
        }
        return eventResponse;
    }
}
