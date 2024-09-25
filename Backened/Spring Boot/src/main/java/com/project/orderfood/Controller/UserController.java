package com.project.orderfood.Controller;

import com.project.orderfood.DTO.AddressDTO;
import com.project.orderfood.Model.Address;
import com.project.orderfood.Model.User;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @GetMapping("/profile")
    public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwtToken) {
        jwtToken = jwtToken.replace("Bearer ", "");
        User user = userService.findByToken(jwtToken);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/address")
    public ResponseEntity<User> AddUserAddress(@RequestBody Address address, @RequestHeader("Authorization") String jwtToken) {
        jwtToken = jwtToken.replace("Bearer ", "");
        User user = userService.createAddress(address, jwtToken);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/address/{id}")
    public ResponseEntity<User> UpdateUserAddress(@PathVariable Long id, @RequestBody AddressDTO address, @RequestHeader("Authorization") String jwtToken) {
        address.setAddress_id(id);
        jwtToken = jwtToken.replace("Bearer ", "");
        User user = userService.updateAddress(address, jwtToken);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/address")
    public ResponseEntity<User> DeleteUserAddress(@RequestParam Long id, @RequestHeader("Authorization") String jwtToken) {
        jwtToken = jwtToken.replace("Bearer ", "");
        User user = userService.deleteAddress(id, jwtToken);
        return ResponseEntity.ok(user);
    }
}
