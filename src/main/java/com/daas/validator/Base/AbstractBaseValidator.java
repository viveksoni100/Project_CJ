package com.daas.validator.Base;

import com.daas.utilities.singleton.LocaleHelper;
import org.springframework.beans.factory.annotation.Autowired;

public abstract  class AbstractBaseValidator implements BaseConstraint{

    @Autowired
    protected LocaleHelper localeHelper;


}
