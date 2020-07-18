package com.daas.repositories.daas;

import com.daas.entities.DaaS.Product;
import com.daas.entities.DaaS.ProductOffer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Repository
public interface ProductOfferRepository extends JpaRepository<ProductOffer,Long>, JpaSpecificationExecutor<ProductOffer> {

    public ProductOffer findFirstById(Long id);

    @Query("SELECT u FROM ProductOffer u WHERE u.isDeleted = 0")
    public List<ProductOffer> findAllNonDeletedOffers();

    public ProductOffer findFirstByOfferIdAndIsDeleted(String offerID, boolean aBoolean);

    public Set<ProductOffer> findAllByProductSetAndStatusAndEndDateAfter(Set<Product> productSet,boolean status,LocalDateTime timeNow);

    public List<ProductOffer> findAllByStatusAndEndDateAfter(boolean status, LocalDateTime timeNow);

    public Page<ProductOffer> findAllByOfferNameLikeAndOfferDescriptionLike(String offername, String offerDescription, Pageable pageable);
}
