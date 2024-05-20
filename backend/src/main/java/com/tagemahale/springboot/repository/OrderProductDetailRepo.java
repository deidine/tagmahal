package com.tagemahale.springboot.repository;

import com.tagemahale.springboot.model.OrderProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface OrderProductDetailRepo extends JpaRepository<OrderProductDetail,Integer> {
    
}
