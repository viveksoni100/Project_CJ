package com.daas.events.event.daas;


import com.daas.entities.user.ForgotPasswordToken;
import com.daas.entities.user.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

/**
 * This is an event registration
 */
@Getter
@Setter
public class Api80percEvent extends ApplicationEvent {

    private Locale locale;
    private User user;
    private ForgotPasswordToken forgotPasswordToken;

    /**
     * We are registering event after registration complete
     *
     * @param user                : Current user
     * @param locale              : Current locale
     * @param forgotPasswordToken : ForgotPasswordToken object
     */
    public Api80percEvent(User user, Locale locale, ForgotPasswordToken forgotPasswordToken) {
        super(user);

        this.user = user;
        this.locale = locale;
        this.forgotPasswordToken = forgotPasswordToken;

    }





    public ForgotPasswordToken getForgotPasswordToken() {
        return forgotPasswordToken;
    }

    public void setForgotPasswordToken(ForgotPasswordToken forgotPasswordToken) {
        this.forgotPasswordToken = forgotPasswordToken;
    }
}

