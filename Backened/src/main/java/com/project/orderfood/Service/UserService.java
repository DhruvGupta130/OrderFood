package com.project.orderfood.Service;

import com.project.orderfood.DTO.AddressDTO;
import com.project.orderfood.Model.Address;
import com.project.orderfood.Model.User;

public interface UserService {
    User findByToken(String token);
    User createAddress(Address address, String token);
    User updateAddress(AddressDTO addressDTO, String token);
    User deleteAddress(Long id, String token);
}
