package com.daas.entities.configurations;


import com.daas.entities.BaseEntity;
import com.daas.utilities.singleton.BeanUtil;
import com.daas.utilities.singleton.ServiceUtil;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;


@Getter
@Setter
@Table(name = "configurations")
@Entity
public class Configurations extends BaseEntity {

    @NotBlank
    @Column(name = "config_name", unique = true)
    private String configName;
    @NotBlank
    @Column(name = "config_value")
    private String configValue;

    @Transient
    @Autowired
    private ServiceUtil serviceUtil;



    @Override
    public void preUpdate() {
        super.preUpdate();
        if (this.serviceUtil == null )
            this.serviceUtil = BeanUtil.bean(ServiceUtil.class);
        if (this.serviceUtil != null)
            this.serviceUtil.configurationChanged = true;

    }
}
