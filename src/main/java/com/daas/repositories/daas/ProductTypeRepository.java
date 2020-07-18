package com.daas.repositories.daas;

import com.daas.entities.DaaS.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, Integer> {

    public ProductType findFirstByProductTypeName(String name);

}
