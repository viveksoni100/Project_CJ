package com.daas.events.listener.daas;

import com.daas.alerts.Alerts;
import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.utilities.session.UserUtil;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;
import com.daas.events.event.daas.OCRPurchaseSuccessEvent;

import java.util.List;

@Component
@Getter
@Setter
public class OCRPurchaseSuccessEventListener extends BaseAbstractEventListener implements ApplicationListener<OCRPurchaseSuccessEvent> {

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
    public void onApplicationEvent(OCRPurchaseSuccessEvent event) {
        this.daasUser = userUtil.getCurrentUser();
        this.order = event.getOrder();
        this.orderDetail = event.getOrderDetail();
        this.orderDetailList = event.getOrderDetailList();
        sendEmail();

    }

    public void sendEmail() {
        boolean sent = serviceUtil.sendOCRPurchaseSuccessEmail(daasUser, order, orderDetail, orderDetailList);
        if (sent) {
        } else {
            alerts.setError("OCRPurchaseSuccess Mail link not sent. Error sending email");
        }
    }
}
