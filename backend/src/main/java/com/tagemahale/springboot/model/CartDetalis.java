package com.tagemahale.springboot.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data 
@ToString(exclude = "cart")
public class CartDetalis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int CartDetalisId;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product products;
    private int Quantity;
    private int Amount;

    @ManyToOne
    @JoinColumn(name = "cart_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Cart cart;





}
