package com.tagemahale.springboot.model.entities;

 
import javax.persistence.*;

import com.tagemahale.springboot.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    @OneToOne
    @JoinColumn(name = "userid")
    private User user;
    private float TotalAmount;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cart")
    private List<CartDetalis> cartDetalis;


    public void setCartDetalis(List<CartDetalis> pro) {
    }
}
