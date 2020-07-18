package com.daas.repositories.daas;

import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    public Order findFirstByDaasUser(User daasUser);

    public List<Order> findAllByDaasUser(User daasUser);

    public Order findAllByOrderDetailList(OrderDetail orderDetail);

    public Order findFirstByOrderDetailList(OrderDetail orderDetail);
}
