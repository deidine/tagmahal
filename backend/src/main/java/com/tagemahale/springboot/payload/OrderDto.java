package com.tagemahale.springboot.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import com.tagemahale.springboot.model.User;

import java.util.Date;
import java.util.List;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {
    private Long orderId;
    private Date orderDate; 
    private Integer  userId;
    private float Quantity;
    private String paymentStatus;
    private String orderStatus; 
   
    

}
