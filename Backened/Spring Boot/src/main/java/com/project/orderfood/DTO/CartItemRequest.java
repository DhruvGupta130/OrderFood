package com.project.orderfood.DTO;

import lombok.Data;

import java.util.List;

@Data
public class CartItemRequest {

    private Long foodId;
    private Long itemId;
    private int quantity;
    private List<Long> ingredientIds;
}
