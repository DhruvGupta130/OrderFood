package com.project.orderfood.DTO;

import com.project.orderfood.Model.Address;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class RestaurantRequest {

    @NotNull
    private String name;
    @NotNull
    private String description;
    @NotNull
    private String cuisineType;
    @NotNull
    private Address address;
    @NotNull
    private ContactInfo contactInfo;
    @NotNull
    private String openingHours;
    @NotNull
    private List<String> images;
}

