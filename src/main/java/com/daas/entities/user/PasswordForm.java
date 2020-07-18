package com.daas.entities.user;

import com.daas.entities.forms.AbstractBaseForm;
import com.daas.validator.iface.field.PasswordConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class PasswordForm extends AbstractBaseForm {

    @NotBlank(message = "value required")
    @PasswordConstraint
    private String password;

    @NotBlank(message = "value required")
    private String confirmPassword;

    @NotBlank(message = "value required")
    private String currentPassword;
}

