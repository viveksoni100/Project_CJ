/*
 * Copyright (c) 5/3/18 11:15 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.services;

import javax.servlet.http.HttpServletRequest;


public interface ICaptchaService {
    boolean processResponse(final String response, HttpServletRequest request) throws Exception;

    String getReCaptchaSite();

    String getReCaptchaSecret();
}
