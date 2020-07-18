package com.daas.entities.DaaS;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import com.daas.entities.publications.Publications;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Set;


//Needs to be replaced with Productcategory and ProductCategoryDetail classes

@Table(name = "pub_category_master")
@Entity
@Getter
@Setter
public class Category extends BaseEntity {

    @NotEmpty
    @NotNull
    @Column(name = "category_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String categoryName;

    @Column(name = "category_description")
    @HtmlValidateConstraint(whiteListType = "none")
    private String categoryDescription;

    @Column(name = "category_type")
    @HtmlValidateConstraint(whiteListType = "none")
    private String categoryType;


    @JsonIgnore
    @ManyToMany(mappedBy = "categories", fetch = FetchType.LAZY)
    private Set<Publications> publications;
}
