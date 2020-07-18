package com.daas.config;


import com.daas.alerts.Alerts;
import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.formatters.CountryFormatter;
import com.daas.formatters.PublicationCategoryFormatter;
import com.daas.interceptors.RequestInterceptor;
import com.daas.services.file.ImageEditService;
import com.daas.task.NotificationTask;
import com.daas.task.SubuserTask;
import com.daas.utilities.singleton.CommonUtil;
import com.daas.utilities.singleton.LocaleHelper;
import com.daas.utilities.singleton.ServiceUtil;
import com.daas.utilities.session.UserUtil;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.*;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.core.env.Environment;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.CacheControl;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.CookieLocaleResolver;

import java.util.Locale;
import java.util.concurrent.TimeUnit;

@Configuration
@EnableWebMvc
@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableScheduling
public class WebConfig implements ApplicationContextAware, WebMvcConfigurer {


    @Autowired
    Environment environment;

    @Autowired
    RequestInterceptor requestInterceptor;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        if (environment.getProperty("template.cache").equalsIgnoreCase("true")) {
            registry.addResourceHandler("/**").addResourceLocations("classpath:/static/front", "classpath:/static/admin").setCacheControl(CacheControl.maxAge(365, TimeUnit.DAYS));

        } else {
            registry.addResourceHandler("/**").addResourceLocations("classpath:/static/front", "classpath:/static/admin");
        }
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");

        //super.addResourceHandlers(registry);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {

    }


    /**
     * @return Alerts class used for flash messages
     */
    @Bean
    @Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
    public Alerts getAlerts() {
        return new Alerts();
    }

    /**
     * @return LocalHelper (see LocaleHelper class for reference)
     */
    @Bean(name = "localeHelper")
    public LocaleHelper getLocaleHelper() {
        return new LocaleHelper();
    }

    @Bean
    public ImageEditService imageEditService() {
        return new ImageEditService();
    }


    /*@Bean
    public LocalValidatorFactoryBean getValidator() {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(messageSource());
        return bean;
    }*/

    /**
     * @return Template message source ( from template.properties files)
     */
    @Bean(name = "templateMessageSource")
    public MessageSource templateMessageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        //ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames(
                "messages/messages",
                "messages/template/template",
                "messages/email/email",
                "classpath:messages/messages",
                "classpath:messages/template/template",
                "classpath:messages/email/email"
        );

        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }


    /**
     * @return Locale resolver (see LocalHelper class for reference)
     */
    @Bean
    public LocaleResolver localeResolver() {
        CookieLocaleResolver localeResolver = new CookieLocaleResolver();
        localeResolver.setDefaultLocale(Locale.ENGLISH);
        localeResolver.setCookieHttpOnly(true);
        localeResolver.setCookieName("myLocaleCookie");
        localeResolver.setCookieSecure(true);
        localeResolver.setCookieMaxAge(4800);
        return localeResolver;
    }


    /**
     * @return
     */
    @Bean
    public RestTemplate getRestTemplate() {
        return new RestTemplate();
    }


    /**
     * @param formatterRegistry Formatter registry
     *                          adding formatters for different object
     *                          can add more if needed
     */
    @Override
    public void addFormatters(FormatterRegistry formatterRegistry) {
        formatterRegistry.addFormatter(new CountryFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new PublicationCategoryFormatter(getPathVariableEncrypt()));
        /*formatterRegistry.addFormatter(new UserFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new CountryFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new VisitorFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new ColleagueFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new LocationFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new UserRoleFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new KioskLanguageFormatter(getPathVariableEncrypt()));
        formatterRegistry.addFormatter(new TimeZoneFormatter(getPathVariableEncrypt()));*/

    }


    /**
     * @return Path variable class (for enc/decrypt path variables)
     */
    @Bean(name = "pathVariableEnc")
    public PathVariableEncrypt getPathVariableEncrypt() {
        return new PathVariableEncrypt();
    }


   /* @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        setDateFormat(objectMapper);

        return objectMapper;
    }

    private static void setDateFormat(ObjectMapper mapper) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        df.setLenient(false); // not necessary but I would recommend
        mapper.setDateFormat(df);
    }*/

    /*@Override
    public Validator getValidator() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.setValidationMessageSource(messageSource());

        return validator;
    }*/

    @Bean(name = "validator")
    public LocalValidatorFactoryBean getValidator() {
        LocalValidatorFactoryBean bean = new LocalValidatorFactoryBean();
        bean.setValidationMessageSource(templateMessageSource());
        return bean;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getRequestInterceptor());
    }


    @Bean
    public RequestInterceptor getRequestInterceptor() {
        return new RequestInterceptor();
    }

    @Bean(name = "commonUtil")
    public CommonUtil commonUtil() {
        return new CommonUtil();
    }

    @Bean(name = "serviceUtil")
    public ServiceUtil serviceUtil() {
        return new ServiceUtil();
    }

    @Bean(name = "userUtil")
    @Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
    public UserUtil userUtil() {
        return new UserUtil();
    }


    @Bean
    public SubuserTask getSubuserTask() {
        return new SubuserTask();
    }

    @Bean
    public NotificationTask getReminderTask() {
        return new NotificationTask();
    }
}
