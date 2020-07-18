package com.daas.repositories.daas;

import com.daas.entities.DaaS.Cart;
import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

    public Cart findFirstById(Long id);

    public Cart findByDaasUser(User daasUser);

    public Cart findCartBySessionId(String sessionId);
}
