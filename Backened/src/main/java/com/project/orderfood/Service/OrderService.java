package com.project.orderfood.Service;

import com.project.orderfood.DTO.ORDER_STATUS;
import com.project.orderfood.DTO.OrderRequest;
import com.project.orderfood.Model.OrderDetails;
import com.project.orderfood.Model.User;

import java.util.List;

public interface OrderService {

    OrderDetails createOrder(OrderRequest request, User user) throws Exception;
    OrderDetails updateOrder(Long orderId, ORDER_STATUS orderStatus) throws Exception;
    OrderDetails cancelOrder(Long orderId) throws Exception;
    void deleteOrder(Long orderId) throws Exception;
    List<OrderDetails> getOrderDetails(Long userId) throws Exception;
    List<OrderDetails> getRestaurantOrder(Long restaurantId, ORDER_STATUS orderStatus) throws Exception;
    OrderDetails getOrderById(Long orderId) throws Exception;
}
