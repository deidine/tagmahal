package com.tagemahale.springboot.repository;

 
import org.springframework.data.jpa.repository.JpaRepository;

import com.tagemahale.springboot.model.Product;

public interface ProductRepo extends JpaRepository<Product,Integer> {
}
