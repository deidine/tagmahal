package com.tagemahale.springboot.model;


import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@ToString
public class StockEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int entryId;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Product product;

    private Date date;
    private int stockAvailable;
    private int stockOut,stockIn;
    private String description;
    private float salePrice;
    private float purchasePrice;
    private boolean validate;
}
