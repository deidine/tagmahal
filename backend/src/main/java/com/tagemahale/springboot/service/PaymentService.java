package com.tagemahale.springboot.service;

import com.tagemahale.springboot.payload.payload.PaymentDetails;

public interface PaymentService {

    public PaymentDetails CreateOrder(Double amount);

}
