package com.daas.events.event.daas;

import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.List;

@Getter
@Setter
public class PurchaseSuccessEvent extends ApplicationEvent implements BaseEvent {

    private User daasUser;
    private Order order;
    private OrderDetail orderDetail;
    private List<OrderDetail> orderDetailList;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public PurchaseSuccessEvent(User daasUser, Order order, OrderDetail orderDetail, List<OrderDetail> orderDetailList) {
        super(daasUser);
        this.daasUser = daasUser;
        this.order = order;
        this.orderDetail = orderDetail;
        this.orderDetailList = orderDetailList;
    }
}
