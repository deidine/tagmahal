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
    public ResponseEntity<Order> createOrder(@RequestBody OrderDto order) {
        System.out.println(order.toString()+"deidine2");
        Order savedOrder = new Order();
        savedOrder.setDate(new Date());
        savedOrder.setQuantity(order.getQuantity());
        savedOrder.setPaymentStatus(order.getPaymentStatus());
        User user = new User();
        user.setId(order.getUserId());
        savedOrder.setBuyer(user);

        orderRepository.save(savedOrder);

        
        Product product = new Product();
        product.setProductId(order.getProductIds());
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
        OrderDto orderDtoOrderDto = mapOrderToDTO(order);
        return ResponseEntity.ok(orderDtoOrderDto);
    }

    private OrderDto mapOrderToDTO(Order order) {
        OrderDto orderDtoOrderDto = new OrderDto();
        orderDtoOrderDto.setOrderId(order.getId());
        orderDtoOrderDto.setOrderDate(order.getDate());
        orderDtoOrderDto.setQuantity(order.getQuantity());
        orderDtoOrderDto.setUserId(order.getBuyer().getId());
        orderDtoOrderDto.setPaymentStatus(order.getPaymentStatus());
        List<String> productDTOs = order.getProductDetails().stream()
                .map(product -> {
                    return product.getProduct().getProductName();
                })
                .collect(Collectors.toList());
        orderDtoOrderDto.setProducts(productDTOs);
        return orderDtoOrderDto;
    }
}

// ..........................................................................................
// package com.tagemahale.springboot.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import com.tagemahale.springboot.model.Order;
// import com.tagemahale.springboot.model.OrderProductDetail;
// import com.tagemahale.springboot.model.Product;
// import com.tagemahale.springboot.payload.OrderDto;
// import com.tagemahale.springboot.repository.OrderProductDetailRepo;
// import com.tagemahale.springboot.repository.OrderRepository;

// import java.time.LocalDate;
// import java.util.Date;
// import java.util.List;
// import java.util.stream.Collectors;

// @RestController
// @RequestMapping("/orders")
// public class OrderController {

// @Autowired
// private OrderRepository orderRepository;

// @Autowired
// private OrderProductDetailRepo prodDetailRepository;

// @GetMapping
// public ResponseEntity<List<OrderDto>> getAllOrders() {
// List<Order> orders = orderRepository.findAll();
// List<OrderDto> orderDTOs = orders.stream()
// .map(this::mapOrderToDTO)
// .collect(Collectors.toList());
// return ResponseEntity.ok(orderDTOs);
// }

// @PostMapping
// public ResponseEntity<OrderDto> createOrder(@RequestBody OrderCreationRequest
// orderRequest) {
// // Create and save the Order entity
// Order order = new Order();
// order.setDate(new Date());
// order.setOrderStatus(orderRequest.getOrderStatus());
// order.setPaymentStatus(orderRequest.getPaymentStatus());
// order.setQuantity(orderRequest.getQuantity());
// order.setBuyer(orderRequest.getBuyerId());

// Order savedOrder = orderRepository.save(order);

// // Create and save the OrderProductDetail entities
// for (Integer productId : orderRequest.getProductIds()) {
// Product product = new Product();
// product.setProductId(productId);
// OrderProductDetail detail = new OrderProductDetail();
// detail.setProduct(product);
// detail.setOrder(savedOrder);
// prodDetailRepository.save(detail);
// }

// // Convert the saved order to OrderDto and return it
// OrderDto orderDto = mapOrderToDTO(savedOrder);
// return ResponseEntity.ok(orderDto);
// }

// @GetMapping("/{id}")
// public ResponseEntity<OrderDto> getOrderById(@PathVariable Long id) {
// Order order = orderRepository.findById(id)
// .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
// OrderDto orderDto = mapOrderToDTO(order);
// return ResponseEntity.ok(orderDto);
// }

// private OrderDto mapOrderToDTO(Order order) {
// OrderDto orderDto = new OrderDto();
// orderDto.setOrderId(order.getId());
// orderDto.setOrderDate(order.getDate());
// orderDto.setQuantity(order.getQuantity());
// orderDto.setUserId(order.getBuyer().getName());
// orderDto.setPaymentStatus(order.getPaymentStatus());
// List<String> productNames = order.getProductDetails().stream()
// .map(detail -> detail.getProduct().getProductName())
// .collect(Collectors.toList());
// orderDto.setProducts(productNames);
// return orderDto;
// }
// }

// class OrderCreationRequest {
// private LocalDate date;
// private String orderStatus;
// private String paymentStatus;
// private int quantity;
// private Long buyerId;
// private List<Integer> productIds;

// // Getters and Setters
// public LocalDate getDate() {
// return date;
// }

// public void setDate(LocalDate date) {
// this.date = date;
// }

// public String getOrderStatus() {
// return orderStatus;
// }

// public void setOrderStatus(String orderStatus) {
// this.orderStatus = orderStatus;
// }

// public String getPaymentStatus() {
// return paymentStatus;
// }

// public void setPaymentStatus(String paymentStatus) {
// this.paymentStatus = paymentStatus;
// }

// public int getQuantity() {
// return quantity;
// }

// public void setQuantity(int quantity) {
// this.quantity = quantity;
// }

// public Long getBuyerId() {
// return buyerId;
// }

// public void setBuyerId(Long buyerId) {
// this.buyerId = buyerId;
// }

// public List<Integer> getProductIds() {
// return productIds;
// }

// public void setProductIds(List<Integer> productIds) {
// this.productIds = productIds;
// }
// }