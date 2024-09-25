package com.project.orderfood.Controller;

import com.project.orderfood.Configuration.JwtUtils;
import com.project.orderfood.DTO.LoginRequest;
import com.project.orderfood.Model.Cart;
import com.project.orderfood.Model.User;
import com.project.orderfood.Repository.CartRepo;
import com.project.orderfood.Repository.UserRepo;
import com.project.orderfood.Response.AuthResponse;
import com.project.orderfood.Service.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final CartRepo cartRepo;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> registerHandler(@RequestBody User user) {
        AuthResponse authResponse = new AuthResponse();
        HttpStatus status = HttpStatus.CREATED;
        try {
            if (userRepo.findByEmail(user.getEmail()).orElse(null) != null) {
                throw new BadCredentialsException("Email Already Exists");
            }
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepo.save(user);
            Cart cart = new Cart();
            cart.setId(savedUser.getId());
            cart.setCustomer(savedUser);
            cartRepo.save(cart);
            String token = jwtUtils.generateToken(customUserDetailsService.loadUserByUsername(user.getEmail()));
            authResponse.setToken(token);
            authResponse.setMessage("Registration Successful");
            authResponse.setRole(savedUser.getRole());
        }catch (BadCredentialsException e) {
            authResponse.setMessage(e.getMessage());
            status = HttpStatus.BAD_REQUEST;
        } catch (Exception e) {
            authResponse.setMessage("An unexpected error occurred");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(authResponse, status);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginHandler(@RequestBody LoginRequest request) {
        String email = request.getUsername();
        String password = request.getPassword();
        AuthResponse authResponse = new AuthResponse();
        HttpStatus status = HttpStatus.OK;
        try {
            User user = userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Wrong username or password"));
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
            String token = jwtUtils.generateToken(customUserDetailsService.loadUserByUsername(user.getEmail()));
            authResponse.setToken(token);
            authResponse.setMessage("Login Successful");
            authResponse.setRole(user.getRole());
        } catch (UsernameNotFoundException | BadCredentialsException e) {
            authResponse.setMessage("Invalid username or password");
            status = HttpStatus.UNAUTHORIZED;
        } catch (Exception e) {
            authResponse.setMessage("An unexpected error occurred");
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new ResponseEntity<>(authResponse, status);
    }
}
