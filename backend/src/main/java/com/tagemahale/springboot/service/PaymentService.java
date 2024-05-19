package com.tagemahale.springboot.service;

import com.tagemahale.springboot.payload.PaymentDetails;

public interface PaymentService {

    public PaymentDetails CreateOrder(Double amount);

}
