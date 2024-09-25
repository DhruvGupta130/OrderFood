package com.project.orderfood.Controller;

import com.project.orderfood.DTO.IngredientsRequest;
import com.project.orderfood.Model.IngredientsCategory;
import com.project.orderfood.Model.IngredientsItem;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.Impl.UserServiceImpl;
import com.project.orderfood.Service.IngredientsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/admin/ingredients")
public class IngredientsController {

    private final IngredientsService ingredientsService;
    private final UserServiceImpl userServiceImpl;

    @PostMapping("/category")
    public ResponseEntity<IngredientsCategory> createIngredientsCategory(@RequestBody IngredientsRequest ingredients,
                                                                         @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        IngredientsCategory category = ingredientsService.createIngredientsCategory(ingredients.getName(), user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }

    @PostMapping
    public ResponseEntity<IngredientsItem> createIngredientsItem(@RequestBody IngredientsRequest ingredients,
                                                                 @RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        IngredientsItem item = ingredientsService.createIngredientsItem(ingredients.getName(), user.getId(), ingredients.getCategoryId());
        return ResponseEntity.status(HttpStatus.CREATED).body(item);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<IngredientsItem> updateIngredientsItem(@PathVariable long id) throws Exception {
        IngredientsItem item = ingredientsService.updateStock(id);
        return ResponseEntity.status(HttpStatus.OK).body(item);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<List<IngredientsItem>> restaurantIngredients(@RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        User user = userServiceImpl.findByToken(token);
        List<IngredientsItem> items = ingredientsService.getIngredientsItemsByRestaurantId(user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(items);
    }

    @GetMapping("/restaurant/category")
    public ResponseEntity<List<IngredientsCategory>> restaurantIngredientsCategory(@RequestHeader("Authorization") String token) throws Exception {
        token = token.replace("Bearer ", "");
        Long id = userServiceImpl.findByToken(token).getId();
        List<IngredientsCategory> categories = ingredientsService.getIngredientsCategoriesByRestaurantId(id);
        return ResponseEntity.ok(categories);
    }
}
