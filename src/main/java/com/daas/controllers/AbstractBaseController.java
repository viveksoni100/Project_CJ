package com.daas.controllers;


import com.daas.alerts.Alerts;
import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.controllers.iface.BaseControllerIface;
import com.daas.repositories.iface.pdf.PdfMarkRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.publications.PublicationsNoteRepository;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.repositories.iface.user.RoleRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.services.file.FileStorageService;
import com.daas.services.file.ImageEditService;
import com.daas.utilities.session.UserUtil;
import com.daas.utilities.singleton.LocaleHelper;
import com.daas.utilities.singleton.ServiceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.Validator;

public class AbstractBaseController implements BaseControllerIface {

    public static final String redirect = "redirect:/";


    @Autowired
    protected Environment environment;

    @Autowired
    protected PasswordEncoder passwordEncoder;

    @Autowired
    protected Alerts alerts;

    @Autowired
    protected RoleRepository roleRepository;

    @Autowired
    protected UserRepository userRepository;

    @Autowired
    protected ServiceUtil serviceUtil;


    @Autowired
    protected ApplicationEventPublisher eventPublisher;

    @Autowired
    protected Validator validator;

    @Autowired
    protected LocaleHelper localeHelper;

    @Autowired
    protected PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    protected FileStorageService fileStorageService;

    @Autowired
    protected UserUtil userUtil;

    @Autowired
    protected SubUserRepository subUserRepository;

    @Autowired
    protected PublicationsRepository publicationsRepository;

    @Autowired
    protected PublicationsCategoryRepository publicationsCategoryRepository;

    @Autowired
    protected PdfMarkRepository pdfMarkRepository;

    @Autowired
    protected PublicationsNoteRepository publicationsNoteRepository;


    @Autowired
    protected ImageEditService imageEditService;

}
