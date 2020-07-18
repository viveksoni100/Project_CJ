package com.daas.entities.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.BaseEntity;
import com.daas.validator.iface.entity.SubuserConstraint;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import com.daas.validator.iface.field.UniqueUsername;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;


@Table(name = "subusers_history")
@Entity
@Getter
@Setter
@SubuserConstraint
@UniqueUsername(classType = "SubUser")
public class SubUserHistory extends BaseEntity {


    @NotBlank
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "first_name")
    private String firstName;


    @NotBlank
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "last_name")
    private String lastName;


    @ManyToOne(targetEntity = SubUser.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "subuser_id", nullable = false)
    private SubUser subUser;


    @Column(name = "transaction_id")
    private String transactionId;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "subscription_date", updatable = false)
    private LocalDate subscriptionDate;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "expiry_date", updatable = false)
    private LocalDate expiryDate;


    public void setSubuserHistory(SubUser subUser) {
        this.setStatus(subUser.getStatus());
        this.setExpiryDate(subUser.getExpiryDate());
        this.setSubscriptionDate(subUser.getSubscriptionDate());
        this.setSubUser(subUser);
        //this.setUserSubscriptions(subUser.getUserSubscriptions());
        this.setFirstName(subUser.getFirstName());
        this.setLastName(subUser.getLastName());
        //this.setId(subUser.getId());
        this.setTransactionId(subUser.getTransactionId());
        //this.setTransactionId(subUser.getUserSubscriptions().getTransactionId());

    }
}
