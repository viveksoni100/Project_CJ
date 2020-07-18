/*
 * Copyright (c) 5/3/18 11:15 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.config.socket;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * Websocket message broker settings
 */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketSockJsBrokerConfig implements WebSocketMessageBrokerConfigurer {

    long heartbeatServer = 10000; // 10 seconds
    long heartbeatClient = 10000; // 10 seconds

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {

        /*ThreadPoolTaskScheduler ts = new ThreadPoolTaskScheduler();
        ts.setPoolSize(2);
        ts.setThreadNamePrefix("wss-heartbeat-thread-");
        ts.initialize();*/




    }

    /*@Bean
    public PresenceChannelInterceptor presenceChannelInterceptor() {
        return new PresenceChannelInterceptor();
    }*/

    /*@Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.setInterceptors(presenceChannelInterceptor());
    }

    @Override
    public void configureClientOutboundChannel(ChannelRegistration registration) {
        registration.taskExecutor().corePoolSize(8);
        registration.setInterceptors(presenceChannelInterceptor());
    }*/

    public void registerStompEndpoints(StompEndpointRegistry registry) {

        registry.addEndpoint("/advertiseupdate").setAllowedOrigins("*").withSockJS();
    }


}