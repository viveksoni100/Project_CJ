package com.daas.entities.user;


import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Table(name = "stripe_users")
@Entity
@Getter
@Setter
public class StripeUsers extends BaseEntity {

    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;

    @Column(name = "stripe_customer_id")
    @NotEmpty
    @NotNull
    @HtmlValidateConstraint(whiteListType = "none")
    private String stripeCustomer;
}
