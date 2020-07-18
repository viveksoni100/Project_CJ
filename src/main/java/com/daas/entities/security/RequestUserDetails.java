package com.daas.entities.security;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class RequestUserDetails  extends org.springframework.security.core.userdetails.User {
    private static final long serialVersionUID = -6411988532329234916L;
    //1 = user, 2 = colleague
    private Integer personId;

    private String username;

    public RequestUserDetails(String username, String password, Integer personId,
                              Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
        this.personId = personId;
    }

    public RequestUserDetails(String email, String password, boolean enabled,
                              boolean accountNonExpired, boolean credentialsNonExpired,
                              boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, Integer personId, String username) {
        super(email, password, enabled, true, true, true, authorities);
        this.personId = personId;
        this.username = username;
    }

    public Integer getPersonId() {
        return personId;
    }
    public String getUsername(){return username;}
}