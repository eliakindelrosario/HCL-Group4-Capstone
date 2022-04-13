package com.eliakin.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eliakin.ecommerce.entity.Product;
import com.eliakin.ecommerce.entity.ProductCategory;
import com.eliakin.ecommerce.service.ProductService;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/dashboard")
//@PreAuthorize("hasAnyAuthority('ROLE_admin')")
public class ProductController {
    
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/{category_id}/products")
    public void addProduct(@RequestBody Product product, @PathVariable Long category_id) {
        product.setCategory(new ProductCategory(category_id, ""));
        productService.addProduct(product);
    }

    @PutMapping("/{category_id}/products/{id}")
    public void updateProduct(@RequestBody Product product, @PathVariable Long id,  @PathVariable Long category_id) {
        product.setCategory(new ProductCategory(category_id, ""));
        productService.updateProduct(product);
    }
}
