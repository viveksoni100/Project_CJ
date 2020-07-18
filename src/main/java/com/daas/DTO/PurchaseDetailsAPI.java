package com.daas.DTO;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PurchaseDetailsAPI {
    private String uFirstName;
    private String uLastName;
    private Long orderId;
    private Long orderDetId;
    private String email;
    private LocalDateTime purchaseDate;
    private String productName;
    private LocalDateTime expiryDate;
    private String sbuCode;
    private Long totalQty;
    private Long apiCallsUsed;
    private Long remainingCalls;
    private float totalAmount;

    public PurchaseDetailsAPI(String uFirstName, String uLastName, Long orderId, Long orderDetId, String email, LocalDateTime purchaseDate, String productName, LocalDateTime expiryDate, String sbuCode, Long totalQty, Long apiCallsUsed, Long remainingCalls, float totalAmount) {
        this.uFirstName = uFirstName;
        this.uLastName = uLastName;
        this.orderId = orderId;
        this.orderDetId = orderDetId;
        this.email = email;
        this.purchaseDate = purchaseDate;
        this.productName = productName;
        this.expiryDate = expiryDate;
        this.sbuCode = sbuCode;
        this.totalQty = totalQty;
        this.apiCallsUsed = apiCallsUsed;
        this.remainingCalls = remainingCalls;
        this.totalAmount = totalAmount;
    }

    public PurchaseDetailsAPI() {
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getOrderDetId() {
        return orderDetId;
    }

    public void setOrderDetId(Long orderDetId) {
        this.orderDetId = orderDetId;
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

    public String getSbuCode() {
        return sbuCode;
    }

    public void setSbuCode(String sbuCode) {
        this.sbuCode = sbuCode;
    }

    public Long getTotalQty() {
        return totalQty;
    }

    public void setTotalQty(Long totalQty) {
        this.totalQty = totalQty;
    }

    public Long getApiCallsUsed() {
        return apiCallsUsed;
    }

    public void setApiCallsUsed(Long apiCallsUsed) {
        this.apiCallsUsed = apiCallsUsed;
    }

    public Long getRemainingCalls() {
        return remainingCalls;
    }

    public void setRemainingCalls(Long remainingCalls) {
        this.remainingCalls = remainingCalls;
    }

    public float getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(float totalAmount) {
        this.totalAmount = totalAmount;
    }
}
