package com.tagemahale.springboot.service;
 
import org.springframework.stereotype.Service;

import com.tagemahale.springboot.payload.payload.CartDetailDto;
import com.tagemahale.springboot.payload.payload.CartHelp;

@Service
public interface CartDetailsService {

    //add product
    public CartDetailDto addProduct(CartHelp cartHelp);
}
