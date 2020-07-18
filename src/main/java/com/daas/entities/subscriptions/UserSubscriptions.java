package com.daas.entities.subscriptions;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.BaseEntity;
import com.daas.entities.user.User;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDate;


@Table(name = "user_subscriptions")
@Entity
@Data
public class UserSubscriptions extends BaseEntity {


    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @Column(name = "subscription_type", nullable = false)
    private String subscriptionType;


    @Column(name = "amount_paid", nullable = false)
    private String amountPaid;

    @Column(name = "transaction_id")
    private String transactionId;


    @Column(name = "plan_id")
    private String planId;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "total_users", nullable = false)
    private Integer totalUsers;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "subscription_date", updatable = false)
    private LocalDate subscriptionDate;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "expiry_date", updatable = false)
    private LocalDate expiryDate;


    @Override
    public void preInsert() {
        super.preInsert();
        this.status = true;
        this.subscriptionDate = LocalDate.now();
        this.expiryDate = LocalDate.now().plusYears(1);
    }
}
