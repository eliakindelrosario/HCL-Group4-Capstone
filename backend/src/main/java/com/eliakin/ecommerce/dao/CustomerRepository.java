package com.eliakin.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eliakin.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Customer findByEmail(String theEmail);
}