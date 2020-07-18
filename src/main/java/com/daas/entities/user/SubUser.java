package com.daas.entities.user;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.common.Country;
import com.daas.validator.iface.entity.SubuserConstraint;
import com.daas.validator.iface.field.EnsureNumber;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.time.LocalDate;
import java.util.Set;


@Table(name = "subusers")
@Entity
@Getter
@Setter
@SubuserConstraint
/*@UniqueUsername(classType = "SubUser")*/
public class SubUser extends BaseUser {


    public SubUser(User parentUser, Country country) {
        super();
        this.parentUser = parentUser;
        this.country = country;
    }

    public SubUser() {
        super();
    }

    @NotBlank
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "first_name")
    private String firstName;


    @NotBlank
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "last_name")
    private String lastName;


    @NotEmpty
    @Transient
    private String confirmPassword;


    @ManyToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_id", nullable = false)
    private User parentUser;

    @ManyToOne(targetEntity = Country.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "country_id")
    private Country country;


    @Lob
    @Column(name = "personal_information")
    @HtmlValidateConstraint(whiteListType = "none")
    private String personalInformation;


    @NotBlank
    @Column(name = "phone")
    @EnsureNumber
    private String phone;

    @Column(name = "address1")
    @NotBlank
    private String address1;


    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    @NotBlank
    private String city;

    @Column(name = "state")
    @NotBlank
    private String state;

    @NotBlank
    @Column(name = "postal_code")
    private String postalCode;


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

    @Column(name = "note")
    @Lob
    private String note;


    @ManyToMany(fetch = FetchType.EAGER)
    /*@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))*/
    @JoinTable(name = "subuser_role", joinColumns = {
            @JoinColumn(name = "subuser_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "role_id",
                    nullable = false, updatable = false)})
    public Set<UserRole> userRoles;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "subscription_date")
    private LocalDate subscriptionDate;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "expiry_date")
    private LocalDate expiryDate;

    @Override
    public void preInsert() {
        super.preInsert();
        this.status = true;
        this.subscriptionDate = LocalDate.now();

    }
}
