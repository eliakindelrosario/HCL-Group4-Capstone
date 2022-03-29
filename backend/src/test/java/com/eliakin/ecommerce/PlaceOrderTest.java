package com.eliakin.ecommerce;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;
import java.util.Date;

import com.eliakin.ecommerce.dto.Purchase;
import com.eliakin.ecommerce.dto.PurchaseResponse;
import com.eliakin.ecommerce.entity.Address;
import com.eliakin.ecommerce.entity.Customer;
import com.eliakin.ecommerce.entity.Order;
import com.eliakin.ecommerce.service.CheckoutServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


public class PlaceOrderTest {
    
    CheckoutServiceImpl service;
    Customer customer;
    Address shippingAddress;
    Address billingAddress;
    Order order;
    Purchase purchase;
  
    
    @BeforeEach
    void setUp(){
        Date today = new Date(); 
        // Set up Customer
        customer = new Customer();
        customer.setFirstName("John");
        customer.setLastName("Doe");
        customer.setEmail("johndoe@example.com");

        // Set up Order
        order = new Order();
        order.setId(1L);
        order.setTotalQuantity(2);
        order.setTotalPrice(new BigDecimal("90.09"));
        order.setDateCreated(today);
        order.setLastUpdated(today);

        // Set up ShippingAddress
        shippingAddress = new Address();
        shippingAddress.setId(1L);
        shippingAddress.setCountry("Test C");
        shippingAddress.setCity("Test City");
        shippingAddress.setState("Test S");
        shippingAddress.setStreet("Test Sreet");
        shippingAddress.setZipCode("1234");

        // Set up BillingAddress
        billingAddress = new Address();
        billingAddress.setId(1L);
        billingAddress.setCountry("Test C");
        billingAddress.setCity("Test City");
        billingAddress.setState("Test S");
        billingAddress.setStreet("Test Sreet");
        billingAddress.setZipCode("1234");

        // Set up Purchase Object
        purchase = new Purchase();
        purchase.setCustomer(customer);
        purchase.setShippingAddress(shippingAddress);
        purchase.setBillingAddress(billingAddress);
        purchase.setOrder(order);

    }


    @Test
    void PlaceOrder(){
        service = new CheckoutServiceImpl(null, null);
        PurchaseResponse result = service.placeOrder(purchase);
        assertEquals("", result);
    }
}
