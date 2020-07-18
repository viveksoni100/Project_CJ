/*
 * Copyright (c) 3/4/18 11:30 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.formatters;


import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.entities.publications.PublicationsCategory;
import org.springframework.format.Formatter;

import java.text.ParseException;
import java.util.Locale;


/**
 * Formatter class (helps format whole class object to use in forms)
 */
public class PublicationCategoryFormatter implements Formatter<PublicationsCategory> {

    private PathVariableEncrypt pathVariableEncrypt;

    public PublicationCategoryFormatter(PathVariableEncrypt pathVariableEncrypt) {
        super();
        this.pathVariableEncrypt = pathVariableEncrypt;
    }

    @Override
    public String print(PublicationsCategory publicationsCategory, Locale locale) {

        return this.pathVariableEncrypt.encrypt(Long.toString(publicationsCategory.getId()));
    }

    @Override
    public PublicationsCategory parse(String id, Locale locale) throws ParseException {
        PublicationsCategory publicationsCategory = new PublicationsCategory();
        publicationsCategory.setId(Long.parseLong(this.pathVariableEncrypt.decrypt(id)));
        return publicationsCategory;
    }


}