package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.entities.user.User;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "daas_order")
public class Order extends BaseEntity {

    @Column(name = "email_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private String emailId;

    @Column(name = "gross_price")
    @HtmlValidateConstraint(whiteListType = "none")
    private float grossPrice;

    @Column(name = "discount")
    @HtmlValidateConstraint(whiteListType = "none")
    private float discount;

    @Column(name = "net_price")
    @HtmlValidateConstraint(whiteListType = "none")
    private float netPrice;

    @Column(name = "offer_applied_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private int offerAppliedId;

    @Column(name = "tax")
    @HtmlValidateConstraint(whiteListType = "none")
    private float tax;

    @Column(name = "purchase_date")
    @HtmlValidateConstraint(whiteListType = "none")
    private LocalDateTime purchaseDate;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User daasUser;

    @OneToMany(fetch = FetchType.EAGER, targetEntity = OrderDetail.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id", nullable = false)
    private List<OrderDetail> orderDetailList = new ArrayList<OrderDetail>();

    @Column(name = "transaction_number")
    @HtmlValidateConstraint(whiteListType = "none")
    private Long transactionNumber;

    @Column(name = "stripe_session_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private String stripeSessionId;

    public List<OrderDetail> getOrderDetailList() {
        return orderDetailList;
    }

    public void setOrderDetailList(List<OrderDetail> orderDetailList) {
        this.orderDetailList = orderDetailList;
    }
}
