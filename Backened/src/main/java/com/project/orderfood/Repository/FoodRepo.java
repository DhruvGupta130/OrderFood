package com.project.orderfood.Repository;

import com.project.orderfood.Model.Food;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FoodRepo extends JpaRepository<Food, Long> {

    List<Food> findByRestaurantId(long restaurantId);

    @Query("SELECT f FROM Food f WHERE LOWER(f.name) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(f.category.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Food> searchFood(@Param("keyword") String keyword);

    Optional<Food> findByNameAndDescription(String name, String description);
}
