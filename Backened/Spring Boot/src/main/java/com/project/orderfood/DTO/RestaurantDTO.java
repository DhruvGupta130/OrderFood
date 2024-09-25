package com.project.orderfood.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.orderfood.Model.Address;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Embeddable
public class RestaurantDTO {

    private Long id;
    private String description;
    private boolean isActive;

    @ManyToOne
    private Address address;

    private String name;

    private String image;
}
