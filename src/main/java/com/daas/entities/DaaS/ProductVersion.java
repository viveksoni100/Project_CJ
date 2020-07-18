package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="daas_product_version")
public class ProductVersion extends BaseEntity {

    @Column(name="product_version")
    @HtmlValidateConstraint(whiteListType="none")
    private float productVersion;

    @Column(name="product_version_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String productVersionName;

    @Column(name="product_version_note", length = 50000)
    @HtmlValidateConstraint(whiteListType="none")
    private String productVersionNote;

    @Column(name="download_count")
    @HtmlValidateConstraint(whiteListType="none")
    private int downloadCount;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product products;
}
