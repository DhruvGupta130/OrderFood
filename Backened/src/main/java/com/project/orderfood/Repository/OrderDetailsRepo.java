package com.project.orderfood.Repository;

import com.project.orderfood.Model.Address;
import com.project.orderfood.Model.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailsRepo extends JpaRepository<OrderDetails, Long> {

    List<OrderDetails> findByCustomerId(long userId);
    List<OrderDetails> findByRestaurantId(long restaurantId);
    List<OrderDetails> findByDeliveryAddress(Address address);
}
