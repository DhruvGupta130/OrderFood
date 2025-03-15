package com.project.orderfood.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Cart {

    @Id
    private Long id;

    @OneToOne
    private User customer;

    private double total;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> items = new ArrayList<>();
}
