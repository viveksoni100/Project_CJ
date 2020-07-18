package com.daas.events.event;

import com.daas.entities.user.User;
import com.daas.events.base.BaseEvent;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class RegistrationEvent extends ApplicationEvent implements BaseEvent {

    private User user;

    public RegistrationEvent(User user) {
        super(user);
        this.user = user;
    }
}
