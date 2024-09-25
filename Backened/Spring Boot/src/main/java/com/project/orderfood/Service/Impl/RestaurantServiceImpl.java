package com.project.orderfood.Service.Impl;

import com.project.orderfood.DTO.RestaurantDTO;
import com.project.orderfood.DTO.RestaurantRequest;
import com.project.orderfood.Model.Address;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Model.User;
import com.project.orderfood.Repository.AddressRepo;
import com.project.orderfood.Repository.RestaurantRepo;
import com.project.orderfood.Repository.UserRepo;
import com.project.orderfood.Service.RestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepo restaurantRepo;
    private final UserRepo userRepo;
    private final AddressRepo addressRepo;

    @Override
    public Restaurant createRestaurant(RestaurantRequest request, User user) throws Exception {
        if(!restaurantRepo.existsById(user.getId())) {
            Address address = addressRepo.save(request.getAddress());
            Restaurant restaurant = new Restaurant();
            restaurant.setId(user.getId());
            restaurant.setOwner(user);
            restaurant.setRegistrationDate(LocalDate.now());
            restaurant.setAddress(address);
            BeanUtils.copyProperties(request, restaurant);
            return restaurantRepo.save(restaurant);
        }
        throw new Exception("You already have a restaurant");
    }

    @Override
    public Restaurant updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepo.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        request.getAddress().setId(restaurant.getAddress().getId());
        BeanUtils.copyProperties(request, restaurant);
        addressRepo.save(restaurant.getAddress());
        return restaurantRepo.save(restaurant);
    }

    @Override
    public void deleteRestaurant(Long id) {
        if(restaurantRepo.existsById(id)) {
            restaurantRepo.deleteById(id);
        }
    }

    @Override
    public List<Restaurant> getAllRestaurant() {
        return restaurantRepo.findAll();
    }

    @Override
    public List<Restaurant> getRestaurantByName(String restaurantName) {
        return restaurantRepo.findByQuery(restaurantName);
    }

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepo.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    @Override
    public Restaurant getRestaurantByUserId(Long userId) {
        return restaurantRepo.findByOwnerId(userId).orElseThrow(() -> new RuntimeException("Restaurant not found with OwnerId "+userId));
    }

    @Override
    public RestaurantDTO addToFavorites(Long restaurantId, User user) {
        Restaurant restaurant = getRestaurantById(restaurantId);
        RestaurantDTO restaurantDTO = new RestaurantDTO();
        restaurantDTO.setId(restaurantId);
        restaurantDTO.setDescription(restaurant.getDescription());
        restaurantDTO.setActive(restaurant.isActive());
        restaurantDTO.setName(restaurant.getName());
        restaurantDTO.setAddress(restaurant.getAddress());
        restaurantDTO.setImage(restaurant.getImages().getFirst());
        List<RestaurantDTO> favorites = user.getFavorites();
        boolean isPresent = favorites.removeIf(s->s.getId().equals(restaurantId));
        if(!isPresent) {
            user.getFavorites().add(restaurantDTO);
        }
        userRepo.save(user);
        return restaurantDTO;
    }

    @Override
    public Restaurant updateRestaurantStatus(Long id) {
        Restaurant restaurant = getRestaurantById(id);
        restaurant.setActive(!restaurant.isActive());
        return restaurantRepo.save(restaurant);
    }
}
