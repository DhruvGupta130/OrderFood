package com.project.orderfood.DTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Username is Required")
    private String username;
    @NotBlank(message = "Password is Required")
    private String password;
}
