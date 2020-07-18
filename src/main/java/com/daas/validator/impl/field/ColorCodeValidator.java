package com.daas.validator.impl.field;


import com.daas.validator.iface.field.ColorCodeConstraint;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ColorCodeValidator implements ConstraintValidator<ColorCodeConstraint, String> {

    @Override
    public void initialize(ColorCodeConstraint constraintAnnotation) {

    }

    /**
     *
     * @param s1
     * @param context
     * @return
     */
    @Override
    public boolean isValid(String s1, ConstraintValidatorContext context) {
        try {
            Pattern colorPattern = Pattern.compile("#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})");
            Matcher m = colorPattern.matcher(s1);
            return m.matches();
        } catch (IllegalArgumentException iae) {

        }
        return false;
    }
}

