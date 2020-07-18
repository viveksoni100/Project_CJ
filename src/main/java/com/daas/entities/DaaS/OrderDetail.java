package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@Table(name="daas_order_detail")
public class OrderDetail extends BaseEntity {

    /*@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Order order;*/

    @Column(name="product_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String productName;

    @Column(name="product_qty")
    @HtmlValidateConstraint(whiteListType="none")
    private Long productQty;

    @Column(name="slab_price",precision = 2)
    @HtmlValidateConstraint(whiteListType="none")
    private float slabPrice;

    @Column(name="original_price",precision = 2)
    @HtmlValidateConstraint(whiteListType="none")
    private float originalPrice;

    @Column(name="discount",precision = 2)
    @HtmlValidateConstraint(whiteListType="none")
    private float discount;

    @Column(name="net_price",precision = 2)
    @HtmlValidateConstraint(whiteListType="none")
    private float netPrice;

    @Column(name="offer_applied_id")
    @HtmlValidateConstraint(whiteListType="none")
    private Long offerAppliedId;

    @Column(name="used_api_call_count")
    @HtmlValidateConstraint(whiteListType="none")
    private Long usedApiCallCount;

    @Column(name="data_version")
    @HtmlValidateConstraint(whiteListType="none")
    private float dataVersion;

    @Column(name = "productExpiry")
    @HtmlValidateConstraint(whiteListType="none")
    private LocalDateTime productExpiryDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id",updatable = false)
    private Product product;

    @Column(name = "sbu_code")
    @HtmlValidateConstraint(whiteListType="none")
    private String sbuCode;
}