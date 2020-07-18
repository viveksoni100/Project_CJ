package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;


@Entity
@Getter
@Setter
@Table(name="daas_subscription_notification")
public class SubscriptionNotification extends BaseEntity {

    @Column(name="api_call_percentage_remaining")
    @HtmlValidateConstraint(whiteListType="none")
    private int apiCallPercentageRemaining;

    @Column(name="days_reminder")
    @HtmlValidateConstraint(whiteListType="none")
    private int daysReminder;

    @Column(name="email_id")
    @HtmlValidateConstraint(whiteListType="none")
    private String emailId;

    @Column(name="sms")
    @HtmlValidateConstraint(whiteListType="none")
    private String SMS;

    @Column(name="task_id")
    @HtmlValidateConstraint(whiteListType="none")
    private int taskId;
}
