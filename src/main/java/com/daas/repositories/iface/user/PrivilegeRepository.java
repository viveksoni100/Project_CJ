package com.daas.repositories.iface.user;


import com.daas.entities.user.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PrivilegeRepository extends JpaRepository<Privilege, Long> {

    List<Privilege> findAllByOrderByName();

}
