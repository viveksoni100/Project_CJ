package com.daas.task;

import com.daas.entities.subscriptions.Notifications;
import com.daas.entities.user.SubUser;
import com.daas.mail.Mail;
import com.daas.repositories.iface.subscriptions.NotificationsRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.services.EmailService;
import com.daas.task.base.AbstractBaseTask;
import com.daas.utilities.singleton.CommonUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.Scheduled;

import javax.mail.internet.InternetAddress;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class NotificationTask extends AbstractBaseTask {

    public final static Logger LOG = LogManager.getLogger(NotificationTask.class.getName());

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private SubUserRepository subUserRepository;

    @Autowired
    protected EmailService emailService;

    @Autowired
    protected Environment environment;

    @Scheduled(fixedDelay = 86400000)
    public void sendReminders() {
        try {
            List<Notifications> notificationsList = notificationsRepository.findAllByStatus(true);
            List<SubUser> subUsers = new ArrayList<>();
            List<InternetAddress> emails = new ArrayList<>();
            for (Notifications notification : notificationsList) {
                if (notification.getNotificationType().toLowerCase().equals("months")) {
                    subUsers = subUserRepository.findAllByExpiryDateEquals(LocalDate.now().plusMonths(Integer.parseInt(notification.getDays())));
                } else if (notification.getNotificationType().toLowerCase().equals("days")) {
                    subUsers = subUserRepository.findAllByExpiryDateEquals(LocalDate.now().plusDays(Integer.parseInt(notification.getDays())));
                }

                for (SubUser subuser : subUsers) {
                    if (subuser.getEmail() != null && CommonUtil.isEmailIdValid(subuser.getEmail())) {
                        emails.add(new InternetAddress(subuser.getEmail()));
                    }
                }


                if (emails!=null && emails.size() > 0) {
                    Map<String, Object> model = new HashMap<>();
                    model.put("name", "User");
                    InternetAddress[] addresses = emails.toArray(new InternetAddress[emails.size()]);

                    Mail mail = new Mail();
                    mail.setFrom(environment.getProperty("from.email"));
                    mail.setToEmailIds(addresses);
                    mail.setSubject("Subscription expiring soon");
                    mail.setModel(model);

                    emailService.sendEmailToMultipleRecipient(mail, "mail/subscription/reminder");
                }
            }
            LOG.info("Reminder sent to users for renewal :  " + LocalDateTime.now());
        } catch (Exception e) {
            LOG.error("Error in query sending reminders", e);
        }
    }
}
