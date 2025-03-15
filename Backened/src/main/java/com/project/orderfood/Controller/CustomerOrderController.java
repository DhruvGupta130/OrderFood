package com.project.orderfood.Controller;

import com.project.orderfood.DTO.MessageResponse;
import com.project.orderfood.DTO.OrderRequest;
import com.project.orderfood.Model.OrderDetails;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.OrderService;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class CustomerOrderController {

    private final OrderService orderService;
    private final UserService userService;

    @PostMapping("/order")
    public ResponseEntity<OrderDetails> createOrder(@RequestBody OrderRequest orderRequest,
                                                @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        OrderDetails order = orderService.createOrder(orderRequest, user);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/order/user")
    public ResponseEntity<List<OrderDetails>> getOrderDetails(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        List<OrderDetails> orderDetails = orderService.getOrderDetails(user.getId());
        return ResponseEntity.ok(orderDetails);
    }

    @DeleteMapping("order/{id}/delete")
    public ResponseEntity<MessageResponse> deleteOrder(@PathVariable("id") long id) throws Exception {
        MessageResponse message = new MessageResponse();
        orderService.deleteOrder(id);
        message.setMessage("Order deleted Successfully");
        return ResponseEntity.ok(message);
    }

    @GetMapping("order/{id}/get")
    public ResponseEntity<OrderDetails> getOrder(@PathVariable("id") long id) throws Exception {
        OrderDetails details = orderService.getOrderById(id);
        return ResponseEntity.ok(details);
    }
}
