package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "daas_cart_detail")
public class CartDetail extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY,targetEntity = Cart.class)
    private Cart cart;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false, updatable = false)
    private Product product;

    @Column(name = "total_qty")
    @HtmlValidateConstraint(whiteListType = "none")
    private Long quantity;

    @Column(name = "total_price")
    @HtmlValidateConstraint(whiteListType = "none")
    private float totalPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "offer_id")
    private ProductOffer productOffer;

}
