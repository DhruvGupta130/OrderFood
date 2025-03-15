package com.project.orderfood.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.orderfood.DTO.ContactInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Restaurant {

    @Id
    private Long id;

    @OneToOne
    private User owner;

    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String cuisineType;

    @OneToOne
    private Address address;

    @Embedded
    private ContactInfo contactInfo;

    private String openingHours;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderDetails> orders = new ArrayList<>();

    @ElementCollection
    @Column(length = 1000)
    private List<String> images;

    private LocalDate registrationDate;

    private boolean isActive;

    @JsonIgnore
    @OneToMany(mappedBy = "restaurant", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Food> foods = new ArrayList<>();

}
