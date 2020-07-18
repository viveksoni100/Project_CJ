package com.daas.repositories.daas;

import com.daas.entities.DaaS.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryDetailRepository extends JpaRepository<ProductCategoryDetail, Long> {

    public List<ProductType> findAllByProductCategory(ProductCategory productCategory);

    public List<ProductCategoryDetail> findAllByProductTypeAndStatusIsTrue(ProductType productType);

    public List<ProductCategoryDetail> findAllByProductType(ProductType productType);

    public List<ProductCategoryDetail> findAllByProductTypeAndIsDeleted(ProductType productType, Boolean aBoolean);

    public List<ProductCategoryDetail> findAllByProductTypeAndIsDeletedAndStatus(ProductType productType, Boolean aBoolean, Boolean bBoolean);

    @Query("SELECT u FROM ProductCategoryDetail u WHERE u.isDeleted = 0")
    public List<ProductCategoryDetail> findAllNonDeletedCategories();

    public List<ProductCategoryDetail> findAllByProductTypeAndProductCategory(ProductType productType,ProductCategory productCategory);

    public ProductCategoryDetail findFirstById(Long id);

    public List<Product> findAllByProductType(String categoryType);

    public List<ProductCategoryDetail> findAllByProductCategoryAndProductType(ProductCategory productCategory,ProductType productType);

}
