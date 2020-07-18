package com.daas.repositories.daas;

import com.daas.entities.DaaS.SubscriptionNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionNotificationRepository extends JpaRepository<SubscriptionNotification,Integer> {
}
