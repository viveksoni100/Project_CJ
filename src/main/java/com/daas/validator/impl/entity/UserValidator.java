package com.daas.validator.impl.entity;


import com.daas.entities.user.User;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.utilities.singleton.CommonUtil;
import com.daas.validator.Base.AbstractBaseValidator;
import com.daas.validator.iface.entity.UserConstraint;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.HashMap;
import java.util.Map;

/**
 * Validator sor User model
 */
public class UserValidator extends AbstractBaseValidator implements ConstraintValidator<UserConstraint, User> {

    @Autowired
    private UserRepository userRepository;






    public static final Logger logger = LogManager.getLogger(UserValidator.class.getName());

    @Override
    public void initialize(UserConstraint userName) {
    }

    /**
     * @param user : current user object
     * @param cxt  : Validation context
     * @return
     */
    @Override
    public boolean isValid(User user, ConstraintValidatorContext cxt) {
        String queryString = " from User where  email=:email";
//        Object[] params = new Object[2];
//        params[0] = user.getId();
//        params[1] = user.getUsername();
        Map<String, Object> params = new HashMap<>();

        params.put("email", user.getEmail());
        boolean ret = true;
        try {




            User userDbEmail = userRepository.findFirstByEmail(user.getEmail());

            // check if new user and password is empty
            if ((user.getId() == null) && (user.getPassword().equals(null) || user.getPassword().isEmpty())) {
                cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Password.user.required", null, "Password is required field")).addPropertyNode("password").addConstraintViolation();
                ret = false;
            }


            if (userDbEmail != null && !userDbEmail.getId().equals(user.getId())) {
                cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.email.username", null, "Username already exist")).addPropertyNode("email").addConstraintViolation();
                ret = false;
            }
            //check password and confirm password match
            if (!user.getPassword().equals(user.getConfirmPassword())) {
                cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Confirm.user.password.not.match", null, "Password and Confirm Password should match")).addPropertyNode("confirmPassword").addConstraintViolation();
                ret = false;
            }

            if (user.getPhone() != null && !user.getPhone().equals("")) {
                if (!CommonUtil.isDouble(user.getPhone())) {
                    cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("user.phone.invalid", null, "Please enter valid phone number")).addPropertyNode("phone").addConstraintViolation();
                    ret = false;
                }
            }


            /*params.put("email", user.getEmail());

            params.remove("username");
            queryString = " from User where id!=:id and email=:email";
            //params[1] = user.getEmail();
            userDb = userService.first(queryString, params);
            if (userDb != null) {
                cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.user.email", null, "Email id already exist")).addPropertyNode("email").addConstraintViolation();
                ret = false;
            }*/

            /*final ObjectMapper mapper = new ObjectMapper(); // jackson's objectmapper
            Object obj = restService.getJsonObject("https://www.validator.pizza/email/" + user.getEmail());
            final DesposableEmailValidatorForm disposable = mapper.convertValue(obj, DesposableEmailValidatorForm.class);*/


        } catch (Exception e) {
            logger.error(e.getMessage());
            ret = false;
        } finally {

        }
        return ret;
    }
}

