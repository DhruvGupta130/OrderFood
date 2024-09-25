package com.project.orderfood.Service.Impl;

import com.project.orderfood.DTO.CartItemRequest;
import com.project.orderfood.Model.*;
import com.project.orderfood.Repository.CartItemRepo;
import com.project.orderfood.Repository.CartRepo;
import com.project.orderfood.Repository.IngredientsItemRepo;
import com.project.orderfood.Service.CartService;
import com.project.orderfood.Service.FoodService;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepo cartRepo;
    private final CartItemRepo cartItemRepo;
    private final UserService userService;
    private final FoodService foodService;
    private final IngredientsItemRepo ingredientsItemRepo;

    @Override
    public CartItem addCartItem(CartItemRequest request, String jwt) throws Exception {
        User user = userService.findByToken(jwt);
        Food food = foodService.getFood(request.getFoodId());
        List<IngredientsItem> ingredientsItems = ingredientsItemRepo.findAllById(request.getIngredientIds());
        Cart cart = cartRepo.findById(user.getId()).orElseThrow(() -> new Exception("Cart not found"));

        Optional<CartItem> existingItemOpt = cart.getItems().stream()
                .filter(cartItem -> cartItem.getFood().equals(food))
                .findFirst();

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            return updateCartItem(existingItem.getId(), existingItem.getQuantity() + request.getQuantity());
        }

        CartItem newCartItem = new CartItem();
        newCartItem.setCart(cart);
        newCartItem.setQuantity(request.getQuantity());
        newCartItem.setFood(food);
        newCartItem.setIngredients(ingredientsItems);
        newCartItem.setTotalPrice(newCartItem.getQuantity() * food.getPrice());

        CartItem savedCartItem = cartItemRepo.save(newCartItem);
        cart.getItems().add(savedCartItem);
        cart.setTotal(cart.getTotal() + savedCartItem.getTotalPrice());
        cartRepo.save(cart);

        return savedCartItem;
    }

    @Override
    public CartItem updateCartItem(Long itemId, int quantity) throws Exception {
        CartItem item = cartItemRepo.findById(itemId).orElseThrow(() -> new Exception("Cart item not found"));

        double oldTotalPrice = item.getTotalPrice();
        item.setQuantity(quantity);
        item.setTotalPrice(quantity * item.getFood().getPrice());

        Cart cart = item.getCart();
        double newTotal = cart.getTotal() - oldTotalPrice + item.getTotalPrice();
        cart.setTotal(newTotal);

        cartRepo.save(cart);
        return cartItemRepo.save(item);
    }

    @Override
    public Cart removeCartItem(Long itemId, String jwt) throws Exception {
        User user = userService.findByToken(jwt);
        Cart cart = cartRepo.findById(user.getId()).orElseThrow(() -> new Exception("Cart not found"));

        CartItem itemToRemove = cartItemRepo.findById(itemId).orElseThrow(() -> new Exception("Cart item not found"));

        cart.getItems().remove(itemToRemove);
        cart.setTotal(cart.getTotal() - itemToRemove.getTotalPrice());

        cartItemRepo.delete(itemToRemove);
        cartRepo.save(cart);

        return cart;
    }

    @Override
    public Double getCartTotal(Cart cart) {
        return cart.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getFood().getPrice())
                .sum();
    }

    @Override
    public Cart getCartByUser(String token) throws Exception {
        User user = userService.findByToken(token);
        return getCartByUser(user);
    }

    @Override
    public Cart getCartByUser(User user) throws Exception {
        return cartRepo.findById(user.getId()).orElseThrow(() -> new Exception("Cart not found"));
    }

    @Override
    public Cart clearCart(String token) throws Exception {
        User user = userService.findByToken(token);
        Cart cart = cartRepo.findById(user.getId()).orElseThrow(() -> new Exception("Cart not found"));
        List<CartItem> itemsToRemove = new ArrayList<>(cart.getItems());
        cart.getItems().clear();
        cart.setTotal(0.0);
        cartRepo.save(cart);
        cartItemRepo.deleteAll(itemsToRemove);

        return cartRepo.save(cart);
    }
}