package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="daas_product_slab")
public class ProductSlab extends BaseEntity {

    @Column(name="slab_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String SlabName;

    @Column(name="slab_description")
    @HtmlValidateConstraint(whiteListType="none")
    private String SlabDescription;

    @Column(name="maximum_slab_amount")
    @HtmlValidateConstraint(whiteListType="none")
    private int maximumSlabAmount;

    @Column(name="slab_difference")
    @HtmlValidateConstraint(whiteListType="none")
    private int slabDifference;

    @OneToOne(mappedBy = "productSlab",fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    private Product product;

    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    @JoinColumn(name = "product_slab_id",nullable = false)
    private List<ProductSlabDetail> productSlabDetailList;


}
