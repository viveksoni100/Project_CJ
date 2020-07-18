package com.daas.repositories.iface.subscriptions;


import com.daas.entities.subscriptions.Notifications;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationsRepository extends JpaRepository<Notifications, Long> {

    Notifications findFirstById(Long id);

    Page<Notifications> findAllByTaskIdLike(String taskId, Pageable pageable);

    List<Notifications> findAllByStatus(Boolean status);
}
