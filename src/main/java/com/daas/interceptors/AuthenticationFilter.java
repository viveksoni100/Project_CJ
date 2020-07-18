package com.daas.interceptors;


import com.daas.constants.Constants;
import com.daas.entities.user.*;
import com.daas.repositories.iface.user.RolePrivilegesRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.services.CaptchaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

/**
 * This is Authentication filter class
 * Before Spring Security calls Authentication method our custom method will be called
 * Here we can have extra verifications like Captcha verification (We are doing it here :) )
 */
@PropertySource(value = {"classpath:application-${spring.profiles.active}.properties"})
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubUserRepository subUserRepository;


    @Autowired
    private RolePrivilegesRepository rolePrivilegesRepository;

    @Autowired
    private CaptchaService captchaService;

    @Autowired
    private Environment environment;

    @Autowired
    private DaoAuthenticationProvider manager;


    private User user;


    private SubUser subUser;


    private RememberMeServices rememberMeServices = new NullRememberMeServices();
    private AuthenticationSuccessHandler successHandler = new SavedRequestAwareAuthenticationSuccessHandler();
    private boolean continueChainBeforeSuccessfulAuthentication = false;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        String googleCaptcha = request.getParameter("g-recaptcha-response");
        Set<GrantedAuthority> grantedAuthorities = null;
        String username = "";
        String password = "";
        boolean userFound = false;
        String captchaEnabled = environment.getProperty("captcha.enabled");
        int ret = 0;


        boolean captchaResponse = (captchaEnabled.equalsIgnoreCase("false")) ? true : captchaService.processResponse(googleCaptcha, request);
        if (captchaResponse) { // Check if captcha verification was success
            Map<String, Object> params = new HashMap<>();
            params.put("email", obtainUsername(request));
            User userDb = userRepository.findFirstByEmail(obtainUsername(request));
            SubUser subUserDb = subUserRepository.findFirstByEmail(obtainUsername(request));
            if (userDb != null)
                this.user = userDb;
            if (subUserDb != null)
                this.subUser = subUserDb;

            if (userDb != null || subUserDb != null) {

                BaseUser user = (userDb != null) ? userDb : subUserDb;

                userFound = true;
                username = user.getEmail();
                password = obtainPassword(request);
                if (!user.getStatus()) {
                    SecurityContextHolder.getContext().setAuthentication(null);
                    request.getSession().setAttribute("SPRING_SECURITY_CONTEXT", null);
                    request.getSession().setAttribute("type", "status");
                    request.getSession().setAttribute("error", "yes");
                    throw new UsernameNotFoundException("Please input correct credentials");
                }

                Collection<UserRole> roles = (userDb != null) ? userDb.getUserRoles() : subUserDb.getUserRoles();
                grantedAuthorities = new HashSet<>(getAuthorities(roles, user));

                ret = 1;
            }
        } else {
            SecurityContextHolder.getContext().setAuthentication(null);
            request.getSession().setAttribute("SPRING_SECURITY_CONTEXT", null);
            request.getSession().setAttribute("type", "captcha");
            request.getSession().setAttribute("error", "yes");
            throw new UsernameNotFoundException("Captcha verification failed");
        }


        if (username == null) {
            username = "";
        }
        if (password == null) {
            password = "";
        }
        username = username.trim();

        UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(
                username, password, grantedAuthorities);

        // Allow subclasses to set the "details" property
        Authentication authentication = null;
        Authentication authenticationResult = null;
        try {
            authentication = new UsernamePasswordAuthenticationToken(username, password, grantedAuthorities);
            authenticationResult = manager.authenticate(authentication);

            SecurityContextHolder.getContext().setAuthentication(authenticationResult);
        } catch (AuthenticationException e) {
            request.getSession().setAttribute("error", "yes");
            request.getSession().setAttribute("type", "yes");

            authenticationResult = manager.authenticate(authentication);

        }
        setDetails(request, authRequest);
        return manager.authenticate(authentication);
    }


    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<UserRole> roles, BaseUser user) {

        return getGrantedAuthorities(getPrivileges(roles, user));
    }

    private List<String> getPrivileges(Collection<UserRole> roles, BaseUser user) {

        List<String> privileges = new ArrayList<>();
        List<RolePrivileges> collection = new ArrayList<>();
        for (UserRole role : roles) {
            privileges.add(role.getRole());
            //collection.addAll(rolePrivilegesRepository.findAllByRoleAndUser(role, user));
        }
        for (RolePrivileges item : collection) {
            privileges.add(item.getPrivilege().getName());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        if (this.subUser != null && this.subUser.getStatus()) {
            authorities.add(new SimpleGrantedAuthority(Constants.ROLE_SUB_USER));
        }
        return authorities;
    }


    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
        redirectStrategy.sendRedirect(request, response, "/login?error=" + request.getSession().getAttribute("error") + "&type=" + request.getSession().getAttribute("type"));
    }
}