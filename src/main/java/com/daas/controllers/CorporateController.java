package com.daas.controllers;

import com.daas.entities.common.UsersWithoutEmail;
import com.daas.entities.subscriptions.ChargeRequest;
import com.daas.entities.user.EditUser;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.SubUserHistory;
import com.daas.entities.user.User;
import com.daas.events.event.SubscriptionEvent;
import com.daas.mail.Mail;
import com.daas.repositories.iface.user.SubUserHistoryRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.services.EmailService;
import com.daas.services.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping(value = {"/corporate"})
@PreAuthorize(value = "hasRole('ROLE_USER')")
public class CorporateController extends AbstractBaseController {


    public final static Logger LOG = LogManager.getLogger(CorporateController.class.getName());

    @Autowired
    private SubUserRepository subUserRepository;

    @Autowired
    private SubUserHistoryRepository subUserHistoryRepository;


    @Autowired
    private StripeService paymentsService;

    @Autowired
    private EmailService emailService;

    public static final String baseTemplate = "corporate/";
    public static final String redirect = "redirect:/corporate/";

    @GetMapping(value = {"/subusers/list"})
    public String subusers(ModelMap model, RedirectAttributes redirectAttributes,
                           @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable) {

        try {
            User currentUser = userUtil.getCurrentUser();
            Page<SubUser> subUserList = subUserRepository.findAllByParentUser(currentUser, pageable);
            model.addAttribute("user", currentUser);
            model.addAttribute("subusers", subUserList);
            model.addAttribute("pagingUrl", "/ajax/corporate/paging/subusers");
            model.addAttribute("pageable", pageable);

        } catch (Exception e) {

        }
        return baseTemplate + "subuser/list";
    }

    @GetMapping(value = {"/checkout"})
    public String checkout(ModelMap model, RedirectAttributes redirectAttributes) {

        try {
            model.addAttribute("amount", 1000);
            model.addAttribute("currency", "USD");

        } catch (Exception e) {

        }
        return "user/checkout";
    }

    @PostMapping("/charge")
    public String charge(ChargeRequest chargeRequest, ModelMap model, RedirectAttributes redirectAttributes)
            throws StripeException {
        try {
            chargeRequest.setDescription("Example charge");
            chargeRequest.setCurrency(ChargeRequest.Currency.USD);
            Map<String, String> params = new HashMap<>();
            params.put("userId", userUtil.getCurrentUser().getId().toString());
            chargeRequest.setParams(params);

            Integer amountPerUserPerInterval = serviceUtil.getSubscriptionAmount(chargeRequest.getType(), 1);
            Integer amountPerUser = chargeRequest.getAmount() / amountPerUserPerInterval;
            if (amountPerUser == chargeRequest.getTotalUsers()) {
                Charge charge = paymentsService.charge(chargeRequest);
                model.addAttribute("id", charge.getId());
                model.addAttribute("status", charge.getStatus());
                model.addAttribute("chargeId", charge.getId());
                model.addAttribute("balance_transaction", charge.getBalanceTransaction());
                eventPublisher.publishEvent(new SubscriptionEvent(userUtil.getCurrentUser(), charge, chargeRequest));

                alerts.setSuccess("Users added!");

            } else {
                alerts.setError("Amount and users mismatched. Please try again");
            }


        } catch (Exception e) {
            LOG.error("Error");
            alerts.setError("general.error.msg");
        }

        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();

        if (subUserRepository.findAllByParentUser(userUtil.getCurrentUser()) == null || subUserRepository.findAllByParentUser(userUtil.getCurrentUser()).isEmpty()) {
            return "redirect:/corporate/checkout";
        } else {
            return "redirect:/corporate/invites";
        }
    }

    @GetMapping(value = {"/invites"})
    public String invites(ModelMap model, RedirectAttributes redirectAttributes) {

        User currentUser = userUtil.getCurrentUser();
        List<SubUser> subUsers = subUserRepository.findAllByParentUser(currentUser);

        List<SubUser> usersWithoutEmailList = subUsers.stream().filter(subUser -> subUser.getEmail() == null || subUser.getEmail().isEmpty()).collect(Collectors.toList());

        if (usersWithoutEmailList.isEmpty()) {
            return "user/checkout";
        }

        UsersWithoutEmail usersWithoutEmail = new UsersWithoutEmail();
        usersWithoutEmail.setSubUsers(usersWithoutEmailList);
        SubUser superUserIsSubUser = subUserRepository.findFirstByEmail(currentUser.getEmail());

        try {
            model.addAttribute("usersWithoutEmail", usersWithoutEmail);
        } catch (Exception e) {

        }
        return "user/newusermails";
    }

