package com.daas.events.event.daas;

import com.daas.entities.DaaS.DaasMsg;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class SendMessageEvent extends ApplicationEvent implements BaseEvent {

    private DaasMsg daasMsg;

    /**
     * Create a new ApplicationEvent.
     *
     * @param source the object on which the event initially occurred (never {@code null})
     */
    public SendMessageEvent(DaasMsg daasMsg) {
        super(daasMsg);
        this.daasMsg = daasMsg;
    }
}
