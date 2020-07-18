package com.daas.repositories.iface.user;


import com.daas.entities.user.StripeUsers;
import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StripeUsersRepository extends JpaRepository<StripeUsers, Long> {

    StripeUsers findFirstByUser(User user);
}
