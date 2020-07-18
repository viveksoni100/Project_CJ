package com.daas.repositories.iface.user;


import com.daas.entities.user.SubUser;
import com.daas.entities.user.SubUserHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SubUserHistoryRepository extends JpaRepository<SubUserHistory, Long> {

    List<SubUserHistory> findAllBySubUser(SubUser subUser);
}
