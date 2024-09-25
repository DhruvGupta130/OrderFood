package com.project.orderfood.DTO;

import lombok.Data;


@Data
public class OrderRequest {

    private Long restaurantId;
    private Long addressId;
}
