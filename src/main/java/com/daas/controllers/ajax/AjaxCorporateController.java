package com.daas.controllers.ajax;

import com.daas.components.ajax.AjaxResponse;
import com.daas.constants.Constants;
import com.daas.controllers.AbstractBaseController;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.SubUserHistory;
import com.daas.entities.user.User;
import com.daas.entities.user.UserRole;
import com.daas.events.event.BeforeSubuserCreateEvent;
import com.daas.repositories.iface.user.SubUserHistoryRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.services.StripeService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import java.util.*;

@PreAuthorize("hasRole('ROLE_CORPORATE') or hasRole('ROLE_ADMIN')")
@Controller
@RequestMapping(value = {"/ajax/corporate"})
public class AjaxCorporateController extends AbstractBaseController {

    public final static Logger LOG = LogManager.getLogger(AjaxCorporateController.class.getName());


    @Autowired
    private StripeService paymentsService;

    @Autowired
    private SubUserRepository subUserRepository;

    @Autowired
    private SubUserHistoryRepository subUserHistoryRepository;


    @GetMapping(value = {"/subuser/form", "/subuser/{id}"})
    public String categoryForm(HttpServletRequest request, ModelMap model,
                               @PathVariable Optional<String> id
    ) {

        SubUser subUser = new SubUser();


        if (id.isPresent()) {
            subUser = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
        }
        model.addAttribute("subuser", subUser);
        model.addAttribute("success", false);

        return "ajax/corporate/subuser/create";
    }

    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @PostMapping(value = {"/subuser/create"})
    public String subuser(@ModelAttribute("subuser") SubUser subUser, BindingResult result,
                          @PathVariable Optional<String> id,
                          HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        eventPublisher.publishEvent(new BeforeSubuserCreateEvent(subUser));
        try {

            boolean passwordChanged = true;
            User currentUser = userUtil.getCurrentUser();
            Set<ConstraintViolation<SubUser>> violations = validator.validate(subUser);
            int totalViolations = 0;
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    if (violation.getPropertyPath().toString().equalsIgnoreCase("password")) {
                        if (passwordChanged != false) {
                            result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                            totalViolations++;
                        }
                    } else {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                        totalViolations++;
                    }
                }
                if (totalViolations > 0) {
                    model.addAttribute("success", false);
                    alerts.setError("required.fields.missing");
                }

            }

