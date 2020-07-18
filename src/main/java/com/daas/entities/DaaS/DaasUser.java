package com.daas.entities.DaaS;



import com.daas.entities.user.BaseUser;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table(name = "daas_users")
@Getter
@Setter
public class DaasUser extends BaseUser {



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


/*
    @ManyToOne(targetEntity = Country.class, fetch = FetchType.EAGER)
    @JoinColumn(name = "country_id")
    private Country country;
*/


    @Column(name = "phone")
    @HtmlValidateConstraint(whiteListType = "none")
    @NotEmpty
    @NotNull
    private String phone;

    @ManyToMany
    @JoinTable(
            name = "daas_user_rights",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "roles_id")
    )
    private Set<DaasUserRoles> daasUserRoles;



    @NotEmpty
    @Transient
    private String confirmPassword;

    @Column(name = "profile_picture")
    private String profilePicture;


}
