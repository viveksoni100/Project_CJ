package com.daas.repositories.iface.user;


import com.daas.entities.user.RolePrivileges;
import com.daas.entities.user.User;
import com.daas.entities.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RolePrivilegesRepository extends JpaRepository<RolePrivileges, Long> {
    List<RolePrivileges> findAllByRoleAndUser(UserRole role, User user);

    @Transactional
    void deleteAllByUserAndRole(User user, UserRole role);
}
