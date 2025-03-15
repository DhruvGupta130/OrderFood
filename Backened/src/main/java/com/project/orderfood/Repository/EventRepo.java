package com.project.orderfood.Repository;

import com.project.orderfood.Model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepo extends JpaRepository<Event, Long> {
    List<Event> findAllByRestaurantId(long restaurantId);
}
