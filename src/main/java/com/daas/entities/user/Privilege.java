package com.daas.entities.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Collection;
import java.util.HashSet;

@Getter
@Setter
@Entity
@Table(name = "user_role_privileges")
public class Privilege extends BaseEntity {

    private String name;

    /*@ManyToMany(mappedBy = "privileges")
    private Collection<UserRole> roles;*/



    private String label;



    @JsonIgnore
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Collection<RolePrivileges> rolePrivileges = new HashSet<>();
}
