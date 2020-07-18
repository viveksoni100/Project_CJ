package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="daas_product_slab_detail")
public class ProductSlabDetail extends BaseEntity {

    @Column(name="slab_lower_limit")
    @HtmlValidateConstraint(whiteListType="none")
    private int slabLowerLimit;

    @Column(name="slab_upper_limit")
    @HtmlValidateConstraint(whiteListType="none")
    private int slabUpperLimit;

    @Column(name="slab_rate")
    @HtmlValidateConstraint(whiteListType="none")
    private float slabRate;

    @ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private ProductSlab productSlab;

}
