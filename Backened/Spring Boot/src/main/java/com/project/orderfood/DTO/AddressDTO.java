package com.project.orderfood.DTO;

import lombok.Data;

@Data
public class AddressDTO {

    private Long address_id;
    private String type;
    private String street;
    private String city;
    private String state;
    private int zip;
    private String country;
}
