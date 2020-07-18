package com.daas.entities.subscriptions;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Table(name = "subscription_notifications")
@Entity
@Data
public class Notifications extends BaseEntity {

    @Column(name = "task_id", nullable = false)
    @HtmlValidateConstraint(whiteListType = "none")
    private String taskId;


    @Column(name = "notification_type")
    private String notificationType;


    @Column(name = "days", nullable = false)
    @HtmlValidateConstraint(whiteListType = "none")
    private String days;


    @Column(name = "email")
    private boolean email;

    @Column(name = "sms")
    private boolean sms;


}
