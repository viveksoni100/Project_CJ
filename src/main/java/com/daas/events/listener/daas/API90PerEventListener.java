package com.daas.events.listener.daas;

import com.daas.alerts.Alerts;
import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.API90PerEvent;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class API90PerEventListener extends BaseAbstractEventListener implements ApplicationListener<API90PerEvent> {

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    private OrderDetail orderDetail;
    private User user;
    private Order order;

    @Override
    public void onApplicationEvent(API90PerEvent event) {
        this.user = event.getUser();
        this.order = event.getOrder();
        this.orderDetail = event.getOrderDetail();
        sendEmail();
    }
    public void sendEmail() {
        boolean sent = serviceUtil.sendAPI90PerMail(user, order, orderDetail);
        if (sent) {
        } else {
            alerts.setError("API90Percent Mail link not sent. Error sending email");
        }
    }
}
