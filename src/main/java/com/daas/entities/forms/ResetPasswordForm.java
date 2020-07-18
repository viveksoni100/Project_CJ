package com.daas.entities.forms;



import com.daas.validator.iface.field.PasswordConstraint;

import javax.validation.constraints.NotBlank;

public class ResetPasswordForm extends AbstractBaseForm {

    @NotBlank
    @PasswordConstraint
    private String password;

    @NotBlank
    private String resetPassword;

    private String uid;

    private String token;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getResetPassword() {
        return resetPassword;
    }

    public void setResetPassword(String resetPassword) {
        this.resetPassword = resetPassword;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
