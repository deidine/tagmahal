package com.tagemahale.springboot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.tagemahale.springboot.model.Order;
import com.tagemahale.springboot.model.OrderProductDetail;
import com.tagemahale.springboot.model.Product;
import com.tagemahale.springboot.model.User;
import com.tagemahale.springboot.payload.OrderDto;
import com.tagemahale.springboot.repository.OrderProductDetailRepo;
import com.tagemahale.springboot.repository.OrderRepository;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderProductDetailRepo prodDetailRepository;

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

        Product product = new Product();
        product.setProductId(orderDto.getProductIds());
        OrderProductDetail det = new OrderProductDetail();
        det.setProduct(product);
        det.setOrder(savedOrder);
        prodDetailRepository.save(det);

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        OrderDto orderDto = mapOrderToDTO(order);
        return ResponseEntity.ok(orderDto);
    }

    private OrderDto mapOrderToDTO(Order order) {
        List<String> productNames = order.getProductDetails().stream()
                .map(productDetail -> productDetail.getProduct().getProductName())
                .collect(Collectors.toList());

        Integer userId = null;
        if (order.getBuyer() != null) {
            userId = order.getBuyer().getId();
        }

        OrderDto orderDto = new OrderDto(
                order.getId(),
                order.getDate(),
                productNames,
                userId,
                order.getQuantity(),
                order.getPaymentStatus(),
                order.getOrderStatus(),
                order.getProductDetails().isEmpty() ? null : order.getProductDetails().get(0).getProduct().getProductId()
        );

        return orderDto;
    }
}
