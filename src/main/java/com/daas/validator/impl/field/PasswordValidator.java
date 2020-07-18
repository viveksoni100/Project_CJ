package com.daas.validator.impl.field;


import com.google.common.base.Joiner;
import com.daas.validator.iface.field.PasswordConstraint;
import org.passay.*;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;

public class PasswordValidator implements ConstraintValidator<PasswordConstraint, String> {

    private int min;

    private int max;

    private int special;

    private int capital;

    private int digit;

    @Override
    public void initialize(PasswordConstraint constraintAnnotation) {
        this.capital = constraintAnnotation.capital();
        this.digit = constraintAnnotation.digits();
        this.special = constraintAnnotation.special();
        if (constraintAnnotation.max() > constraintAnnotation.min() && constraintAnnotation.min() >= 0) {
            this.max = constraintAnnotation.max();
            this.min = constraintAnnotation.min();
        }

    }

    /**
     * @param value
     * @param context
     * @return
     */
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {

        List<Rule> rules = new ArrayList<>();
        rules.add(new LengthRule(this.min, this.max));
        rules.add(new WhitespaceRule());
        if (this.special > 0) {
            rules.add(new CharacterRule(EnglishCharacterData.Special, this.special));
        }
        if (this.digit > 0) {
            rules.add(new CharacterRule(EnglishCharacterData.Digit, this.digit));
        }
        if (this.capital > 0) {
            rules.add(new CharacterRule(EnglishCharacterData.UpperCase, this.capital));
        }
        org.passay.PasswordValidator validator = new org.passay.PasswordValidator(rules);

        RuleResult result = validator.validate(new PasswordData(value));
        if (result.isValid()) {
            return true;
        }
        /*"\n"*/
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(
                Joiner.on("\n").join(validator.getMessages(result)))
                .addConstraintViolation();
        return false;
    }
}
