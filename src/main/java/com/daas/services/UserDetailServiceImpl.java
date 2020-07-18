package com.daas.services;


import com.daas.constants.Constants;
import com.daas.entities.security.RequestUserDetails;
import com.daas.entities.user.*;
import com.daas.repositories.iface.user.RolePrivilegesRepository;
import com.daas.repositories.iface.user.RoleRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import com.daas.repositories.iface.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("userDetailServiceImpl")
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubUserRepository subUserRepository;

    private User user;

    private SubUser subUser;

    @Autowired
    private RolePrivilegesRepository rolePrivilegesRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Map<String, Object> params = new HashMap<>();
        params.put("email", username);

        User userDb = userRepository.findFirstByEmail(username);
        SubUser subUserDb = subUserRepository.findFirstByEmail(username);
        if (userDb != null)
            this.user = userDb;
        if (subUserDb != null)
            this.subUser = subUserDb;

        BaseUser user = (userDb != null) ? userDb : subUserDb;
        if (user == null) {
            return new RequestUserDetails(
                    " ", " ", true, true, true, true, null, 1, null);
        } else {

            return new RequestUserDetails(
                    user.getEmail(), user.getPassword(), user.getStatus(), true, true,
                    true, getAuthorities((userDb != null) ? userDb.getUserRoles() : subUserDb.getUserRoles(), user),
                    (user instanceof SubUser) ? 0 : 1, user.getEmail());
        }


    }

    private Collection<? extends GrantedAuthority> getAuthorities(
            Collection<UserRole> roles, BaseUser user) {
        return getGrantedAuthorities(getPrivileges(roles, user));
    }

    private List<String> getPrivileges(Collection<UserRole> roles, BaseUser user) {

        List<String> privileges = new ArrayList<>();
        List<RolePrivileges> collection = new ArrayList<>();
        for (UserRole role : roles) {
            privileges.add(role.getRole());
            //collection.addAll(rolePrivilegesRepository.findAllByRoleAndUser(role, user));
        }
        for (RolePrivileges item : collection) {
            privileges.add(item.getPrivilege().getName());
        }
        return privileges;
    }

    private List<GrantedAuthority> getGrantedAuthorities(List<String> privileges) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String privilege : privileges) {
            authorities.add(new SimpleGrantedAuthority(privilege));
        }
        if (this.subUser != null && this.subUser.getStatus()) {
            authorities.add(new SimpleGrantedAuthority(Constants.ROLE_SUB_USER));
        }
        return authorities;
    }

}