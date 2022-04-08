package com.eliakin.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eliakin.ecommerce.dto.PaymentInfo;
import com.eliakin.ecommerce.dto.Purchase;
import com.eliakin.ecommerce.dto.PurchaseResponse;
import com.eliakin.ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

import lombok.extern.log4j.Log4j2;


@Log4j2
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
	
    private CheckoutService checkoutService;
    
    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {
    	log.info("Purchase Info Message");
        return checkoutService.placeOrder(purchase);
    }
    
    
    @PostMapping("/payment-intent")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentInfo paymentInfo) throws StripeException {
    	log.info("creating payment intent");
        PaymentIntent paymentIntent = checkoutService.createPaymentIntent(paymentInfo);

        String paymentStr = paymentIntent.toJson();
        log.info("Returning payment intent");
        return new ResponseEntity<>(paymentStr, HttpStatus.OK);
    }

}
