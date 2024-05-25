package com.tagemahale.springboot.repository;

 
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tagemahale.springboot.model.Cart;
import com.tagemahale.springboot.model.CartDetalis;
import com.tagemahale.springboot.model.Product;


public interface CartDetailsRepo extends JpaRepository<CartDetalis,Integer> {
    public void deleteByProductsAndCart(Product product, Cart cart);
    public CartDetalis findByProductsAndCart(Product product, Cart cart);
    public List<CartDetalis> findByCart( Cart cart);
}
