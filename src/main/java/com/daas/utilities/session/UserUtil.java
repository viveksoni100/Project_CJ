package com.daas.utilities.session;

import com.daas.entities.DaaS.DaasMsg;
import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.DaaS.Product;
import com.daas.entities.security.RequestUserDetails;
import com.daas.entities.user.BaseUser;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.User;
import com.daas.entities.user.VerificationToken;
import com.daas.mail.Mail;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.services.EmailService;
import com.daas.utilities.base.BaseServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import pl.allegro.finance.tradukisto.MoneyConverters;

import java.math.BigDecimal;
import java.util.*;
import java.util.regex.Pattern;


@Getter
@Setter
public class UserUtil extends BaseServiceUtil {

    public final static Logger LOG = LogManager.getLogger(UserUtil.class.getName());

    @Value("${daas.ocradmin}")
    private String ocrAdminEmail;

    @Value("${spring.mail.username}")
    private String GTDSupportDesk;

    @Autowired
    protected EmailService emailService;

    @Autowired
    protected SubUserRepository subUserRepository;

    Integer subuserCount = null;
    Integer allowedSubusersCount = null;

    public boolean sendPurchaseSuccessEmail(User daasUser, Order order, OrderDetail orderDetail, List<OrderDetail> orderDetailList) {
        try {

            String orderNetPriceInWords = getMoneyIntoWords(Float.toString(order.getNetPrice()));
            orderNetPriceInWords = orderNetPriceInWords.substring(0,1).toUpperCase() + orderNetPriceInWords.substring(1);
            orderNetPriceInWords = orderNetPriceInWords.substring(0, orderNetPriceInWords.length() - 9);

            Map<String, Object> model = new HashMap<>();
            model.put("name", daasUser.getFirstName());
            model.put("firstName", daasUser.getFirstName());
            model.put("lastName", daasUser.getLastName());
            /*model.put("appName", this.getAppName());*/
            model.put("appName", "Daas / Aaas");
            model.put("baseURL", getBaseUrl());
            model.put("title", "Purchase Success Email");
            model.put("order", order);
            model.put("orderDetail", orderDetail);
            model.put("orderDetailList", orderDetailList);
            model.put("orderNetPriceInWords", orderNetPriceInWords);

            Mail mail = new Mail();
            mail.setFrom(environment.getProperty("from.email"));
            mail.setTo(daasUser.getEmail());
            mail.setSubject(this.getAppName() + " purchase success email");
            mail.setModel(model);

            emailService.sendEmail(mail, "mail/daas/purchase-success");

            return true;
        } catch (Exception e) {
            LOG.error("Error sending verification link " + daasUser.getEmail(), e);
        }
        return false;

    }

    public static String getMoneyIntoWords(String input){
        MoneyConverters moneyConverters = MoneyConverters.ENGLISH_BANKING_MONEY_VALUE;
        return moneyConverters.asWords(new BigDecimal(input));
    }

    public boolean sendAPI90PerMail(User user, Order order, OrderDetail orderDetail){

        try {

            Map<String, Object> model = new HashMap<>();
            model.put("appName", this.getAppName());
            model.put("baseURL", getBaseUrl());
            model.put("title", "90% API calls consumed");
            model.put("order", order);
            model.put("orderDetail", orderDetail);
            model.put("user", user);

            Mail mail = new Mail();
            mail.setFrom(environment.getProperty("from.email"));
            mail.setTo(user.getEmail());
            mail.setSubject(this.getAppName() + " 90% API calls consumed email");
            mail.setModel(model);

            emailService.sendEmail(mail, "mail/daas/api90perc.html");

            return true;
        } catch (Exception e) {
            LOG.error("Error sending OCR Purchase Success mail", e);
        }
        return false;

    }

