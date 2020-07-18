package com.daas.entities.user;


import com.daas.entities.DaaS.Cart;
import com.daas.entities.DaaS.Order;
import com.daas.entities.common.Country;
import com.daas.validator.iface.entity.UserConstraint;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "ease_users")
@UserConstraint
@Getter
@Setter
/*@UniqueUsername(classType = "User")*/
public class User extends BaseUser {


    @Column(name = "last_name")
    @NotEmpty
    @NotNull
    @HtmlValidateConstraint(whiteListType = "none")
    private String lastName;

    @Column(name = "first_name")
    @NotEmpty
    @NotNull
    @HtmlValidateConstraint(whiteListType = "none")
    private String firstName;


    @Column(name = "isd")
    @HtmlValidateConstraint(whiteListType = "none")
    private String isd;

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Column(name = "phone")
    @HtmlValidateConstraint(whiteListType = "none")
    @NotEmpty
    @NotNull
    private String phone;


    @Column(name = "about")
    @HtmlValidateConstraint(whiteListType = "none")
    private String about;

    @ManyToMany(fetch = FetchType.EAGER)
    /*@JoinTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))*/
    @JoinTable(name = "user_role", joinColumns = {
            @JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "role_id",
                    nullable = false, updatable = false)})
    public Set<UserRole> userRoles;


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_rights", joinColumns = {
            @JoinColumn(name = "user_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "right_id",
                    nullable = false, updatable = false)})
    public Set<UserRights> userRights;


    @NotEmpty
    @Transient
    private String confirmPassword;

    @Column(name = "profile_picture")
    private String profilePicture;

    @ManyToOne(targetEntity = Country.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "country_id")
    private Country country;


    @PrePersist
    @Override
    public void preInsert() {
        super.preInsert();
        if (this.getPhone() == null)
            this.setPhone("");
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getIsd() {
        return isd;
    }

    public void setIsd(String isd) {
        this.isd = isd;
    }

    public String getAbout() {
        return about;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public Set<UserRole> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<UserRole> userRoles) {
        this.userRoles = userRoles;
    }

    public Set<UserRights> getUserRights() {
        return userRights;
    }

    public void setUserRights(Set<UserRights> userRights) {
        this.userRights = userRights;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Cart getCart() {
        return cart;
    }

    public void setCart(Cart cart) {
        this.cart = cart;
    }

    public List<Order> getOrderList() {
        return orderList;
    }

    public void setOrderList(List<Order> orderList) {
        this.orderList = orderList;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    @OneToOne(mappedBy = "daasUser")
    private Cart cart;

    @OneToMany(mappedBy = "daasUser",fetch = FetchType.LAZY)
    private List<Order> orderList;

    @Column(name = "company_name")
    @NotEmpty
    @NotNull
    @HtmlValidateConstraint(whiteListType = "none")
    private String companyName;

    public String getName() {
        return this.firstName + " " + this.lastName;
    }
}
