package com.project.orderfood.Service.Impl;

import com.project.orderfood.Configuration.JwtUtils;
import com.project.orderfood.DTO.AddressDTO;
import com.project.orderfood.Model.Address;
import com.project.orderfood.Model.OrderDetails;
import com.project.orderfood.Model.User;
import com.project.orderfood.Repository.AddressRepo;
import com.project.orderfood.Repository.OrderDetailsRepo;
import com.project.orderfood.Repository.UserRepo;
import com.project.orderfood.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepo userRepo;
    private final JwtUtils jwtUtils;
    private final AddressRepo addressRepo;
    private final OrderDetailsRepo orderDetailsRepo;

    @Override
    public User findByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with email Not Found"));
    }

    @Override
    public User findByToken(String token) {
        String email = jwtUtils.parseToken(token).getSubject();
        return userRepo.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User with email Not Found"));
    }

    @Override
    public User createAddress(Address address, String token) {
        User user = this.findByToken(token);
        user.getAddresses().add(addressRepo.save(address));
        return userRepo.save(user);
    }

    @Override
    public User updateAddress(AddressDTO addressDTO, String token) {
        User user = this.findByToken(token);
        Address address = addressRepo.findById(addressDTO.getAddress_id()).orElseThrow(() -> new RuntimeException("Address Not Found"));
        int index = user.getAddresses().indexOf(address);
        BeanUtils.copyProperties(addressDTO, address);
        user.getAddresses().set(index, addressRepo.save(address));
        return userRepo.save(user);
    }

    @Override
    public User deleteAddress(Long id, String token) {
        Address address = addressRepo.findById(id).orElseThrow(() ->  new RuntimeException("Address Not Found"));
        User user = this.findByToken(token);
        List<OrderDetails> orderDetailsList = orderDetailsRepo.findByDeliveryAddress(address);
        for(OrderDetails orderDetails : orderDetailsList) {
            orderDetails.setDeliveryAddress(null);
            orderDetailsRepo.save(orderDetails);
        }
        user.getAddresses().remove(address);
        addressRepo.delete(address);
        return userRepo.save(user);
    }
}
