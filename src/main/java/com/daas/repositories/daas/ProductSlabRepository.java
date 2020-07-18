package com.daas.repositories.daas;

import com.daas.entities.DaaS.ProductSlab;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSlabRepository extends JpaRepository<ProductSlab,Integer> {
}