    @PostMapping(value = {"/invites"})
    public String invites(@Valid @ModelAttribute("usersWithoutEmail") UsersWithoutEmail usersWithoutEmail, BindingResult bindingResult
            , ModelMap model, RedirectAttributes redirectAttributes, HttpServletRequest request){

        if (bindingResult.hasErrors()) {
            return "redirect:/corporate/invites";
        }

        for (SubUser subUser : usersWithoutEmail.getSubUsers()) {

            SubUser subUserByEmail = subUserRepository.findFirstByEmail(subUser.getEmail());

            Set<ConstraintViolation<@Email @NotNull @NotEmpty String>> constraintViolations = validator.validate("", SubUser.class);

            if (constraintViolations.size() > 0) {
                redirectAttributes.addFlashAttribute("message", "Failed");
                redirectAttributes.addFlashAttribute("alertClass", "alert-danger");
                return "redirect:/corporate/invites";
            }
            if (subUserByEmail == null) {
                SubUser subUserById = subUserRepository.findFirstById(subUser.getId());
                if (subUserById != null) {
                    subUserById.setEmail(subUser.getEmail());
                  //      subUserRepository.save(subUserById);
                    sendVerificationMail(subUserById);
                }
            } else {
                alerts.setError("User exists with similar id: " + subUser.getEmail());
                LOG.error("ERROR", "User exists with similar id: " + subUser.getEmail());
                redirectAttributes.addFlashAttribute("message", "Failed");
                redirectAttributes.addFlashAttribute("alertClass", "alert-danger");
            }
        }

        redirectAttributes.addFlashAttribute("message", "Success");
        redirectAttributes.addFlashAttribute("alertClass", "alert-success");
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();

        return "redirect:/corporate/invites";
    }

    private void sendVerificationMail(SubUser subUser) {

        try {
                Map<String, Object> model = new HashMap<>();
                model.put("name", subUser.getFirstName() + " " + subUser.getLastName());
                model.put("defaultPassword", serviceUtil.randomString());
                model.put("email", subUser.getEmail());
                model.put("baseUrl", serviceUtil.getBaseUrl());
                model.put("getAppName", serviceUtil.getAppName());
                model.put("owner", "Jay" + " " + "Trivedi");
                model.put("company", subUser.getParentUser().getCountry());
                Mail mail = new Mail();
                mail.setFrom(environment.getProperty("from.email"));
                mail.setTo(subUser.getEmail());
                mail.setSubject("Welcome to "+serviceUtil.getAppName());
                mail.setModel(model);
                emailService.sendEmail(mail, "mail/host/welcome");


        } catch (Exception e) {
            LOG.error("Error creating default location/host - " + subUser.getEmail(), e);
        }
    }

