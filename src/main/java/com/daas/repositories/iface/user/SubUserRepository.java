package com.daas.repositories.iface.user;


import com.daas.entities.user.SubUser;
import com.daas.entities.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface SubUserRepository extends JpaRepository<SubUser, Long> {




    Page<SubUser> findAllByParentUser(User parentUser, Pageable pageable);

    Page<SubUser> findByEmailLikeAndFirstNameLikeAndLastNameLikeAndPhoneLikeAndTransactionIdLike(String email, String firstName, String lastName, String phone, String transactionId, Pageable pageable);

    SubUser findFirstById(Long id);

    SubUser findFirstByEmail(String email);

    //SubUser findFirstByUsername(String username);

    SubUser findFirstByEmailAndIdNot(String username, Long id);



    List<SubUser> findAllByExpiryDateEquals(LocalDate expiryDate);

    List<SubUser> findAllByParentUser(User parentUser);

    @Transactional
    @Modifying
    @Query("update SubUser set status=:status where expiryDate<:expiryDate")
    void changeStatus(@Param("status") Boolean status, @Param("expiryDate") LocalDate expiryDate);

    int countByParentUser(User user);
}
