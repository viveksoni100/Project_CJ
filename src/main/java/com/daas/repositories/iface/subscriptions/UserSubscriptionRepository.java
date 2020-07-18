package com.daas.repositories.iface.subscriptions;


import com.daas.entities.subscriptions.UserSubscriptions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptions, Long> {



}
