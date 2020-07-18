package com.daas.events.event;

import com.daas.entities.subscriptions.ChargeRequest;
import com.daas.entities.user.User;
import com.daas.events.base.BaseEvent;
import com.stripe.model.Charge;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;


@Getter
@Setter
public class SubscriptionEvent extends ApplicationEvent implements BaseEvent {

    private User user;

    private Charge charge;

    private ChargeRequest chargeRequest;

    public SubscriptionEvent(User user, Charge charge, ChargeRequest chargeRequest) {
        super(user);
        this.user = user;
        this.charge = charge;
        this.chargeRequest = chargeRequest;
    }
}
