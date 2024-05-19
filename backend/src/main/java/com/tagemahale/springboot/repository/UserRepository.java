package com.tagemahale.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tagemahale.springboot.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
    // Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("SELECT u.emailVerified FROM User u WHERE u.email = ?1")
    Boolean findEmailVerifiedByEmail(String email);
}
