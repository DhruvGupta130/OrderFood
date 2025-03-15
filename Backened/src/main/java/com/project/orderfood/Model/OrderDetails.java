package com.project.orderfood.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.orderfood.DTO.ORDER_STATUS;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User customer;

    @ManyToOne
    @JsonIgnore
    private Restaurant restaurant;

    private ORDER_STATUS orderStatus;
    private LocalDate orderDate;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonIgnore
    private Address deliveryAddress;

    @OneToMany
    private List<OrderItem> items;

    private int totalQuantity;
    private Double totalPrice;
}
