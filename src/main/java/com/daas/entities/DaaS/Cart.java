package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import com.daas.entities.user.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "daas_cart")
public class Cart extends BaseEntity {

    @Column(name = "session_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private String sessionId;

    @OneToOne
    @JoinColumn(name = "user_id", updatable = false)
    private User daasUser;

/*    @ManyToMany(fetch=FetchType.LAZY)
    @JoinTable(name = "daas_cart_detail",
            joinColumns = {@JoinColumn(name = "cart_id")},
            inverseJoinColumns = {@JoinColumn(name = "product_id",updatable = false)})
    private List<Product> productList;*/

    /*    @LazyCollection(LazyCollectionOption.FALSE)*/
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private List<CartDetail> cartDetails;

  /*  public List<Product> getProductList() {
        return productList;
    }*/
}
