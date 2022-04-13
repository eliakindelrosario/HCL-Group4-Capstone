package com.eliakin.ecommerce.service;

import com.eliakin.ecommerce.dao.ProductRepository;
import com.eliakin.ecommerce.entity.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public void addProduct(Product product){
        productRepository.save(product);
    }

    public void updateProduct(Product product){
        productRepository.save(product);
    }
}
