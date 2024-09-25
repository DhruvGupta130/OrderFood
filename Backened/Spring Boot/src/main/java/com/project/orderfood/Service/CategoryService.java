package com.project.orderfood.Service;

import com.project.orderfood.Model.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(String categoryName, Long userId) throws Exception;
    List<Category> findCategoryByRestaurant(Long restId) throws Exception;
    Category findCategoryById(Long id) throws Exception;
    String deleteCategoryById(Long id) throws Exception;
}
