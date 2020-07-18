package com.daas.entities.user;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Table(name = "ease_user_rights")
@Entity
@Getter
@Setter
public class UserRights extends BaseEntity {

    @JsonIgnore
    @ManyToMany(mappedBy = "userRights", fetch = FetchType.LAZY)
    private Set<User> users;

    private String groupName;

    private Boolean exportListVisitorSeeAnalytics;

    private Boolean createVisitor;

    private Boolean createVisitorOnBehalf;

    private Boolean changeStatusOfVisitor;

    private Boolean seeAllVisitorsOfDay;

    private Boolean deleteVisitors;


    private Boolean seeColleagues;

    private Boolean addVisitorToSharedAddressBook;


    private Boolean seeVisitorFromSharedAddressBook;

    private Boolean createUser;

    private Boolean inviteUserToDashboard;

    private Boolean editDeleteUser;

    private Boolean defineRightsOfGroup;

    private Boolean addUserToGroupOfRight;

    private Boolean VMSSEttings;



}
