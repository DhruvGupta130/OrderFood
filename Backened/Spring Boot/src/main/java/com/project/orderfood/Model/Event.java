package com.project.orderfood.Model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String name;
    private String eventLocation;
    private String startDate;
    private String endDate;
    private String image_url;
    @ManyToOne
    private Restaurant restaurant;
}
