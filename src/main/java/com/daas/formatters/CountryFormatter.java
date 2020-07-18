/*
 * Copyright (c) 3/4/18 11:30 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.formatters;



import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.entities.common.Country;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;


/**
 * Formatter class (helps format whole class object to use in forms)
 */
public class CountryFormatter implements Formatter<Country> {

    private PathVariableEncrypt pathVariableEncrypt;

    public CountryFormatter(PathVariableEncrypt pathVariableEncrypt) {
        super();
        this.pathVariableEncrypt = pathVariableEncrypt;
    }

    @Override
    public String print(Country country, Locale locale) {

        return this.pathVariableEncrypt.encrypt(Long.toString(country.getId()));
    }

    @Override
    public Country parse(String id, Locale locale) throws ParseException {
        Country country = new Country();
        country.setId(Long.parseLong(this.pathVariableEncrypt.decrypt(id)));
        return country;
    }


}