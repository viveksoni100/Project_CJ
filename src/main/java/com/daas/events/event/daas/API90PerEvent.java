package com.daas.events.event.daas;

import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class API90PerEvent extends ApplicationEvent implements BaseEvent {

    private OrderDetail orderDetail;
    private User user;
    private Order order;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public API90PerEvent(User user, Order order, OrderDetail orderDetail) {
        super(user);
        this.user = user;
        this.order = order;
        this.orderDetail = orderDetail;
    }
}
