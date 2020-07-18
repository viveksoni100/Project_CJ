package com.daas.events.listener.daas;

import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.Api50percEvent;
import com.daas.mail.Mail;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class Api50percListener extends BaseAbstractEventListener implements ApplicationListener<Api50percEvent> {

    public final static Logger LOG = LogManager.getLogger(Api50percListener.class.getName());

    /**
     * On registration complete this listener will be called
     * We have registered it in OnRegistrationCompleteEvent
     *
     * @param event : Current Event (in our case Registration complete)
     */
    @Override
    public void onApplicationEvent(Api50percEvent event) {

        this.confirmRegistration(event);
    }

    private void confirmRegistration(Api50percEvent event) {

        try {
            User user = event.getUser();
            String token = event.getForgotPasswordToken().getToken();

            Map<String, Object> model = new HashMap<>();
            model.put("name", user.getName());
            model.put("verificationToken", token);
            try {
                Mail mail = new Mail();
                mail.setFrom(environment.getProperty("from.email"));
                mail.setTo(user.getEmail());
                mail.setSubject("EaseClick - Reset your password");
                mail.setModel(model);
                emailService.sendEmail(mail, "mail/user/forgot");
            } catch (Exception e) {
                LOG.error("Error sending email forgot password  - " + event.getUser().getEmail(), e);
            }
        } catch (Exception e) {

        }
    }

}
