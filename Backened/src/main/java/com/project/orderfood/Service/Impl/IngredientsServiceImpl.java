package com.project.orderfood.Service.Impl;

import com.project.orderfood.Model.IngredientsCategory;
import com.project.orderfood.Model.IngredientsItem;
import com.project.orderfood.Model.Restaurant;
import com.project.orderfood.Repository.IngredientsCategoryRepo;
import com.project.orderfood.Repository.IngredientsItemRepo;
import com.project.orderfood.Service.IngredientsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class IngredientsServiceImpl implements IngredientsService {

    private final IngredientsItemRepo ingredientsItemRepo;
    private final IngredientsCategoryRepo ingredientsCategoryRepo;
    private final RestaurantServiceImpl restaurantService;

    @Override
    public IngredientsCategory createIngredientsCategory(String categoryName, long id) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(id);
        if(ingredientsCategoryRepo.findByName(categoryName).isPresent()) {
            throw new Exception("This Ingredient Category already exists");
        }
        IngredientsCategory category = new IngredientsCategory();
        category.setRestaurant(restaurant);
        category.setName(categoryName);
        return ingredientsCategoryRepo.save(category);
    }

    @Override
    public IngredientsCategory getIngredientsCategory(long id) throws Exception {
        return ingredientsCategoryRepo.findById(id)
                .orElseThrow(()-> new Exception("Category not found"));
    }

    @Override
    public List<IngredientsCategory> getIngredientsCategoriesByRestaurantId(long restaurantId) {
        restaurantService.getRestaurantById(restaurantId);
        return ingredientsCategoryRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem createIngredientsItem(String itemName, long restaurantId, long categoryId) throws Exception {
        Restaurant restaurant = restaurantService.getRestaurantById(restaurantId);
        IngredientsCategory category = this.getIngredientsCategory(categoryId);
        if (ingredientsItemRepo.findByNameAndCategoryId(itemName, categoryId).isPresent()) {
            throw new Exception("This Item already exists");
        }
        IngredientsItem item = new IngredientsItem();
        item.setRestaurant(restaurant);
        item.setName(itemName);
        item.setCategory(category);
        return ingredientsItemRepo.save(item);
    }

    @Override
    public List<IngredientsItem> getIngredientsItemsByRestaurantId(long restaurantId) {
        return ingredientsItemRepo.findByRestaurantId(restaurantId);
    }

    @Override
    public IngredientsItem updateStock(long id) throws Exception {
        IngredientsItem item = ingredientsItemRepo.findById(id).orElseThrow(()-> new Exception("Item not found"));
        item.setAvailable(!item.isAvailable());
        return ingredientsItemRepo.save(item);
    }
}
