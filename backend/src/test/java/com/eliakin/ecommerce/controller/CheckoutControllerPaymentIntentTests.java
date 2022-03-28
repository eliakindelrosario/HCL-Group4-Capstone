package com.eliakin.ecommerce.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import com.eliakin.ecommerce.dto.PaymentInfo;
import com.eliakin.ecommerce.service.CheckoutService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@ExtendWith(MockitoExtension.class)
public class CheckoutControllerPaymentIntentTests {

    @InjectMocks
    CheckoutController checkoutController;

    @Mock
    CheckoutService checkoutService;

    @Test
    public void testCreatePaymentIntent() throws StripeException {

        PaymentInfo paymentInfo = new PaymentInfo();
        paymentInfo.setAmount(200);
        paymentInfo.setCurrency("USD");
        paymentInfo.setReceiptEmail("john@doe.com");

        PaymentIntent expectedIntent = new PaymentIntent();
        expectedIntent.setAmount((long) paymentInfo.getAmount());
        expectedIntent.setCurrency(paymentInfo.getCurrency());
        expectedIntent.setReceiptEmail(paymentInfo.getReceiptEmail());

        Mockito.when(checkoutService.createPaymentIntent(Mockito.any(PaymentInfo.class))).thenReturn(expectedIntent);

        String expectedString = expectedIntent.toJson();

        ResponseEntity<String> responseEntity = checkoutController.createPaymentIntent(paymentInfo);

        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(200);
        assertThat(responseEntity.getBody()).isEqualTo(expectedString);

    }
}
