package com.project.orderfood.Controller;

import com.project.orderfood.DTO.ORDER_STATUS;
import com.project.orderfood.Model.OrderDetails;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.Impl.UserServiceImpl;
import com.project.orderfood.Service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin")
public class AdminOrderController {

    private final OrderService orderService;
    private final UserServiceImpl userServiceImpl;

    @PutMapping("/order/{orderId}")
    public ResponseEntity<OrderDetails> updateOrderStatus(@PathVariable Long orderId,
                                                                @RequestParam(name = "status") ORDER_STATUS orderStatus) throws Exception {
        OrderDetails orderDetails = orderService.updateOrder(orderId, orderStatus);
        return ResponseEntity.ok(orderDetails);
    }

    @GetMapping("/order/restaurant")
    public ResponseEntity<List<OrderDetails>> getAllOrders(@RequestParam(name = "status", required = false) ORDER_STATUS status,
                                                           @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        List<OrderDetails> orderDetails = orderService.getRestaurantOrder(user.getId(), status);
        return ResponseEntity.ok(orderDetails);
    }

    @PutMapping("/order/{orderId}/cancel")
    public ResponseEntity<OrderDetails> cancelOrder(@PathVariable Long orderId) throws Exception {
        OrderDetails order = orderService.cancelOrder(orderId);
        return ResponseEntity.ok(order);
    }
}
