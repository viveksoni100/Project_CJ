package com.daas.entities.common;


import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@Table(name = "country")
@Entity
public class Country extends BaseEntity {

    /*@Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    private String id;*/


    @Column(name = "code_2")
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String code2;

    @Column(name = "code_3")
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String code3;


    @Column(name = "time_zone", nullable = false)
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String time_zone;

    @Column(name = "country_name", nullable = false)
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String name;


    @Column(name = "calling_code", nullable = false)
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String calling_code;


    @Column(name = "dst", nullable = false)
    @NotNull
    @NotEmpty
    @HtmlValidateConstraint(whiteListType = "simpleText")
    private String dst;

}
