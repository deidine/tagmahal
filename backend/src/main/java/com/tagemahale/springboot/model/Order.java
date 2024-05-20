package com.tagemahale.springboot.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    private String paymentStatus;

    private String orderStatus;

    private int quantity;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderProductDetail> productDetails;
}
