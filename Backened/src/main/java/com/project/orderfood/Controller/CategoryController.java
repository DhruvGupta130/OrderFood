package com.project.orderfood.Controller;

import com.project.orderfood.DTO.MessageResponse;
import com.project.orderfood.Model.Category;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.CategoryService;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CategoryController {

    private final CategoryService categoryService;
    private final UserService userService;

    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userService.findByToken(token);
        Category cat = categoryService.createCategory(category.getName(), user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(cat);
    }

    @GetMapping("/category/restaurant/{restaurantId}")
    public ResponseEntity<List<Category>> getRestaurantCategories(@PathVariable Long restaurantId) throws Exception {
        List<Category> cat = categoryService.findCategoryByRestaurant(restaurantId);
        return ResponseEntity.status(HttpStatus.OK).body(cat);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable Long id) throws Exception {
        Category category = categoryService.findCategoryById(id);
        return ResponseEntity.status(HttpStatus.OK).body(category);
    }

    @DeleteMapping("/admin/category/delete/{id}")
    public ResponseEntity<MessageResponse> deleteCategory(@PathVariable Long id) throws Exception {
        MessageResponse response = new MessageResponse();
        String message = categoryService.deleteCategoryById(id);
        response.setMessage(message);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
