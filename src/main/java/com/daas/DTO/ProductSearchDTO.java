package com.daas.DTO;

import com.daas.entities.DaaS.ProductCategoryDetail;

import java.time.LocalDateTime;


public class ProductSearchDTO {

    private LocalDateTime createdAt;

    private String productId;

    private String productName;

    private String productDescription;

    private int downloadCount;

    private float productPrice;

    private float minPrice;

    private float maxPrice;

    private ProductCategoryDetail productCategoryDetail;


    public ProductSearchDTO(LocalDateTime createdAt, String productId, String productName, String productDescription, int downloadCount, float productPrice, float minPrice, float maxPrice, ProductCategoryDetail productCategoryDetail) {
        this.createdAt = createdAt;
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.downloadCount = downloadCount;
        this.productPrice = productPrice;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.productCategoryDetail = productCategoryDetail;
    }

    public ProductSearchDTO() {
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public float getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(float minPrice) {
        this.minPrice = minPrice;
    }

    public float getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(float maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public int getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(int downloadCount) {
        this.downloadCount = downloadCount;
    }

    public float getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public ProductCategoryDetail getProductCategoryDetail() {
        return productCategoryDetail;
    }

    public void setProductCategoryDetail(ProductCategoryDetail productCategoryDetail) {
        this.productCategoryDetail = productCategoryDetail;
    }
}
