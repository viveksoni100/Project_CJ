package com.daas.repositories.daas;

import com.daas.entities.DaaS.Cart;
import com.daas.entities.DaaS.CartDetail;
import com.daas.entities.DaaS.Product;
import com.daas.entities.DaaS.ProductOffer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartDetailRepository extends JpaRepository<CartDetail, Long> {

    public List<CartDetail> deleteByCart(Cart cart);

    public List<CartDetail> deleteByCartId(Long cartid);

    public CartDetail findFirstByProduct(Product product);

    public CartDetail findFirstByCartAndProduct(Cart cart, Product product);

    public CartDetail findFirstById(Long id);

    public List<CartDetail> findAllByCartAndProductOffer(Cart cart, ProductOffer productOffer);

    public Integer deleteByProductId(Long productid);

    public void deleteById(Long id);

    public void deleteAllByCart(Cart cart);

    public List<CartDetail> findAllByCart(Cart sessCart);

}
