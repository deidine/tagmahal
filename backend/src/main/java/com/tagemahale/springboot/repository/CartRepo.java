package com.tagemahale.springboot.repository;

 
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tagemahale.springboot.model.Cart;
import com.tagemahale.springboot.model.User;


public interface CartRepo extends JpaRepository<Cart,Integer> {
   public Cart findByUser(User user);
//   public Cart findByUser_id(Integer Id);
}
