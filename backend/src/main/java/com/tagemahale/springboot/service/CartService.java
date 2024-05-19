package com.tagemahale.springboot.service;

import com.tagemahale.springboot.payload.payload.CartDto;
import com.tagemahale.springboot.payload.payload.CartHelp;

public interface CartService {

    //Create
    CartDto CreateCart(CartHelp cartHelp);

    //add Product To Cart
    CartDto addProductToCart(CartHelp cartHelp);

    //Get
    CartDto GetCart(String userEmail);

    //delete product

    void RemoveById(Integer ProductId,String userEmail);

    //delete


}
