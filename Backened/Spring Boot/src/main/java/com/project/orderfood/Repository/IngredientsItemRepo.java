package com.project.orderfood.Repository;

import com.project.orderfood.Model.IngredientsItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientsItemRepo extends JpaRepository<IngredientsItem, Long> {
    Optional<IngredientsItem> findByNameAndCategoryId(String name, long categoryId);
    List<IngredientsItem> findByRestaurantId(long restaurantId);
}
