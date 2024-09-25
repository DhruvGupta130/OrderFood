package com.project.orderfood.Service;

import com.project.orderfood.DTO.RestaurantDTO;
import com.project.orderfood.DTO.RestaurantRequest;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Model.User;

import java.util.List;

public interface RestaurantService {

    Restaurant createRestaurant(RestaurantRequest request, User user) throws Exception;
    Restaurant updateRestaurant(Long id, RestaurantRequest request) throws Exception;
    void deleteRestaurant(Long id) throws Exception;
    List<Restaurant> getAllRestaurant();
    List<Restaurant> getRestaurantByName(String restaurantName);
    Restaurant getRestaurantById(Long id) throws Exception;
    Restaurant getRestaurantByUserId(Long userId) throws Exception;
    RestaurantDTO addToFavorites(Long restaurantId, User user) throws Exception;
    Restaurant updateRestaurantStatus(Long id) throws Exception;

}
