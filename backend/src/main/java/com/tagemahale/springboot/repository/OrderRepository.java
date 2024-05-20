package com.tagemahale.springboot.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.tagemahale.springboot.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
