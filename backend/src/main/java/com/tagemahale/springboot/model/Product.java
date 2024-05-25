package com.tagemahale.springboot.model;

import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import java.util.List;
@Entity
@NoArgsConstructor
@Data
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ProductId;
    @Column
    private String ProductName;

    private String Description;
    private Float quantite;
    
    private float purchasePrice;
    
    private float purchasePriceUnit;
    private Float sellePrice;
    @Column(length = 65555)
    private String Img;
    // private float stock;
 @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    @OnDelete(action = OnDeleteAction.CASCADE)
  
    private List<CartDetalis> list;
 
    // @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    // @OnDelete(action = OnDeleteAction.CASCADE)
 
    // private List<StockEntry> stockEntries;
}