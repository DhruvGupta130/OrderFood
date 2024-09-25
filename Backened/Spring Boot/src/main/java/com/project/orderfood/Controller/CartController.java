package com.project.orderfood.Controller;

import com.project.orderfood.DTO.CartItemRequest;
import com.project.orderfood.Model.Cart;
import com.project.orderfood.Model.CartItem;
import com.project.orderfood.Service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CartController {

    private final CartService cartService;

    @PostMapping("/cart/add")
    public ResponseEntity<CartItem> addItem(@RequestBody CartItemRequest request,
                                            @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        CartItem item = cartService.addCartItem(request, token);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/cart/update")
    public ResponseEntity<CartItem> updateItem(@RequestBody CartItemRequest request) throws Exception {
        CartItem cartItem = cartService.updateCartItem(request.getItemId(), request.getQuantity());
        return ResponseEntity.ok(cartItem);
    }

    @DeleteMapping("/cart/{id}/remove")
    public ResponseEntity<Cart> removeItem(@PathVariable("id") Long id,
                                               @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        Cart cart = cartService.removeCartItem(id, token);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/cart/clear")
    public ResponseEntity<Cart> clearCart(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        Cart cart = cartService.clearCart(token);
        return ResponseEntity.ok(cart);
    }

    @GetMapping("/cart")
    public ResponseEntity<Cart> getCart(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        Cart cart = cartService.getCartByUser(token);
        return ResponseEntity.ok(cart);
    }
}
