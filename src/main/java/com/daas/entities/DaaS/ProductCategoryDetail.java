package com.daas.entities.DaaS;


import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="daas_product_category_detail")
public class ProductCategoryDetail extends BaseEntity {

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_type_id",nullable = false)
    ProductType productType;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_category_id",nullable = false)
    ProductCategory productCategory;

}
