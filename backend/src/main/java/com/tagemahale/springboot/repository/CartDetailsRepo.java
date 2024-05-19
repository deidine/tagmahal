package com.tagemahale.springboot.repository;

 
import org.springframework.data.jpa.repository.JpaRepository;

import com.tagemahale.springboot.model.entities.Cart;
import com.tagemahale.springboot.model.entities.CartDetalis;
import com.tagemahale.springboot.model.entities.Product;


public interface CartDetailsRepo extends JpaRepository<CartDetalis,Integer> {
    public void deleteByProductsAndCart(Product product, Cart cart);
    public CartDetalis findByProductsAndCart(Product product, Cart cart);
}
