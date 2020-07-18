package com.daas.entities.publications;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import com.daas.entities.user.SubUser;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

@Entity
@Getter
@Setter
@Table(name = "publications_note")
public class PublicationsNote extends BaseEntity {
    @JsonIgnore
    @ManyToOne(targetEntity = Publications.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "publication_id")
    private Publications publications;


    @JsonIgnore
    @ManyToOne(targetEntity = SubUser.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "subuser_id")
    private SubUser subUser;


    @Column(name = "note")
    @NotEmpty
    @Lob
    @HtmlValidateConstraint(whiteListType = "none")
    private String note;
}
