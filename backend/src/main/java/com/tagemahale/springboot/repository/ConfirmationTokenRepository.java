package com.tagemahale.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tagemahale.springboot.model.ConfirmationToken;

@Repository
public interface ConfirmationTokenRepository 
            extends JpaRepository<ConfirmationToken, Long> {
    
    ConfirmationToken findByConfirmationToken(String token); 
}