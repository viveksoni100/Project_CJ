package com.daas.enums;

public enum  NotificationType {

    DAYS("DAYS"), MINUTES("MINUTES"), MONTHS ("MONTHS");

    private String value;

    NotificationType(String value) { this.value = value; }

    public String getValue() { return value; }
}
