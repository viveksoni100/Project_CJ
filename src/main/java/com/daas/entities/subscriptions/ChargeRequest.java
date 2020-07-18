package com.daas.entities.subscriptions;

import lombok.Data;

import java.util.Map;

@Data
public class ChargeRequest {

    public enum Currency {
        EUR, USD;
    }
    private String description;
    private int amount;
    private Currency currency;
    private String stripeEmail;
    private String stripeToken;
    private Map<String, String> params;
    private Integer totalUsers;
    private String type;
}

