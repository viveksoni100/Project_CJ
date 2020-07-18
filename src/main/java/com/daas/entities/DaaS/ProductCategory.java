package com.daas.entities.DaaS;


import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name="daas_product_category")
public class ProductCategory extends BaseEntity {

    @NotNull
    @NotEmpty
    @Column(name="product_category_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String productCategoryName;

    @NotNull
    @NotEmpty
    @Column(name="product_category_description")
    @HtmlValidateConstraint(whiteListType="none")
    private String productCategoryDescription;

    @Override
    public String toString() {
        return "ProductCategory{" +
                "productCategoryName='" + productCategoryName + '\'' +
                ", productCategoryDescription='" + productCategoryDescription + '\'' +
                '}';
    }
}
