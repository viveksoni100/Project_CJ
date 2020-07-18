package com.daas.repositories.daas;

import com.daas.entities.DaaS.ProductSlabDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductSlabDetailRepository extends JpaRepository<ProductSlabDetail,Integer> {
}
