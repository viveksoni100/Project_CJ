package com.daas.interceptors;


import com.daas.utilities.singleton.LocaleHelper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;


public class RequestInterceptor extends HandlerInterceptorAdapter {

    public final static Logger LOG = LogManager.getLogger(RequestInterceptor.class.getName());

    @Autowired
    LocaleHelper localeHelper;

    /**
     * This is not a good practice to use sysout. Always integrate any logger
     * with your application. We will discuss about integrating logger with
     * spring boot application in some later article
     */
    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response, Object handler) throws Exception {
        long startTime = System.currentTimeMillis();
        // log which url was called and time of called
        //LOG.info("Request URL::" + request.getRequestURL().toString() + ":: Start Time=" + System.currentTimeMillis());
        request.setAttribute("startTime", startTime);
        final Map<String, String> pathVariables = (Map<String, String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);

        //Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        //if returned false, we need to make sure 'response' is sent

        // Get current controller and method name here
        try {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            String controllerName = handlerMethod.getBeanType().getSimpleName().replace("Controller", "");
            //handlerMethod.getBean().getClass().getSimpleName().replace("Controller", "");
            String methodName = handlerMethod.getMethod().getName();
            localeHelper.setControllerName(controllerName);
            localeHelper.setMethodName(methodName);
            localeHelper.setServletPaht(request.getServletPath());
        } catch (Exception e) {
            // LOG.error("Error in RequestProcessingTimeInterceptor" ,e);
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response,
                           Object object, ModelAndView model)
            throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object object, Exception arg3)
            throws Exception {

    }
}