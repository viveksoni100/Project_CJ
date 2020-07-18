package com.daas.entities.DaaS;


import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "daas_data_content_type_allowed")
public class DataContentType extends BaseEntity {

    @Column(name = "content_type_name")
    private String name;    //Content Type name will be here. e.g. pdf, xls, json

    @Column(name = "content_type_value")
    private String contentTypeValue;  //mimetype values will be here e.g. application/json , application/pdf
}
