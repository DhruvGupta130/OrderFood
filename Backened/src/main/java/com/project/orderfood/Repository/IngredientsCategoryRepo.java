package com.project.orderfood.Repository;

import com.project.orderfood.Model.IngredientsCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientsCategoryRepo extends JpaRepository<IngredientsCategory, Long> {

    List<IngredientsCategory> findByRestaurantId(long restaurantId);
    Optional<IngredientsCategory> findByName(String name);
}
