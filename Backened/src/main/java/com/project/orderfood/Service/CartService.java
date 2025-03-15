package com.project.orderfood.Service;

import com.project.orderfood.DTO.CartItemRequest;
import com.project.orderfood.Model.Cart;
import com.project.orderfood.Model.CartItem;
import com.project.orderfood.Model.User;

public interface CartService {

    CartItem addCartItem(CartItemRequest request, String jwt) throws Exception;
    CartItem updateCartItem(Long itemId, int quantity) throws Exception;
    Cart removeCartItem(Long itemId, String jwt) throws Exception;
    Double getCartTotal(Cart cart) throws Exception;
    Cart getCartByUser(String token) throws Exception;
    Cart getCartByUser(User user) throws Exception;
    Cart clearCart(String token) throws Exception;
}
