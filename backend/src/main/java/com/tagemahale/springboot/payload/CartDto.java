package com.tagemahale.springboot.payload;
 
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

import com.tagemahale.springboot.payload.UserDto;

@ToString
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDto {
    private int Id;
    private UserDto user;
    private float TotalAmount;
    private List<CartDetailDto> cartDetalis;
}
