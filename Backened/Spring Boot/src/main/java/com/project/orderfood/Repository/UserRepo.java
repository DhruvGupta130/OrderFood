package com.project.orderfood.Repository;

import com.project.orderfood.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {
   Optional<User> findByEmail(String email);
}
