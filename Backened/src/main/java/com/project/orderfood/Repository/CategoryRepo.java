package com.project.orderfood.Repository;

import com.project.orderfood.Model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

    List<Category> findByRestaurantId(long restaurantId);
    Optional<Category> findByName(String name);
}
