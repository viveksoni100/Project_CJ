package com.daas.repositories.iface.user;


import com.daas.entities.user.ForgotPasswordToken;
import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ForgotPasswordRepository extends JpaRepository<ForgotPasswordToken, Long> {
    ForgotPasswordToken findFirstByUser(User user);

    ForgotPasswordToken findFirstByToken(String token);

    ForgotPasswordToken findFirstByTokenAndStatus(String token, Boolean status);
}
