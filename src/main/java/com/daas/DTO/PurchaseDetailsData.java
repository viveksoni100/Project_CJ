package com.daas.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PurchaseDetailsData {
    private String uFirstName;
    private String uLastName;
    private Long orderId;
    private String email;
    private LocalDateTime purchaseDate;
    private String productName;
    private LocalDateTime expiryDate;
    private float totalPrice;
    private Long offerIdApplied;

    public PurchaseDetailsData(String uFirstName, String uLastName, Long orderId, String email, LocalDateTime purchaseDate, String productName, LocalDateTime expiryDate, float totalPrice, Long offerIdApplied) {
        this.uFirstName = uFirstName;
        this.uLastName = uLastName;
        this.orderId = orderId;
        this.email = email;
        this.purchaseDate = purchaseDate;
        this.productName = productName;
        this.expiryDate = expiryDate;
        this.totalPrice = totalPrice;
        this.offerIdApplied = offerIdApplied;
    }

    public PurchaseDetailsData() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getPurchaseDate() {
        return purchaseDate;
    }

    public void setPurchaseDate(LocalDateTime purchaseDate) {
        this.purchaseDate = purchaseDate;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }

    public float getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(float totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Long getOfferIdApplied() {
        return offerIdApplied;
    }

    public void setOfferIdApplied(Long offerIdApplied) {
        this.offerIdApplied = offerIdApplied;
    }
}
