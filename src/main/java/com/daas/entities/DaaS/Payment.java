package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@Table(name="daas_payment")
public class Payment extends BaseEntity {

    @Column(name="payment_amount")
    @HtmlValidateConstraint(whiteListType="none")
    private float paymentAmount;

    @Column(name="payment_status")
    @HtmlValidateConstraint(whiteListType="none")
    private String paymentStatus;

    @Column(name="transaction_id")
    @HtmlValidateConstraint(whiteListType="none")
    private int transactionId;

    @Column(name="actual_amount")
    @HtmlValidateConstraint(whiteListType="none")
    private float actualAmount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private DaasUser daasUser;

    @OneToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
