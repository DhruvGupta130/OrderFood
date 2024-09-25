package com.project.orderfood.DTO;

import com.project.orderfood.Model.IngredientsItem;
import lombok.Data;

import java.util.List;

@Data
public class CartItemRequest {

    private Long foodId;
    private Long itemId;
    private int quantity;
    private List<Long> ingredientIds;
}
