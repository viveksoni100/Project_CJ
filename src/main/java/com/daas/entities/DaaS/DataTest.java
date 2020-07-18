package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Table(name = "daas_data")
public class DataTest extends BaseEntity {

    private String name;

    private String description;

    private float price;

    @Column(name = "category_id")
    @HtmlValidateConstraint(whiteListType = "none")
    private int categoryId;

    @Column(name = "download_count")
    @HtmlValidateConstraint(whiteListType = "none")
    private int downloadCount;

    @Column(name = "publish_date")
    @HtmlValidateConstraint(whiteListType = "none")
    private LocalDateTime publishDate;

}
