package com.tagemahale.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tagemahale.springboot.model.Order;
import com.tagemahale.springboot.model.User;
import com.tagemahale.springboot.payload.OrderDto;
import com.tagemahale.springboot.repository.OrderRepository;
import com.tagemahale.springboot.service.CartService;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private CartService cartService;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        List<OrderDto> orderDTOs = orders.stream()
                .map(this::mapOrderToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(orderDTOs);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto orderDto) {
        Order savedOrder = new Order();
        savedOrder.setDate(new Date());
        savedOrder.setQuantity(orderDto.getQuantity());
        savedOrder.setPaymentStatus(orderDto.getPaymentStatus());
        savedOrder.setOrderStatus(orderDto.getOrderStatus());

        User user = new User();
        user.setId(orderDto.getUserId());
        savedOrder.setBuyer(user);
        orderRepository.save(savedOrder);

        return ResponseEntity.ok(savedOrder);

    }

    @DeleteMapping("/{email}")
  public  void deleteCardByCreateOrder(@PathVariable("email") String email) {
        this.cartService.RemoveByCart(email);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        OrderDto orderDto = mapOrderToDTO(order);
        return ResponseEntity.ok(orderDto);
    }

    private OrderDto mapOrderToDTO(Order order) {

        Integer userId = null;
        if (order.getBuyer() != null) {
            userId = order.getBuyer().getId();
        }

        OrderDto orderDto = new OrderDto(
                order.getId(),
                order.getDate(),
                userId,
                order.getQuantity(),
                order.getPaymentStatus(),
                order.getOrderStatus());

        return orderDto;
    }
}
