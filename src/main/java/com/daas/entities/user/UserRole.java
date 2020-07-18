/*
 * Copyright (c) 5/3/18 11:15 AM Bitwise Ventures
 * Author : Anand Panchal
 * Author Email : anand4686@gmail.com
 */

package com.daas.entities.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * UserRole Entity
 * For more details check (userRoles table in database)
 */

@Getter
@Setter
@Table(name = "ease_roles")
@Entity
public class UserRole extends BaseEntity {

   /* @Id @GeneratedValue(generator="system-uuid")
    @GenericGenerator(name="system-uuid", strategy = "uuid")
    private String id;*/


   private String label;

    @Column(name = "role_name")
    @HtmlValidateConstraint(whiteListType = "none")
    private String role;

    @JsonIgnore
    @ManyToMany(mappedBy = "userRoles", fetch = FetchType.LAZY)
    private Set<User> users;



    /*@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_privileges",
            joinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "privilege_id", referencedColumnName = "id"))
    private Collection<Privilege> privileges;*/

    @JsonIgnore
    @OneToMany(mappedBy = "privilege", cascade = CascadeType.ALL)
    private Collection<RolePrivileges> privileges = new HashSet<>();



}
