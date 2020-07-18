package com.daas.mail;

import lombok.Getter;
import lombok.Setter;

import javax.mail.internet.InternetAddress;
import java.util.List;
import java.util.Map;

@Getter
@Setter
public class Mail {

    private String from;
    private String to;
    private String subject;
    private List<Object> attachments;
    private Map<String, Object> model;
    private InternetAddress[] toEmailIds;

    public Mail() {

    }

}
