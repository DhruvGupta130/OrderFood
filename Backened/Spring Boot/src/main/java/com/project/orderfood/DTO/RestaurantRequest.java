package com.project.orderfood.DTO;

import com.project.orderfood.Model.Address;
import lombok.Data;
import lombok.NonNull;

import java.util.List;

@Data
public class RestaurantRequest {

    @NonNull
    private String name;
    @NonNull
    private String description;
    @NonNull
    private String cuisineType;
    @NonNull
    private Address address;
    @NonNull
    private ContactInfo contactInfo;
    @NonNull
    private String openingHours;
    @NonNull
    private List<String> images;
}

