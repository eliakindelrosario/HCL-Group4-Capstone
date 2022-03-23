package com.eliakin.ecommerce.service;

import com.eliakin.ecommerce.dto.PaymentInfo;
import com.eliakin.ecommerce.dto.Purchase;
import com.eliakin.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
	PurchaseResponse placeOrder(Purchase purchase);
	
	PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
