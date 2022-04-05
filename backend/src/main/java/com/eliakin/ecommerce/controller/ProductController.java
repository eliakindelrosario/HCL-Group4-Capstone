package com.eliakin.ecommerce.controller;

import com.eliakin.ecommerce.entity.Product;
import com.eliakin.ecommerce.entity.ProductCategory;
import com.eliakin.ecommerce.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
public class ProductController {
    
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/api/{category_id}/products")
    public void placeOrder(@RequestBody Product product, @PathVariable Long category_id) {
        product.setCategory(new ProductCategory(category_id, ""));
        productService.addProduct(product);
    }

    @PutMapping("/api/{category_id}/products/{id}")
    public void placeOrder(@RequestBody Product product, @PathVariable Long id,  @PathVariable Long category_id) {
        product.setCategory(new ProductCategory(category_id, ""));
        productService.updateProduct(product);
    }
}
