package com.daas.events.listener;

import com.daas.alerts.Alerts;
import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.RegistrationEvent;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class RegistrationListener extends BaseAbstractEventListener implements ApplicationListener<RegistrationEvent> {

    private User user;

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    @Override
    public void onApplicationEvent(RegistrationEvent event) {
        this.user = event.getUser();
        sendEmail();

    }

    public void sendEmail() {
        boolean sent = serviceUtil.sendVerificationLink(user);
        if (sent) {
        } else {
            alerts.setError("Verification link not sent. Error sending email");
        }
    }


}
