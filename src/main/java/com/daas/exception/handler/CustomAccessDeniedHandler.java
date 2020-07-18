package com.daas.exception.handler;


import com.daas.repositories.iface.user.UserRepository;
import com.daas.utilities.session.UserUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.access.AccessDeniedHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;

public class CustomAccessDeniedHandler implements AccessDeniedHandler {



    @Autowired
    UserRepository userRepository;

    @Autowired
    private UserUtil userUtil;


    public static final Logger logger = LogManager.getLogger(CustomAccessDeniedHandler.class.getName());

    /**
     * In case of unauthorized access from user this handler will be called and will redirect user on access denied page
     *
     * @param request
     * @param response
     * @param exc
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            AccessDeniedException exc) throws IOException, ServletException {

        String redirectPath = "/aerror";
        Authentication auth = userUtil.getAuthentication();
        Boolean isUserRole = false;
        Boolean isGuestRole = false;
        Boolean isAdmin = false;
        Boolean isChild = false;
        Boolean isExpired = false;
        // User user = (User)auth.getPrincipal();
        if (auth != null) {
            // Log user name who tried to access protected content
            logger.error("User: " + auth.getName() + " attempted to access the protected URL: " + request.getRequestURI());
            if (auth.getName() != null) {
                Collection<SimpleGrantedAuthority> oldAuthorities = (Collection<SimpleGrantedAuthority>) userUtil.getAuthentication();
                for (SimpleGrantedAuthority authority : oldAuthorities) {
                    if (authority.getAuthority().equalsIgnoreCase("ROLE_GUEST")) {
                        isGuestRole = true;
                    }
                    if (authority.getAuthority().equalsIgnoreCase("ROLE_USER")) {
                        isUserRole = true;
                    }
                    if (authority.getAuthority().equalsIgnoreCase("ROLE_ADMIN")) {
                        isAdmin = true;
                    }
                    if (authority.getAuthority().equalsIgnoreCase("ROLE_SUB_USER")) {
                        isChild = true;
                    }

                    if (authority.getAuthority().equalsIgnoreCase("ROLE_EXPIRED")) {
                        isExpired = true;
                    }

                }
            }
        } else {
            redirectPath = "/login";
        }
        if (!isAdmin && !isUserRole && !isChild && !isExpired) {
            redirectPath = "/home";
        }
        if (isExpired) {
            //User user  = auth.

            redirectPath = "/checkout/payment";

        }
        if (isAjaxRequest(request)) {
            response.sendError(HttpServletResponse.SC_FORBIDDEN, "SESSION_TIMED_OUT");
        } else {
            response.sendRedirect(request.getContextPath() + redirectPath);
        }
    }

    protected boolean isAjaxRequest(HttpServletRequest request) {
        return "XMLHttpRequest".equals(request.getHeader("X-Requested-With"));
    }
}

