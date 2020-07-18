package com.daas.events.listener.daas;

import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.ValidityExpiredEvent;
import com.daas.mail.Mail;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class ValidityExpiredListener extends BaseAbstractEventListener implements ApplicationListener<ValidityExpiredEvent> {

    public final static Logger LOG = LogManager.getLogger(ValidityExpiredListener.class.getName());

    /**
     * On registration complete this listener will be called
     * We have registered it in OnRegistrationCompleteEvent
     *
     * @param event : Current Event (in our case Registration complete)
     */
    @Override
    public void onApplicationEvent(ValidityExpiredEvent event) {

        this.confirmRegistration(event);
    }

    private void confirmRegistration(ValidityExpiredEvent event) {

        try {
            User user = event.getUser();
            String token = event.getForgotPasswordToken().getToken();

            Map<String, Object> model = new HashMap<>();
            model.put("name", user.getName());
            model.put("email", user.getEmail());
            model.put("verificationToken", token);
            try {
                Mail mail = new Mail();
                mail.setFrom(environment.getProperty("from.email"));
                mail.setTo(user.getEmail());
                mail.setSubject("Global Trade Data password reset mail");
                mail.setModel(model);
                emailService.sendEmail(mail, "mail/user/forgot");
            } catch (Exception e) {
                LOG.error("Error sending email forgot password  - " + event.getUser().getEmail(), e);
            }
        } catch (Exception e) {

        }
    }

}
