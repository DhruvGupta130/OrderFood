package com.project.orderfood.DTO;

import lombok.Data;

import java.util.List;

@Data
public class FoodRequest {

    private String name;
    private String description;
    private Long price;

    private Long categoryId;
    private List<String> images;

    private boolean isVegetarian;
    private boolean isSeasonal;
    private List<Long> ingredientIds;
}
