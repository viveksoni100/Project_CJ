package com.daas.validator.iface.field;



import com.daas.validator.impl.field.PasswordValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = PasswordValidator.class)
@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)

public @interface PasswordConstraint {
    String message() default "{General.error.msg}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};


    int capital() default 1;

    int digits() default 1;

    int special() default 1;

    int max() default 10;

    int min() default 8;

    String[] addAttributes() default "";
}

