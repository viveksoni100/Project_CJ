package com.daas.entities.user;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import com.daas.validator.iface.field.PasswordConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@MappedSuperclass
@Getter
@Setter
public class BaseUser extends BaseEntity {
    @Column(name = "email")
    @Email
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText", addAttributes = {"span:style", "div:style"})
    private String email;

    /*@NotBlank
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "username")*/
    @Transient
    private String username;

    @Column(name = "password")
    @NotEmpty
    @NotNull
    @NotEmpty
    @PasswordConstraint
    private String password;
}
