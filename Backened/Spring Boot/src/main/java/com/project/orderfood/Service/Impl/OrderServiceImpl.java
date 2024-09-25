package com.project.orderfood.Service.Impl;

import com.project.orderfood.DTO.ORDER_STATUS;
import com.project.orderfood.DTO.OrderRequest;
import com.project.orderfood.Model.*;
import com.project.orderfood.Repository.*;
import com.project.orderfood.Service.CartService;
import com.project.orderfood.Service.OrderService;
import com.project.orderfood.Service.RestaurantService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderDetailsRepo orderDetailsRepo;
    private final OrderItemRepo orderItemRepo;
    private final AddressRepo addressRepo;
    private final RestaurantService restaurantService;
    private final CartService cartService;

    @Override
    public OrderDetails createOrder(OrderRequest request, User user) throws Exception {
        Address address = addressRepo.findById(request.getAddressId()).orElseThrow(()-> new RuntimeException("Address not found"));
        Restaurant restaurant = restaurantService.getRestaurantById(request.getRestaurantId());
        OrderDetails createdOrder = new OrderDetails();
        createdOrder.setCustomer(user);
        createdOrder.setOrderDate(LocalDate.now());
        createdOrder.setDeliveryAddress(address);
        createdOrder.setRestaurant(restaurant);
        createdOrder.setOrderStatus(ORDER_STATUS.PENDING);
        Cart cart = cartService.getCartByUser(user);
        List<OrderItem> orderItems = new ArrayList<>();
        for(CartItem item : cart.getItems()){
            OrderItem orderItem = new OrderItem();
            List<IngredientsItem> ingredients = new ArrayList<>(item.getIngredients());
            orderItem.setIngredients(ingredients);
            orderItem.setFood(item.getFood());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(item.getTotalPrice());
            orderItems.add(orderItemRepo.save(orderItem));
        }
        createdOrder.setItems(orderItems);
        createdOrder.setTotalPrice(cartService.getCartTotal(cart));
        OrderDetails savedOrder = orderDetailsRepo.save(createdOrder);
        restaurant.getOrders().add(savedOrder);
        return savedOrder;
    }

    @Override
    public OrderDetails updateOrder(Long orderId, ORDER_STATUS orderStatus) throws Exception {
        OrderDetails orderDetails = orderDetailsRepo.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
        orderDetails.setOrderStatus(orderStatus);
        return orderDetailsRepo.save(orderDetails);
    }

    @Override
    public OrderDetails cancelOrder(Long orderId) throws Exception {
        OrderDetails orderDetails = orderDetailsRepo.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
        orderDetails.setOrderStatus(ORDER_STATUS.CANCELLED);
        return orderDetailsRepo.save(orderDetails);
    }

    @Override
    public void deleteOrder(Long orderId) throws Exception {
        OrderDetails orderDetails = orderDetailsRepo.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
        if (orderDetails.getOrderStatus().equals(ORDER_STATUS.CANCELLED)) {
            orderDetails.setDeliveryAddress(null);
            orderDetailsRepo.delete(orderDetails);
            return;
        }
        throw new Exception("Only cancelled order can be deleted");
    }

    @Override
    public List<OrderDetails> getOrderDetails(Long userId) {
        return orderDetailsRepo.findByCustomerId(userId);
    }

    @Override
    public List<OrderDetails> getRestaurantOrder(Long restaurantId, ORDER_STATUS orderStatus) {
        List<OrderDetails> orderDetailsList = orderDetailsRepo.findByRestaurantId(restaurantId);
        if(orderStatus!=null){
            orderDetailsList = orderDetailsList.stream()
                    .filter(orderDetails -> orderDetails.getOrderStatus().equals(orderStatus)).toList();
        }
        return orderDetailsList;
    }

    @Override
    public OrderDetails getOrderById(Long orderId) throws Exception {
        return orderDetailsRepo.findById(orderId).orElseThrow(()->new Exception("Order Not Found"));
    }
}
