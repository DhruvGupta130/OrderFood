package com.project.orderfood.Repository;

import com.project.orderfood.Model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {

    Optional<Restaurant> findByOwnerId(long id);

    @Query("SELECT r from Restaurant r where lower(r.name) LIKE lower(concat('%', :query, '%') ) " +
            "or lower(r.cuisineType) like lower(concat('%', :query, '%') ) ")
    List<Restaurant> findByQuery(String query);
}