            if (totalViolations <= 0) {
                subUser.setParentUser(currentUser);
                if (id.isPresent()) {
                    subUser.setPassword(passwordEncoder.encode(subUser.getPassword()));
                } else if (passwordChanged) {
                    subUser.setPassword(passwordEncoder.encode(subUser.getPassword()));
                }

                Set<UserRole> userRoles = new HashSet<>();
                UserRole role = roleRepository.findByRole(serviceUtil.getDefaultRole());
                userRoles.add(role);
                subUser.setUserRoles(userRoles);
                subUserRepository.save(subUser);
                alerts.setSuccess("subuser.create.success");
                model.addAttribute("success", true);
            }
        } catch (Exception e) {
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("subuser", subUser);

        return "ajax/corporate/subuser/create";
    }


    @GetMapping(value = {"/renew"})
    public String renew(ModelMap model, RedirectAttributes redirectAttributes, HttpServletRequest request) {
        Integer totalAmout = 0;
        try {
            String userId = request.getParameter("userIds");
            String[] userIds = userId.split(",");

            for (String sUser : userIds) {
                SubUser subUser = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(sUser));
                Integer amount = (subUser.getSubscriptionType().equalsIgnoreCase("y")) ? Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_YEARLY")) : Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_MONTHLY"));
                totalAmout = totalAmout + amount;
            }
            model.addAttribute("users", userIds);
            model.addAttribute("amount", totalAmout * 100);
            model.addAttribute("count", userIds.length);
            model.addAttribute("success", false);
        } catch (Exception e) {
            LOG.error("Error ", e);
        }

        return "ajax/corporate/subuser/renewform";
        //return (totalAmout > 0) ? "You need to pay " + totalAmout : "There is something wrong. Please try again";
    }


    @PostMapping(value = {"/subuser/create/{id}"})
    public String subuserEdit(@ModelAttribute("subuser") SubUser subUser, BindingResult result,
                              @PathVariable Optional<String> id,
                              HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

            eventPublisher.publishEvent(new BeforeSubuserCreateEvent(subUser));
        try {

            boolean passwordChanged = true;
            User currentUser = userUtil.getCurrentUser();

            SubUser subUserDb = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
            String subuserEmail = subUserDb.getEmail();
            subUser.setAmountPaid(subUserDb.getAmountPaid());
            subUser.setExpiryDate(subUserDb.getExpiryDate());
            subUser.setSubscriptionType(subUserDb.getSubscriptionType());
            subUser.setUserRoles(subUserDb.getUserRoles());
            subUser.setParentUser(subUserDb.getParentUser());
            subUser.setPaymentMethod(subUserDb.getPaymentMethod());
            subUser.setTransactionId(subUserDb.getTransactionId());

            subUser.setSubscriptionDate(subUserDb.getSubscriptionDate());
            subUser.setPlanId(subUserDb.getPlanId());


            subUser.setId(subUserDb.getId());
            if (subUser.getPassword().trim().equalsIgnoreCase("")) {
                subUser.setPassword(subUserDb.getPassword());
                subUser.setConfirmPassword(subUserDb.getPassword());
                passwordChanged = false;
            }

             Set<ConstraintViolation<SubUser>> violations = validator.validate(subUser);
            int totalViolations = 0;
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    if (violation.getPropertyPath().toString().equalsIgnoreCase("password")) {
                        if (passwordChanged != false) {
                            totalViolations++;
                            result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());

                        }
                    } else {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                        totalViolations++;
                    }
                }
                if (totalViolations > 0) {
                    model.addAttribute("success", false);
                    alerts.setError("required.fields.missing");
                }

            }

            if (totalViolations <= 0) {
                subUser.setParentUser(currentUser);
                if (!id.isPresent()) {
                    subUser.setPassword(passwordEncoder.encode(subUser.getPassword()));

                } else if (passwordChanged) {
                    subUser.setPassword(passwordEncoder.encode(subUser.getPassword()));
                }

                if (subUser.getUserRoles() == null || subUser.getUserRoles().size() <= 0) {
                    UserRole role = roleRepository.findByRole(serviceUtil.getDefaultSubuserRole());
                    Set<UserRole> userRoles = new HashSet<>();
                    userRoles.add(role);
                    subUser.setUserRoles(userRoles);
                }
                subUserRepository.save(subUser);
                if (subuserEmail.equalsIgnoreCase(userUtil.getCurrentUser().getEmail()) && !subUser.getEmail().equalsIgnoreCase(userUtil.getCurrentUser().getEmail())) {
                    userUtil.removeAuthority(Constants.ROLE_SUB_USER);
                } else if (!subuserEmail.equalsIgnoreCase(userUtil.getCurrentUser().getEmail()) && subUser.getEmail().equalsIgnoreCase(userUtil.getCurrentUser().getEmail())) {
                    userUtil.addAuthority(Constants.ROLE_SUB_USER);
                }
                /*SubUserHistory subUserHistory = new SubUserHistory();
                subUserHistory.setSubuserHistory(subUser);
                subUserHistoryRepository.save(subUserHistory);*/
                alerts.setSuccess("subuser.create.success");
                model.addAttribute("success", true);
            }
        } catch (Exception e) {
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("subuser", subUser);

        return "ajax/corporate/subuser/create";
    }


    @PreAuthorize(value = "hasRole('ROLE_ADMIN')")
    @ResponseBody
    @PostMapping(value = {"/subuser/status/{id}"})
    public AjaxResponse categoryStatusChange(@PathVariable("id") String id, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            SubUser subUser = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (subUser != null) {
                subUser.setStatus(!subUser.getStatus());
                subUserRepository.save(subUser);
                response.success("Status changed", Arrays.asList(subUser.getStatus()));
            }
        } catch (Exception e) {

            LOG.error("Error saving user", e);
            response.error("Error saving user");
        }
        return response;
    }


    @GetMapping(value = {"/paymentform"})
    public String paymentForm(@RequestParam("users") String users, @RequestParam("type") String type, ModelMap model) {
        try {
            Integer totalUsers = Integer.parseInt(users);

            Integer amountPerUser = (type.equalsIgnoreCase("y")) ? Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_YEARLY")) : Integer.parseInt(serviceUtil.getConfig("PER_USER_AMOUNT_MONTHLY"));
            Integer finalAmount = totalUsers * (amountPerUser) * 100;
            model.addAttribute("amount", finalAmount);
            model.addAttribute("currency", "USD");
            model.addAttribute("totalUsers", totalUsers);
            model.addAttribute("type", type);
        } catch (Exception e) {
            LOG.error("Error getting amount ", e);
        }
        return "ajax/corporate/payment";
    }

    @GetMapping(value = {"/subuser/history/{id}"})
    public String history(@PathVariable("id") String id, ModelMap model, RedirectAttributes redirectAttributes) {
        try {
            SubUser subUser = subUserRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            List<SubUserHistory> histories = subUserHistoryRepository.findAllBySubUser(subUser);
            model.addAttribute("transactions", histories);
        } catch (Exception e) {

        }
        return "ajax/corporate/subuser/history";
    }
}
