package com.daas.utilities.base;


import com.daas.repositories.iface.user.VerificationRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;


public abstract class Util implements BaseUtil {
    public final static Logger LOG = LogManager.getLogger(Util.class.getName());


    @Autowired
    protected VerificationRepository verificationRepository;

    @Autowired
    protected Environment environment;




}


