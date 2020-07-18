package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "daas_product_offer")
public class ProductOffer extends BaseEntity {

    @NotNull
    @NotEmpty
    @Column(name = "offer_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private String offerId;

    @NotEmpty
    @NotNull
    @Column(name = "product_offer_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String offerName;

    @NotEmpty
    @NotNull
    @Column(name = "product_offer_description", length = 50000)
    /*@HtmlValidateConstraint(whiteListType="none")*/
    private String offerDescription;

    @Min(1)
    @Column(name = "product_discounted_price", precision = 2)
    /*@HtmlValidateConstraint(whiteListType="none")*/
    private float discountedPrice;

    @Column(name = "product_discount_rate", precision = 2)
    /*    @HtmlValidateConstraint(whiteListType="none")*/
    private float discountRate;

    @Column(name = "thumbnail_name")
    /*    @HtmlValidateConstraint(whiteListType = "none")*/
    private String offerThumbnailname;


    @Column(name = "file_path")
    @HtmlValidateConstraint(whiteListType = "none")
    private String filePath;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "daas_product_offer_detail",
            joinColumns = {@JoinColumn(name = "Offer_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id")})
    private Set<Product> productSet = new HashSet<>();
}
