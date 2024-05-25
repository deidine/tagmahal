package com.tagemahale.springboot.service;

import java.util.List;

import com.tagemahale.springboot.payload.CartDto;
import com.tagemahale.springboot.payload.CartHelp;

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
    List<CartDto> getAllCarts();
    void RemoveByCart( String email);
}
