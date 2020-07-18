package com.daas.repositories.daas;

import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.OrderDetail;
import com.daas.entities.DaaS.Product;
import com.daas.entities.DaaS.OrderDetail;
import org.hibernate.query.NativeQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

    public List<OrderDetail> findAllByProductId(Long productid);

    @Query(nativeQuery = true, value = "SELECT * FROM daas_order_detail where order_id=:id")
    public List<OrderDetail> findAllByOrderId(@Param("id") String id);

}
