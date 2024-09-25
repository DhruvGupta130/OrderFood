package com.project.orderfood.Response;

import com.project.orderfood.DTO.USER_ROLES;
import lombok.Data;

@Data
public class AuthResponse {

    private String token;
    private String message;
    private USER_ROLES role;
}
