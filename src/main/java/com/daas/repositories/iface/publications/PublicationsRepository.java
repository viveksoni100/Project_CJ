package com.daas.repositories.iface.publications;


import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *
 */
public interface PublicationsRepository extends JpaRepository<Publications, Long> {


    Publications findFirstById(Long id);
    Publications findFirstByPublicationIdAndId(String publicationsId, Long id);

    Publications findFirstByPublicationIdAndIdNot(String publicationsId, Long id);

    Publications findFirstByPublicationId(String publicationsId);

    Page<Publications> findFirstByPublicationIdAndDescription(String publicationId, String description, Pageable pageable);

    Page<Publications> findAllByPublicationTitleLikeAndPublicationIdLikeAndDescriptionLike(String publicationsTitle, String publicationId, String description, Pageable pageable);


    Page<Publications> findAllByPublicationTitleLikeAndStatus(String title, boolean status, Pageable pageable);

    Page<Publications> findAllByCategoriesInAndStatusAndPublicationTitleLike(List<PublicationsCategory> categories, boolean status, String title, Pageable pageable);

    Page<Publications> findAllByStatus(boolean status, Pageable pageable);

    @Query("SELECT SUM(p.downloadCount) as count FROM Publications p")
    @Transactional
    Long downloadCount();
}
