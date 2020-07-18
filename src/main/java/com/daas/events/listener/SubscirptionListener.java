package com.daas.events.listener;

import com.daas.alerts.Alerts;
import com.daas.constants.Constants;
import com.daas.entities.subscriptions.ChargeRequest;
import com.daas.entities.subscriptions.UserSubscriptions;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.SubUserHistory;
import com.daas.entities.user.User;
import com.daas.events.base.BaseAbstractEventListener;
import com.daas.events.event.SubscriptionEvent;
import com.daas.repositories.iface.subscriptions.UserSubscriptionRepository;
import com.daas.repositories.iface.user.RoleRepository;
import com.daas.repositories.iface.user.SubUserHistoryRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.utilities.session.UserUtil;
import com.daas.utilities.singleton.CommonUtil;
import com.daas.utilities.singleton.ServiceUtil;
import com.stripe.model.Charge;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
@Getter
@Setter
public class SubscirptionListener extends BaseAbstractEventListener implements ApplicationListener<SubscriptionEvent> {

    public final static Logger LOG = LogManager.getLogger(SubscirptionListener.class.getName());

    private User user;
    private Charge charge;
    private ChargeRequest chargeRequest;
    private UserSubscriptions userSubscriptions;

    @Autowired
    private ServiceUtil serviceUtil;

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Alerts alerts;

    @Autowired
    private SubUserRepository subUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SubUserHistoryRepository subUserHistoryRepository;

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;



    @Override
    public void onApplicationEvent(SubscriptionEvent event) {
        this.user = event.getUser();
        this.charge = event.getCharge();
        this.chargeRequest = event.getChargeRequest();
        //if (createSubscriptoin())
        createSubUsers();
    }


    public boolean createSubscriptoin() {
        try {
            if (this.charge.getPaid()) {
               /* UserSubscriptions subscriptions = new UserSubscriptions();
                subscriptions.setAmountPaid(charge.getAmount().toString());
                subscriptions.setExpiryDate((this.chargeRequest.getType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                subscriptions.setSubscriptionDate(LocalDate.now());
                subscriptions.setPaymentMethod("Stripe");
                subscriptions.setSubscriptionType(this.chargeRequest.getType());
                subscriptions.setUser(this.user);
                subscriptions.setTotalUsers(this.chargeRequest.getTotalUsers());
                subscriptions.setTransactionId(this.charge.getBalanceTransaction());
                userSubscriptionRepository.save(subscriptions);
                this.userSubscriptions = subscriptions;
                return true;*/
            }
        } catch (Exception e) {
            LOG.error("Error creating subscription", e);
        }
        return false;
    }

    public void createSubUsers() {
        try {
            if (this.charge.getPaid()) {
                List<SubUser> subUsers = new ArrayList<>();
                List<SubUserHistory> subUsersHistories = new ArrayList<>();

                /*Set<UserRole> userRoles = new HashSet<>();
                UserRole userRole = roleRepository.findByRole(Constants.ROLE_SUB_USER);
                userRoles.add(userRole);*/

                int createSubuserCount = this.chargeRequest.getTotalUsers();
                int subuserCountInDb = subUserRepository.countByParentUser(this.user);
                if (subuserCountInDb < 1){
                    SubUser s1 = new SubUser(this.user, this.user.getCountry());
                    s1.setEmail(this.user.getEmail());

                    s1.setFirstName(this.user.getFirstName());
                    s1.setLastName(this.user.getLastName());
                    s1.setPassword(passwordEncoder.encode(CommonUtil.generatePassword(8)));
                    s1.setPhone(this.user.getPhone());
                    s1.setStatus(false);
                    s1.setUsername(this.user.getUsername());
                    s1.setSubscriptionType(this.chargeRequest.getType());


                    s1.setAmountPaid(charge.getAmount().toString());
                    s1.setExpiryDate((this.chargeRequest.getType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                    s1.setSubscriptionDate(LocalDate.now());
                    s1.setPaymentMethod("Stripe");
                    s1.setSubscriptionType(this.chargeRequest.getType());
                    s1.setTransactionId(this.charge.getBalanceTransaction());
                    s1.setExpiryDate((this.chargeRequest.getType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                    subUsers.add(s1);
                    createSubuserCount--;
                }

                for (int i = 0; i < createSubuserCount; i++) {
                    SubUser s1 = new SubUser(this.user, this.user.getCountry());

                    s1.setEmail("");
                    s1.setFirstName("");
                    s1.setLastName("");
                    s1.setPhone("");
                    s1.setStatus(false);
                    s1.setUsername("");
                    s1.setPassword(passwordEncoder.encode(CommonUtil.generatePassword(8)));
                    s1.setSubscriptionType(this.chargeRequest.getType());


                    s1.setAmountPaid(charge.getAmount().toString());
                    s1.setExpiryDate((this.chargeRequest.getType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                    s1.setSubscriptionDate(LocalDate.now());
                    s1.setPaymentMethod("Stripe");
                    s1.setSubscriptionType(this.chargeRequest.getType());
                    s1.setTransactionId(this.charge.getBalanceTransaction());

                    //s1.setUserRoles(userRoles);
                    //s1.setUserSubscriptions(this.userSubscriptions);
                    s1.setExpiryDate((this.chargeRequest.getType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                    subUsers.add(s1);




                }
                subUserRepository.saveAll(subUsers);
                if (this.chargeRequest.getTotalUsers() != createSubuserCount){
                    userUtil.addAuthority(Constants.ROLE_SUB_USER);
                }
                for (SubUser subUser : subUsers) {
                    SubUserHistory subUserHistory = new SubUserHistory();
                    subUserHistory.setSubuserHistory(subUser);
                    subUsersHistories.add(subUserHistory);
                }
                subUserHistoryRepository.saveAll(subUsersHistories);
            }
        } catch (Exception e) {
            LOG.error("Error creating sub users", e);
        }
    }
}
