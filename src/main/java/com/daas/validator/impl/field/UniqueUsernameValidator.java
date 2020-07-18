package com.daas.validator.impl.field;


import com.daas.entities.user.BaseUser;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.User;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.validator.Base.AbstractBaseValidator;
import com.daas.validator.iface.field.UniqueUsername;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator extends AbstractBaseValidator implements ConstraintValidator<UniqueUsername, Object> {


    @Autowired
    private UserRepository userRepository;


    @Autowired
    private SubUserRepository subUserRepository;

    private String classType;

    @Override
    public void initialize(UniqueUsername constraintAnnotation) {
        this.classType = constraintAnnotation.classType();

    }

    /**
     * @param obj
     * @param cxt
     * @return
     */
    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext cxt) {

        boolean ret = true;
        User userDb = null;
        SubUser subUserDb = null;
        String username = null;
        try {
            if (obj != null) {

                BaseUser baseUser = (BaseUser) obj;
                if (baseUser.getId() != null && baseUser.getId() > 0) {
                    userDb = userRepository.findFirstByEmailAndIdNot(baseUser.getUsername(), baseUser.getId());
                    subUserDb = subUserRepository.findFirstByEmailAndIdNot(baseUser.getUsername(), baseUser.getId());
                } else {
                    userDb = userRepository.findFirstByEmail(baseUser.getUsername());
                    subUserDb = subUserRepository.findFirstByEmail(baseUser.getUsername());
                }


                if (userDb != null || subUserDb != null) {
                    ret = false;
                    cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.user.username", null, "Username already exists!")).addPropertyNode("username").addConstraintViolation();
                }

            } else {
                ret = false;
                //cxt.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("Duplicate.email.username", null, "Username already exists!")).addPropertyNode("username").addConstraintViolation();
            }
        } catch (Exception e) {
            ret = false;
        }
        return ret;
    }
}
