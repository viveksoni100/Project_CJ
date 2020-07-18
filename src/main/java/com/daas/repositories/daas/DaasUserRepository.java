package com.daas.repositories.daas;

import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DaasUserRepository extends JpaRepository<User, Long> {

}
