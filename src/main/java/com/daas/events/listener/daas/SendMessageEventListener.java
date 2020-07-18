package com.daas.events.listener.daas;

import com.daas.alerts.Alerts;
import com.daas.entities.DaaS.DaasMsg;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.SendMessageEvent;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class SendMessageEventListener extends BaseAbstractEventListener implements ApplicationListener<SendMessageEvent> {

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    private DaasMsg daasMsg;

    @Override
    public void onApplicationEvent(SendMessageEvent event) {
        this.daasMsg = event.getDaasMsg();
        sendEmail();
    }

    public void sendEmail() {
        boolean sent = serviceUtil.sendMessageEventMail(daasMsg);
        if (sent) {
        } else {
            alerts.setError("Send Message Mail link not sent. Error sending email");
        }
    }

}
