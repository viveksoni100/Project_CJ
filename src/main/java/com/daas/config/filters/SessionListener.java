package com.daas.config.filters;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

public class SessionListener implements HttpSessionListener {

    public static final Logger logger = LogManager.getLogger(SessionListener.class.getName());
    @Override
    public void sessionCreated(HttpSessionEvent event) {

        event.getSession().setMaxInactiveInterval(60 * 365);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        logger.info("Session destroyed ");
    }
}