    public boolean sendOCRPurchaseSuccessEmail(User daasUser, Order order, OrderDetail orderDetail, List<OrderDetail> orderDetailList,
                                               List<OrderDetail> productDataList, List<OrderDetail> productApiList) {

        try {

            Map<String, Object> model = new HashMap<>();
            model.put("name", daasUser.getFirstName());
            model.put("firstName", daasUser.getFirstName());
            model.put("lastName", daasUser.getLastName());
            /*model.put("appName", this.getAppName());*/
            model.put("appName", "Daas / Aaas");
            model.put("baseURL", getBaseUrl());
            model.put("title", "OCR Purchase Success Email");

            model.put("order", order);
            model.put("orderDetail", orderDetail);
            model.put("orderDetailList", orderDetailList);
            model.put("daasUser", daasUser);
            model.put("productDataList", productDataList);
            model.put("productApiList", productApiList);

            Mail mail = new Mail();
            mail.setFrom(environment.getProperty("from.email"));
            mail.setTo(ocrAdminEmail);
            mail.setSubject(this.getAppName() + " ocr purchase success email");
            mail.setModel(model);

            emailService.sendEmail(mail, "mail/daas/ocr-purchase-success");

            return true;
        } catch (Exception e) {
            LOG.error("Error sending OCR Purchase Success mail", e);
        }
        return false;

    }

    public boolean sendMessageEventMail(DaasMsg daasMsg) {

        try {

            Map<String, Object> model = new HashMap<>();
            model.put("appName", "Daas / Aaas");
            model.put("baseURL", getBaseUrl());
            model.put("title", "Inquiry to GTD Support Desk");

            model.put("daasMsg", daasMsg);

            Mail mail = new Mail();
            mail.setFrom(environment.getProperty("from.email"));
            mail.setTo(GTDSupportDesk);
            mail.setSubject(this.getAppName() + " Inquiry to GTD Support Desk");
            mail.setModel(model);

            emailService.sendEmail(mail, "mail/daas/send-msg");

            return true;
        } catch (Exception e) {
            LOG.error("Error sending send message mail", e);
        }
        return false;

    }

    public boolean sendProductUpdateSuccessEmail(List<String> usersListEmailSrt, Product productData) {

        try {

            for (int i = 0; i < usersListEmailSrt.size(); i++) {

                Map<String, Object> model = new HashMap<>();
                /*model.put("name", daasUser.getFirstName());*/
                /*model.put("appName", this.getAppName());*/
                model.put("appName", "Daas / Aaas");
                model.put("baseURL", getBaseUrl());
                model.put("title", "Product Update Success Email");

                model.put("productData", productData);

                int newerVersionIndex = productData.getProductVersions().size() - 1;
                int previousVersionIndex = productData.getProductVersions().size() - 2;
                String newerVersion = productData.getProductVersions().get(newerVersionIndex).getProductVersionName();
                String previousVersion = productData.getProductVersions().get(previousVersionIndex).getProductVersionName();
                String versionNotes = productData.getProductVersions().get(newerVersionIndex).getProductVersionNote();

                model.put("previousVersion", previousVersion);
                model.put("newerVersion", newerVersion);
                model.put("versionNotes", versionNotes);

                Mail mail = new Mail();
                mail.setFrom(environment.getProperty("from.email"));
                mail.setTo(usersListEmailSrt.get(i));
                mail.setSubject(this.getAppName() + " product update success email");
                mail.setModel(model);

                emailService.sendEmail(mail, "mail/daas/product-update");

            }

            return true;

        } catch (Exception e) {
            LOG.error("Error sending product update mail ", e);
        }
        return false;

    }

    public boolean sendVerificationLink(User user, VerificationToken token) {
        try {

            Map<String, Object> model = new HashMap<>();
            model.put("name", user.getFirstName());
            model.put("email", user.getEmail());
            model.put("verificationToken", token.getToken());
            /*model.put("appName", this.getAppName());*/
            model.put("appName", "Daas / Aaas");
            model.put("baseURL", getBaseUrl());
            model.put("title", "Email Verification");

            Mail mail = new Mail();
            mail.setFrom(environment.getProperty("from.email"));
            mail.setTo(user.getEmail());
            mail.setSubject(this.getAppName() + " registration verification email");
            mail.setModel(model);

            emailService.sendEmail(mail, "mail/user/verification");

            return true;
        } catch (Exception e) {
            LOG.error("Error sending verification link " + user.getEmail(), e);
        }
        return false;
    }

