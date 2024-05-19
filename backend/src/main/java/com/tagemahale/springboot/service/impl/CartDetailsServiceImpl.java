package com.tagemahale.springboot.service.impl;

 
import org.springframework.beans.factory.annotation.Autowired;

import com.tagemahale.springboot.payload.CartDetailDto;
import com.tagemahale.springboot.payload.CartHelp;
import com.tagemahale.springboot.repository.CartRepo;
import com.tagemahale.springboot.repository.UserRepository;
import com.tagemahale.springboot.service.CartDetailsService;

public class CartDetailsServiceImpl implements CartDetailsService{

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CartRepo cartRepo;




    @Override
    public CartDetailDto addProduct(CartHelp cartHelp) {
        int productId=cartHelp.getProductId();
        int quantity= cartHelp.getQuantity();
        String userEmail= cartHelp.getUserEmail();




        //get user





        return null;
    }
}
