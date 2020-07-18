package com.daas.task;


import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.task.base.AbstractBaseTask;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class SubuserTask extends AbstractBaseTask {

    public final static Logger LOG = LogManager.getLogger(SubuserTask.class.getName());


    @Autowired
    private SubUserRepository subUserRepository;


    @Scheduled(fixedDelay = 86400000)
    public void changeSubUserStatus() {
        try {
            subUserRepository.changeStatus(false, LocalDate.now());
            LOG.info("Sub user status changed for the date " + LocalDateTime.now());
        } catch (Exception e) {
            LOG.error("Error in query setting sub user status to no show", e);
        }
    }
}
