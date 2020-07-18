package com.daas.events.base;

import com.daas.services.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;

public abstract class BaseAbstractEventListener implements BaseEventListener {

    @Autowired
    protected EmailService emailService;

    @Autowired
    protected Environment environment;
}
