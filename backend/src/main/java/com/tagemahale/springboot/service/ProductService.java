package com.tagemahale.springboot.service;

import java.util.List;

import com.tagemahale.springboot.payload.payload.ProductDto;

public interface ProductService {

    //create
    ProductDto CreateProduct(ProductDto productDto);

    //read
    ProductDto ReadProduct(Integer ProductId);


    //readAll
    List<ProductDto> ReadAllProduct();


    //delete
    void DeleteProduct(Integer productId);


    //update
    ProductDto UpdateProduct(ProductDto productDto,Integer ProductId);



}

