package com.daas.events.listener.daas;

import com.daas.alerts.Alerts;
import com.daas.entities.DaaS.Product;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.daas.OCRPurchaseSuccessEvent;
import com.daas.events.event.daas.ProductUpdateSuccessEvent;
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
public class ProductUpdateSuccessEventListener extends BaseAbstractEventListener implements ApplicationListener<ProductUpdateSuccessEvent> {

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    @Autowired
    private UserUtil userUtil;

    private List<String> usersListEmailSrt;
    private Product productData;

    @Override
    public void onApplicationEvent(ProductUpdateSuccessEvent event) {
        this.usersListEmailSrt = event.getUsersListEmailSrt();
        this.productData = event.getProductData();
        sendEmail();
    }

    public void sendEmail() {
        boolean sent = serviceUtil.sendProductUpdateSuccessEmail(usersListEmailSrt, productData);
        if (sent) {
        } else {
            alerts.setError("Product Update Mail not sent. Error sending email");
        }
    }
}
