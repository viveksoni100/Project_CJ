package com.daas.validator.iface.entity;





import com.daas.validator.impl.entity.UserValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UserValidator.class)
@Target( { ElementType.METHOD, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface UserConstraint {
    String message() default "{Duplicate.user.username}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

