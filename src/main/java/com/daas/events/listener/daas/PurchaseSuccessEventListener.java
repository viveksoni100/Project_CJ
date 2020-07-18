package com.daas.events.listener.daas;

import com.daas.alerts.Alerts;
import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.PurchaseSuccessEvent;
import com.daas.utilities.session.UserUtil;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
@Setter
public class PurchaseSuccessEventListener extends BaseAbstractEventListener implements ApplicationListener<PurchaseSuccessEvent> {

    private User daasUser;
    private Order order;
    private OrderDetail orderDetail;
    private List<OrderDetail> orderDetailList;

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    @Autowired
    private UserUtil userUtil;

    @Override
    public void onApplicationEvent(PurchaseSuccessEvent event) {
        this.daasUser = userUtil.getCurrentUser();
        this.order = event.getOrder();
        this.orderDetail = event.getOrderDetail();
        this.orderDetailList = event.getOrderDetailList();
        sendEmail();
    }

    public void sendEmail() {
        boolean sent = serviceUtil.sendPurchaseSuccessEmail(daasUser, order, orderDetail, orderDetailList);
        if (sent) {
        } else {
            alerts.setError("PurchaseSuccess Mail link not sent. Error sending email");
        }
    }

}
