/*
 * Copyright (c) 10/4/18 10:57 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.validator.iface.field;




import com.daas.validator.impl.field.ColorCodeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Constraint(validatedBy = ColorCodeValidator.class)
@Target({ TYPE, FIELD, ANNOTATION_TYPE })
@Retention(RUNTIME)
public @interface ColorCodeConstraint {
    String message() default "{color.code.invalid}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
