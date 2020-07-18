package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Getter
@Setter
@Table(name="daas_product_type")

public class ProductType extends BaseEntity {

    @Column(name="product_type_number")
    @HtmlValidateConstraint(whiteListType="none")
    private int productTypeNumber;

    @Column(name="product_type_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String productTypeName;

    @Column(name="product_type_description")
    @HtmlValidateConstraint(whiteListType="none")
    private String productTypeDescription;

    @Override
    public String toString() {
        return "ProductType{" +
                "productTypeNumber=" + productTypeNumber +
                ", productTypeName='" + productTypeName + '\'' +
                ", productTypeDescription='" + productTypeDescription + '\'' +
                '}';
    }
}
