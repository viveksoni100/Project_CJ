package com.daas.validator.iface.field;


import com.daas.validator.impl.field.BigDecimalRangeValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({METHOD, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = BigDecimalRangeValidator.class)
@Documented
public @interface BigDecimalRange {
    public String message() default "{java.math.BigDecimal.range.error}";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};

    long minPrecision() default Long.MIN_VALUE;

    long maxPrecision() default Long.MAX_VALUE;

    int scale() default 0;
}
