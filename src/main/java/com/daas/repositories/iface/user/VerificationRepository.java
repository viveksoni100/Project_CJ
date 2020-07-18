package com.daas.repositories.iface.user;


import com.daas.entities.user.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 */
public interface VerificationRepository extends JpaRepository<VerificationToken, Long> {

    VerificationToken findFirstByToken(String token);
}
