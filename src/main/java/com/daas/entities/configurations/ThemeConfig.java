package com.daas.entities.configurations;


import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;


@Getter
@Setter
@Table(name = "theme_configuration")
@Entity
public class ThemeConfig extends BaseEntity {

    @NotBlank
    @Column(name = "config_name", unique = true)
    private String configName;

    @NotBlank
    @Column(name = "config_value")
    private String configValue;


    @NotBlank
    @Column(name = "class_name")
    private String className;

    @NotBlank
    @Column(name = "property_name")
    private String propertyName;
}
