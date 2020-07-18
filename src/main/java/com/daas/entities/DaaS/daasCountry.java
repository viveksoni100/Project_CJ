package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name="daas_country")
public class daasCountry extends BaseEntity {

    @Column(name="country_name")
    @HtmlValidateConstraint(whiteListType="none")
    private String countryName;

    @Column(name="country_code")
    @HtmlValidateConstraint(whiteListType="none")
    private int countryCode;
}
