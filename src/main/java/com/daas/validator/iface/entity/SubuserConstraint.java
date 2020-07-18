package com.daas.validator.iface.entity;


import com.daas.validator.impl.entity.SubuserValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = SubuserValidator.class)
@Target( { ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface SubuserConstraint {
    String message() default "{Duplicate.user.username}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

