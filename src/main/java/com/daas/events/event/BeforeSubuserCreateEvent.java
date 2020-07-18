package com.daas.events.event;

import com.daas.entities.user.SubUser;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;


@Getter
@Setter
public class BeforeSubuserCreateEvent extends ApplicationEvent implements BaseEvent {

    private SubUser subUser;

    public BeforeSubuserCreateEvent(SubUser user) {
        super(user);
        this.subUser = user;
    }
}