    public boolean isStringNumeric(String text) {
        char[] nums = text.toCharArray();
        for (char ch : nums)
            if (!Character.isDigit(ch))
                return true;
        return false;
            /*try {

            Integer.parseInt(text);
            return true;
        } catch(Exception e){

        }*/

    }

    public boolean isEmailValid(String email) {
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\." +
                "[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-z" +
                "A-Z]{2,7}$";

        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }

    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

   /* public User getCurrentUser() {
        User user = null;
        try {
            user = userRepository.findFirstByEmail(getAuthentication().getName());
        } catch (Exception e) {
        }
        return user;
    }*/

    public Integer getSubUserCount() {

        try {
            if (this.subuserCount == null) {
                User currentUser = this.getCurrentUser();
                this.subuserCount = subUserRepository.countByParentUser(currentUser);
                return this.subuserCount;
            }
        } catch (Exception e) {
            LOG.error("Error getting sub user count");
        }
        return 0;
    }


    public Integer getAllowedSubUserCount() {

        try {
            if (this.allowedSubusersCount == null) {
                User currentUser = this.getCurrentUser();
                this.subuserCount = subUserRepository.countByParentUser(currentUser);
                return this.subuserCount;
            }
        } catch (Exception e) {
            LOG.error("Error getting sub user count");
        }
        return 0;
    }


    public User getCurrentUser() {
        User user = null;
        try {

            Integer userType = ((RequestUserDetails) getAuthentication().getPrincipal()).getPersonId();
            if (userType.equals(1)) {
                user = userRepository.findFirstByEmail(getAuthentication().getName());
            } else {
                SubUser subUser = subUserRepository.findFirstByEmail(getAuthentication().getName());
                user = subUser.getParentUser();
            }
        } catch (Exception e) {
        }
        return user;
    }

    public SubUser getCurrentSubuser() {
        SubUser subuser = new SubUser();
        subuser.setId(0l);
        try {
            if (isSubuser())
                return subUserRepository.findFirstByEmail(getRequestUserDetails().getUsername());
            else {
                String email = this.getCurrentUser().getEmail();
                subuser = subUserRepository.findFirstByEmail(email);
            }
        } catch (Exception e) {
            LOG.error("error getting current subuser", e);
        }
        return subuser;
    }

    public boolean isSubuser() {
        BaseUser user = new User();
        try {
            Authentication authentication = getAuthentication();
            Integer userType = ((RequestUserDetails) authentication.getPrincipal()).getPersonId();
            if (userType.equals(1)) {
                return false;
            } else {
                return true;
            }
        } catch (Exception e) {
            LOG.error("error getting if usertype is subuser or user", e);
        }
        return false;

    }


    public RequestUserDetails getRequestUserDetails() {
        BaseUser user = new User();
        try {
            Authentication authentication = getAuthentication();
            LOG.error("Authentication object " + authentication.getName());
            return ((RequestUserDetails) authentication.getPrincipal());
        } catch (Exception e) {
            LOG.error("error getting RequestUserDetails object", e);
        }
        return null;

    }


    public void addAuthority(String authority) {
        try {
            Authentication auth = getAuthentication();

            Set<GrantedAuthority> updatedAuthorities = new HashSet<>(auth.getAuthorities());
            updatedAuthorities.add(new SimpleGrantedAuthority(authority)); //add your role here [e.g., new SimpleGrantedAuthority("ROLE_NEW_ROLE")]
            Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(newAuth);
        } catch (Exception e) {
            LOG.error("Error adding authority ", e);
        }
    }

    public void removeAuthority(String authority) {
        try {
            Authentication auth = getAuthentication();

            Set<GrantedAuthority> updatedAuthorities = new HashSet<>(auth.getAuthorities());
            updatedAuthorities.remove(new SimpleGrantedAuthority(authority)); //add your role here [e.g., new SimpleGrantedAuthority("ROLE_NEW_ROLE")]
            Authentication newAuth = new UsernamePasswordAuthenticationToken(auth.getPrincipal(), auth.getCredentials(), updatedAuthorities);
            SecurityContextHolder.getContext().setAuthentication(newAuth);
        } catch (Exception e) {

        }
    }
}
