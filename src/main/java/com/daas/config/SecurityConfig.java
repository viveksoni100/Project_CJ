package com.daas.config;


import com.daas.config.filters.permission.CustomPermissionEvaluator;
import com.daas.config.session.CustomSessionRegistryImpl;
import com.daas.config.session.CustomSuccessHandler;
import com.daas.exception.handler.CustomAccessDeniedHandler;
import com.daas.interceptors.AuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.expression.DefaultWebSecurityExpressionHandler;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.annotation.Resource;
import javax.sql.DataSource;


@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {




    @Resource
    UserDetailsService userDetailsService;



    @Autowired
    private DataSource dataSource;

    @Autowired
    CustomSuccessHandler customSuccessHandler;

    private SessionRegistry sessionRegistry;



    @Override
    protected void configure(HttpSecurity http) throws Exception {


        //session expired bug solving :QA
        /*http.sessionManagement().invalidSessionUrl("/login").sessionAuthenticationErrorUrl("/login")
                .sessionFixation().newSession()
                .maximumSessions(30).expiredUrl("/login")*/

        /*http.sessionManagement().invalidSessionUrl("/login").sessionAuthenticationErrorUrl("/login")
                .sessionFixation().newSession()
                .maximumSessions(3).expiredUrl("/login")
                .maxSessionsPreventsLogin(true).and()
                .sessionFixation().newSession().and().logout().logoutUrl("/logout")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))

                //.logoutSuccessHandler(logoutSuccessHandler())
                .logoutSuccessUrl("/home")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");*/
        //.and().rememberMe().rememberMeParameter("remember-me").rememberMeCookieName("remember").tokenRepository(persistentTokenRepository()).tokenValiditySeconds(1 * 24 * 60 * 60);
        http.sessionManagement().invalidSessionUrl("/login").sessionAuthenticationErrorUrl("/login")
                .sessionFixation().newSession()
                .maximumSessions(30).expiredUrl("/login")
                .maxSessionsPreventsLogin(true)
                .sessionRegistry(sessionRegistry()).and()
                .sessionFixation().newSession().and().logout().logoutUrl("/logout")
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                //.logoutSuccessHandler(logoutSuccessHandler())
                .logoutSuccessUrl("/home")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID");

        http
                .csrf()
                    .ignoringAntMatchers("/api/**")
                    .ignoringAntMatchers("/checkout/**")
                    .ignoringAntMatchers("/eventbrite-webhook")
                .and()
                    .authorizeRequests()
                        .antMatchers(HttpMethod.OPTIONS, "/**").denyAll()
                        //.antMatchers("/checkout/**").permitAll()
                        .antMatchers("/home").permitAll()
                        .antMatchers("/register/**").permitAll()
                        .antMatchers("/sms/**").permitAll()
                        .antMatchers("/invitation/form/**").permitAll()
                        .antMatchers("/login/**").permitAll()
                        .antMatchers("/registration/email/**").permitAll()
                        .antMatchers("/ajax/suser/**").access("hasRole('ROLE_SUBUSER')")
                        .antMatchers("/ajax/**").access("hasAnyRole('ROLE_ADMIN', 'ROLE_USER', 'ROLE_CORPORATE')")
                        .antMatchers("/admin/**").access("hasAnyRole('ROLE_ADMIN', 'ROLE_SUPERADMIN')")
                        .antMatchers("/superadmin/**").access("hasRole('ROLE_SUPERADMIN')")
                        //.antMatchers("/**").access("hasRole('ROLE_SUPERADMIN')")
                .and()
                // some more method calls
                    .formLogin()
                        .loginPage("/login")
                        .defaultSuccessUrl("/homeNew")
                        .successHandler(customSuccessHandler)
                        .and()
                                .addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                                .exceptionHandling()
                .and()
                    .sessionManagement()
                        .invalidSessionUrl("/homeNew")
                        .sessionAuthenticationErrorUrl("/login")
                        .sessionFixation().newSession()
                        .maximumSessions(30).expiredUrl("/sessionExpired")
                        .maxSessionsPreventsLogin(true).and()
                        .sessionFixation().newSession()
                .and()
                    .logout()
                        .logoutUrl("/logout")
                        .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                        //.logoutSuccessHandler(logoutSuccessHandler())
                        .logoutSuccessUrl("/home")
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                .and()
                    .rememberMe()
                        .tokenRepository(persistentTokenRepository())
                        //.key("AppKey")
                        .alwaysRemember(true)
                        .rememberMeParameter("rememberMe")
                        .rememberMeCookieName("JRMR")
                        .tokenValiditySeconds(24 * 60 * 60);


        http.exceptionHandling().accessDeniedHandler(accessDeniedHandler());

        //  .and().addFilterBefore(authenticationFilter(), UsernamePasswordAuthenticationFilter.class).exceptionHandling();


        /*http.authorizeRequests()
                .and().rememberMe().tokenRepository(this.persistentTokenRepository()).tokenValiditySeconds(1 * 24 * 60 * 60);*/
    }




    /**
     * @return Authentication provider
     * with Userdetail service which will be used to fetch user details
     * with password encrypter class
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(bCryptPasswordEncoder());


        return auth;
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
        auth.authenticationProvider(authenticationProvider());
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/*.css");
        web.ignoring().antMatchers("/*.js");
        DefaultWebSecurityExpressionHandler handler = new DefaultWebSecurityExpressionHandler();
        handler.setPermissionEvaluator(new CustomPermissionEvaluator());
        web.expressionHandler(handler);

    }

    /**
     * @return Password encrypter class
     */
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // Token stored in Table (Persistent_Logins)
    @Bean
    public PersistentTokenRepository persistentTokenRepository() {
        JdbcTokenRepositoryImpl db = new JdbcTokenRepositoryImpl();
        db.setDataSource(dataSource);
        return db;
    }


    /**
     * @return Authentication filter used by Spring Security
     * @throws Exception
     */
    @Bean
    public AuthenticationFilter authenticationFilter() throws Exception {
        AuthenticationFilter authenticationFilter = new AuthenticationFilter();
        /*authenticationFilter.setAuthenticationSuccessHandler(this::loginSuccessHandler);
        authenticationFilter.setAuthenticationFailureHandler(this::loginFailureHandler);*/
        //authenticationFilter.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login", "POST"));

        authenticationFilter.setAuthenticationManager(authenticationManagerBean());
        return authenticationFilter;
    }

    @Bean
    public SavedRequestAwareAuthenticationSuccessHandler
    savedRequestAwareAuthenticationSuccessHandler() {

        SavedRequestAwareAuthenticationSuccessHandler auth
                = new SavedRequestAwareAuthenticationSuccessHandler();
        auth.setTargetUrlParameter("targetUrl");
        return auth;
    }

    /**
     * @return Custom Access Denied handler to manage access denied actions
     */
    @Bean
    public AccessDeniedHandler accessDeniedHandler() {
        return new CustomAccessDeniedHandler();
    }


    @Bean
    public AuthenticationManager customAuthenticationManager() throws Exception {
        return super.authenticationManagerBean();
        //return authenticationManager();
    }



    @Bean
    public SessionRegistry sessionRegistry() {
        if (sessionRegistry == null) {
            sessionRegistry = new CustomSessionRegistryImpl();
        }
        return sessionRegistry;
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }



}
