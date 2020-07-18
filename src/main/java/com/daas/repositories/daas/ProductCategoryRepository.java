package com.daas.repositories.daas;

import com.daas.entities.DaaS.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {

    public ProductCategory findById(Long id);

    public int deleteById(Long id);

    public ProductCategory findFirstByProductCategoryName(String categoryname);


}
