package com.eliakin.ecommerce.dto;

import java.util.Set;

import com.eliakin.ecommerce.entity.Address;
import com.eliakin.ecommerce.entity.Customer;
import com.eliakin.ecommerce.entity.Order;
import com.eliakin.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}