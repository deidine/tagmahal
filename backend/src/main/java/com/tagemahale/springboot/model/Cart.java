package com.tagemahale.springboot.model;

 
import javax.persistence.*;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    // @JsonIgnore
// @OneToOne(fetch = FetchType.LAZY )
//         @JoinColumn(name = "userid", referencedColumnName = "id", nullable = false )
//         @OneToOne (cascade = CascadeType.MERGE  )
//   @OnDelete(action = OnDeleteAction.CASCADE)
//         @JoinColumn(name = "userid")

        @OneToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "userid", referencedColumnName = "id", nullable = false)
    private User user;
    private float TotalAmount;


    @OneToMany(cascade = CascadeType.ALL,mappedBy = "cart", orphanRemoval = true)
    private List<CartDetalis> cartDetalis;


    public void setCartDetalis(List<CartDetalis> pro) {
    }
}