    @PostMapping(value = {"/renew/submit"})
    public String renewSubmit(ChargeRequest chargeRequest, ModelMap model, RedirectAttributes redirectAttributes, HttpServletRequest request){
        Integer totalAmout = 0;
        try {

            String[] userIds = request.getParameterValues("userIds[]");
            List<SubUser> subUserList = new ArrayList<>();
            List<SubUserHistory> subUserHistories = new ArrayList<>();
            for (String sUser : userIds) {
                SubUser subUser = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(sUser));
                    Integer amount = (subUser.getSubscriptionType().equalsIgnoreCase("y")) ? Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_YEARLY")) : Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_MONTHLY"));
                totalAmout = totalAmout + amount;
                subUserList.add(subUser);
            }

            chargeRequest.setDescription("Example charge");
            chargeRequest.setCurrency(ChargeRequest.Currency.USD);
            Map<String, String> params = new HashMap<>();
            params.put("userId", userUtil.getCurrentUser().getId().toString());
            chargeRequest.setAmount(totalAmout);
            chargeRequest.setParams(params);


            if (totalAmout > 0) {
                chargeRequest.setAmount(totalAmout*100);
                Charge charge = paymentsService.charge(chargeRequest);
                for (SubUser sUser : subUserList) {
                    if (sUser.getExpiryDate().compareTo(LocalDate.now()) > 0){
                        sUser.setExpiryDate((sUser.getSubscriptionType().equalsIgnoreCase("y")) ? sUser.getExpiryDate().plusYears(1) : sUser.getExpiryDate().plusMonths(1));
                    }else{
                        sUser.setExpiryDate((sUser.getSubscriptionType().equalsIgnoreCase("y")) ? LocalDate.now().plusYears(1) : LocalDate.now().plusMonths(1));
                    }

                    sUser.setTransactionId(charge.getBalanceTransaction());
                    sUser.setStatus(true);

                    SubUserHistory subUserHistory = new SubUserHistory();
                    subUserHistory.setSubuserHistory(sUser);
                    subUserHistories.add(subUserHistory);
                    //subUserRepository.save(sUser);
                }
                if (subUserList.size() > 1)
                    subUserRepository.saveAll(subUserList);
                else
                    subUserRepository.save(subUserList.get(0));

                subUserHistoryRepository.saveAll(subUserHistories);
                model.addAttribute("id", charge.getId());
                model.addAttribute("status", charge.getStatus());
                model.addAttribute("chargeId", charge.getId());
                model.addAttribute("balance_transaction", charge.getBalanceTransaction());

                //eventPublisher.publishEvent(new SubscriptionEvent(userUtil.getCurrentUser(), charge, chargeRequest));

                alerts.setSuccess("Users renew done!");

            } else {
                alerts.setError("Wrong amount and users mismatched. Please try again");
            }

            model.addAttribute("users", userIds);
            model.addAttribute("amount", totalAmout);
            model.addAttribute("count", userIds.length);
            model.addAttribute("success", false);
        } catch (Exception e) {
            alerts.setError("general.error.msg");
            LOG.error("Error ", e);
        }
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();
        return "redirect:/corporate/subusers/list";

    }


    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }


    @GetMapping(value = {"/edit/profile"})
    public String getCorporateProfile(HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model, @RequestParam Optional<String> active) {
        String ret = "/home";
        try {

            User user = userUtil.getCurrentUser();

            if (user != null) {
                model.addAttribute("editUser", user);

                //model.addAttribute("active", (active.isPresent() && active.get().equalsIgnoreCase("user")) ? "user" : "profile");
                ret = "user/edit_profile";
            }
        } catch (Exception e) {
            LOG.error("Error getting details of users ", e);
        }
        model.addAttribute("success", false);
        return ret;
    }

    //View/Edit profile (POST mapping for corporate admin)
    @PostMapping(value = {"/edit/profile"})
    public String passwordEditPost(@ModelAttribute("editUser") User user, BindingResult result, HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model,
                                   @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        //System.out.println(user.getName());
        boolean success = false;
        String ret =  "user/edit_profile";
        try {

            User currentUser = userUtil.getCurrentUser();

            /*Set<ConstraintViolation<User>> violations = validator.validate(user);
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                model.addAttribute("editUser", user);
                alerts.setError("required.fields.missing");
            }*/

            String tempFName = user.getFirstName();
            String tempLName = user.getLastName();
            String tempTelephone = user.getPhone();
            //String tempEmail = user.getEmail();

            currentUser.setFirstName(tempFName);
            currentUser.setLastName(tempLName);
            currentUser.setPhone(tempTelephone);
            //currentUser.setEmail(tempEmail);



            /*if (!userUtil.isEmailValid(currentUser.getEmail())) {
                model.addAttribute("editUser", user);
                alerts.setError("Email is not valid");
            }
            else */if(currentUser.getPhone().equals("")){
                model.addAttribute("editUser",user);
                alerts.setError("Phone number is not valid");
            }
            else {
                userRepository.save(currentUser);
                //System.out.println(currentUser.getName());
                success = true;
                alerts.setSuccess("Profile Updated");
            }
        } catch (Exception e) {
            LOG.error("Error saving user info", e);
            alerts.setError("general.error.msg");
        }
        model.addAttribute("active", "profile");
        model.addAttribute("success", success);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        return ret;
    }
}
