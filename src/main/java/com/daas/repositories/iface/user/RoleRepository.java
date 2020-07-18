package com.daas.repositories.iface.user;


import com.daas.entities.user.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<UserRole, Long> {

    UserRole findByRole(String role);

    List<UserRole> findAllByRoleNotIn(String[] roles);

    UserRole findFirstByRole(String role);



}
