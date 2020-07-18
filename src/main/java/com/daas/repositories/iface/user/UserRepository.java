package com.daas.repositories.iface.user;


import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findFirstByEmail(String email);

    //User findFirstByUsername(String username);

    User findFirstByEmailAndIdNot(String email, Long id);

}
