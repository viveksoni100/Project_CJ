package com.daas.events.listener;

import com.daas.alerts.Alerts;
import com.daas.entities.user.SubUser;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.BeforeSubuserCreateEvent;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
public class BeforeSubuserCreateListener extends BaseAbstractEventListener implements ApplicationListener<BeforeSubuserCreateEvent> {

    private SubUser user;

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private Alerts alerts;

    @Override
    public void onApplicationEvent(BeforeSubuserCreateEvent event) {
        this.user = event.getSubUser();


    }




}
