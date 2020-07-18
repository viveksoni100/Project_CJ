package com.daas.services;


import com.daas.mail.Attachment;
import com.daas.mail.Mail;
import com.daas.utilities.singleton.CommonUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Autowired
    protected Environment environment;

    @Autowired
    private CommonUtil commonUtil;




    public final static Logger LOG = LogManager.getLogger(EmailService.class.getName());

    @Async
    public void sendEmail(Mail mail, String template) throws MessagingException, IOException, Exception {
        try {
            if (commonUtil.isEmailIdValid(mail.getTo()) && environment.getProperty("email.enabled") != null && environment.getProperty("email.enabled").equalsIgnoreCase("true")) {
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

                Context context = new Context();
                mail.getModel().put("baseUrl", environment.getProperty("base.url"));
                mail.getModel().put("daasLogo", "daasLogo");

                context.setVariables(mail.getModel());
                String html = templateEngine.process(template, context);

                LOG.info("Sending email to " + mail.getTo());
                helper.setTo(mail.getTo());
                helper.setText(html, true);

                helper.setSubject(mail.getSubject());
                helper.setFrom(mail.getFrom());
                FileSystemResource res = new FileSystemResource(EmailService.class.getResource("/static/front/images/daas-logo-round-new.png").getFile());
                helper.addInline("daasLogo", res);
                emailSender.send(message);
                LOG.info("Email sent to " + mail.getTo());
            }
        } catch (Exception e) {
            LOG.error("Error sending email ", e);
            throw new Exception(e);
        }
    }


    @Async
    public void sendEmailToMultipleRecipient(Mail mail, String template) throws MessagingException, IOException, Exception {
        try {
            if (environment.getProperty("email.enabled") != null && environment.getProperty("email.enabled").equalsIgnoreCase("true")) {
                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

                mail.getModel().put("baseUrl", environment.getProperty("base.url"));
                mail.getModel().put("daasLogo", "daasLogo");
                Context context = new Context();

                context.setVariables(mail.getModel());
                String html = templateEngine.process(template, context);
                helper.setTo(mail.getToEmailIds());
                helper.setText(html, true);
                helper.setSubject(mail.getSubject());
                helper.setFrom(mail.getFrom());
                /*FileSystemResource res = new FileSystemResource(EmailService.class.getResource("/static/front/images/daas-logo.jpg").getFile());*/
                /*FileSystemResource res = new FileSystemResource(EmailService.class.getResource("/static/front/images/daas-logo-round.png").getFile());
                helper.addInline("daasLogo", res);*/
                emailSender.send(message);
                LOG.info("Email sent to " + mail.getTo());
            }
        } catch (Exception e) {
            LOG.error("Error sending email ", e);
            throw new Exception(e);
        }
    }

    @Async
    public void sendEmailWithAttachment(Mail mail, String template, List<Attachment> attachmentList) throws MessagingException, IOException, Exception {
        if (commonUtil.isEmailIdValid(mail.getTo()) && environment.getProperty("email.enabled") != null && environment.getProperty("email.enabled").equalsIgnoreCase("true")) {
            try {

                MimeMessage message = emailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(message,
                        MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                        StandardCharsets.UTF_8.name());

                String cid = "logo.png";
                Context context = new Context();
                mail.getModel().put("baseUrl", environment.getProperty("base.url"));
                mail.getModel().put("daasLogo", "daasLogo");
                context.setVariables(mail.getModel());
                String html = templateEngine.process(template, context);
                LOG.info("Sending email to " + mail.getTo());
                helper.setTo(mail.getTo());
                helper.setText(html, true);
                for (Attachment attachment : attachmentList) {
                    if (attachment.getType().equalsIgnoreCase("inline"))
                        helper.addInline(attachment.getCid(), attachment.getFile());
                    else
                        helper.addAttachment(attachment.getCid(), attachment.getFile());
                }
                helper.setSubject(mail.getSubject());
                helper.setFrom(mail.getFrom());
                FileSystemResource res = new FileSystemResource(EmailService.class.getResource("/static/front/images/daas-logo.jpg").getFile());
                helper.addInline("daasLogo", res);
                emailSender.send(message);
                LOG.info("Email sent to " + mail.getTo());
            } catch (Exception e) {
                LOG.error("Error sending email ", e);
                throw new Exception(e);
            }
        } else {
            try {
                LOG.error("Error sending email as email id is not valid '" + mail.getTo() + "'");
                LOG.info("Error sending email as email id is not valid '" + mail.getTo() + "'");
            } catch (Exception e) {
                LOG.error("Error sending email as email id is not valid ", e);
                LOG.info("Error sending email as email id is not valid ", e);
            }
        }
    }

}
