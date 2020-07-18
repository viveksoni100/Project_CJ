package com.daas.repositories.daas;

import com.daas.entities.DaaS.Product;
import com.daas.entities.DaaS.ProductVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVersionRepository extends JpaRepository<ProductVersion, Long> {

    ProductVersion findFirstByProductsOrderByProductVersionDesc(Product product);

    /*ProductVersion findFirstByProducts(Product product);*/

}
