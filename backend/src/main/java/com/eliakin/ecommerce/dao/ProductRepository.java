package com.eliakin.ecommerce.dao;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import com.eliakin.ecommerce.entity.Product;

@RepositoryRestResource
public interface ProductRepository extends JpaRepository<Product, Long> {
	// Query Method
	Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable pages);
	
	Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable pages);
}