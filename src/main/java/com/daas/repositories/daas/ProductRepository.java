package com.daas.repositories.daas;

import com.daas.entities.DaaS.Product;
import com.daas.entities.DaaS.ProductCategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    public Product findFirstById(Long id);

    public Product findFirstByProductId(Optional<String> productId);

    public Product findFirstByProductIdAndIsDeleted(String productId, boolean aBoolean);

    public List<Product> findAllByProductCategoryDetail(ProductCategoryDetail productCategoryDetail);

    public List<Product> findAllByProductCategoryDetailAndIsDeleted(ProductCategoryDetail productCategoryDetail, Boolean aBoolean);
    public List<Product> findAllByProductCategoryDetailAndIsDeletedAndStatus(ProductCategoryDetail productCategoryDetail, Boolean aBoolean, Boolean bBoolean);

    public List<Product> findAllByProductCategoryDetailAndStatus(ProductCategoryDetail productCategoryDetail, boolean status);

    public List<Product> findAllByProductCategoryDetailAndEndDateAfterAndIsDeleted(ProductCategoryDetail productCategoryDetail, LocalDateTime rightNow, Boolean aBoolean);

    public List<Product> findAllByProductCategoryDetailAndStatusOrderByProductPriceDesc(ProductCategoryDetail productCategoryDetail, boolean status);

    public List<Product> findAllByProductCategoryDetailAndStatusOrderByProductPriceAsc(ProductCategoryDetail productCategoryDetail, boolean status);

    public List<Product> findAllByProductCategoryDetailAndCreatedAtAndStatusOrderByCreatedAt(ProductCategoryDetail productCategoryDetail, LocalDateTime createdAt, boolean status);

    public List<Product> findAllByProductCategoryDetailAndStatusOrderByProductNameAsc(ProductCategoryDetail productCategoryDetail, boolean status);

    public List<Product> findAllByProductCategoryDetailAndStatusOrderByProductNameDesc(ProductCategoryDetail productCategoryDetail, boolean status);

    public List<Product> findAllByProductCategoryDetailAndStatusAndProductPriceBetween(ProductCategoryDetail productCategoryDetail, boolean status, Long startPrice, Long endPrice);

    public Long countAllByProductCategoryDetailInAndStatusIsTrue(List<ProductCategoryDetail> productCategoryDetails);

    @Query("SELECT u FROM Product u WHERE u.isDeleted = 0")
    public List<Product> findAllNonDeletedData();

}
