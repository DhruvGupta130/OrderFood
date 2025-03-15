package com.project.orderfood.Service;

import com.project.orderfood.Model.IngredientsCategory;
import com.project.orderfood.Model.IngredientsItem;

import java.util.List;

public interface IngredientsService {

    IngredientsCategory createIngredientsCategory(String categoryName, long id) throws Exception;
    IngredientsCategory getIngredientsCategory(long id) throws Exception;
    List<IngredientsCategory> getIngredientsCategoriesByRestaurantId(long restaurantId) throws Exception;

    IngredientsItem createIngredientsItem(String itemName, long restaurantId, long categoryId) throws Exception;
    List<IngredientsItem> getIngredientsItemsByRestaurantId(long restaurantId);
    IngredientsItem updateStock(long id) throws Exception;
}
