package com.daas.entities.DaaS;

import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;


@Entity
@Table(name = "Daas_User_Role")
@Getter
@Setter
public class DaasUserRoles extends BaseEntity {

    @Column(name = "name")
    private String roleName;

    @Column(name = "description")
    private String roleDescription;

    @ManyToMany(mappedBy = "daasUserRoles")
    private Set<DaasUser> daasUserSet;


}
