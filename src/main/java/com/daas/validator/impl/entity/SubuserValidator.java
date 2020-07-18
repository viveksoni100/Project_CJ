package com.daas.validator.impl.entity;


import com.daas.entities.user.SubUser;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.validator.Base.AbstractBaseValidator;
import com.daas.validator.iface.entity.SubuserConstraint;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

/**
 * Validator sor User model
 */
public class SubuserValidator extends AbstractBaseValidator implements ConstraintValidator<SubuserConstraint, SubUser> {

    @Autowired
    private SubUserRepository subUserRepository;


    public static final Logger logger = LogManager.getLogger(SubuserValidator.class.getName());

    @Override
    public void initialize(SubuserConstraint userName) {
    }

    /**
     * @param subUser
     * @param cxt
     * @return
     */
    @Override
    public boolean isValid(SubUser subUser, ConstraintValidatorContext cxt) {
        boolean ret = true;
        try {
            if (subUser.getId() != null && subUser.getId() > 0 && subUser.getEmail() != null) {
                SubUser subUserDb = subUserRepository.findFirstByEmailAndIdNot(subUser.getEmail(), subUser.getId());
                if (subUserDb != null) {
                    cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.email.username", null, "User with same email id exist. Please choose different email")).addPropertyNode("email").addConstraintViolation();
                    ret = false;
                }
            } else if (subUser.getId() == null || subUser.getId() <= 0) {
                SubUser subUserDb = subUserRepository.findFirstByEmail(subUser.getEmail());
                if (subUserDb != null) {
                    cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.email.username", null, "User with same email id exist. Please choose different email")).addPropertyNode("email").addConstraintViolation();
                    ret = false;
                }
            }
            if (!subUser.getPassword().equals(subUser.getConfirmPassword())) {
                cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Confirm.user.password.not.match", null, "Password and Confirm Password should match")).addPropertyNode("confirmPassword").addConstraintViolation();
                ret = false;
            }
        } catch (Exception e) {
            logger.error("Error checking username duplication.", e);
            ret = false;
        }
        return ret;
    }
}

