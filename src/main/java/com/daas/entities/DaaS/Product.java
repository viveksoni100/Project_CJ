package com.daas.entities.DaaS;


import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@Setter
@Table(name = "daas_product")
public class Product extends BaseEntity {


    @NotNull
    @NotEmpty
    @Column(name = "product_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private String productId;

    @NotNull
    @NotEmpty
    @Column(name = "product_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String productName;

    @NotNull
    @NotEmpty
    @Column(name = "product_description", length = 100000)
    /*    @HtmlValidateConstraint(whiteListType="none")*/
    private String productDescription;

    @Column(name = "data_file_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String dataFileName;

    @Column(name = "api_documentation_file_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String apiDocumentationFileName;

/*    @NotEmpty
    @NotNull*/
    @Column(name = "product_thumbnail_name")
    /*@HtmlValidateConstraint(whiteListType = "none")*/
    private String productThumbnailName;

    @Column(name = "download_count")
    /*    @HtmlValidateConstraint(whiteListType="none")*/
    private int downloadCount;

    @Column(name = "product_price")
    /*    @HtmlValidateConstraint(whiteListType="none")*/
    private float productPrice;

    @Column(name = "file_path")
    @HtmlValidateConstraint(whiteListType = "none")
    private String file_path;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_category_dtl_id")
    private ProductCategoryDetail productCategoryDetail;

    @LazyCollection(LazyCollectionOption.FALSE)
    @OneToMany(mappedBy = "products")
    private List<ProductVersion> productVersions;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "product_slab_id")
    private ProductSlab productSlab;

    @ManyToMany(mappedBy = "productSet", fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Set<ProductOffer> productOfferSet = new HashSet<>();

    @Override
    public boolean equals(Object o) {

        if (o == this)
            return true;

        if (!(o instanceof Product))
            return false;

        Product p = (Product) o;

        if (p.id == this.id) {
            return true;
        } else {
            return false;
        }
    }

    /*
    @OneToMany(fetch = FetchType.LAZY)
    private List<CartDetail> cartDetails;
*/

/*    @ManyToMany(mappedBy = "productList")
    private List<Cart> cartList;*/

}
