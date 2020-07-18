package com.daas.repositories.iface.publications;


import com.daas.entities.publications.PublicationsCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 *
 */
public interface PublicationsCategoryRepository extends JpaRepository<PublicationsCategory, Long> {


    PublicationsCategory findFirstById(Long id);

    Page<PublicationsCategory> findAllByCategoryNameLikeAndCategoryDescriptionLike(String categoryName, String categoryDescription, Pageable pageable);

    List<PublicationsCategory> findAllByOrderByCategoryName();

    List<PublicationsCategory> findAllByStatusOrderByCategoryName(boolean status);
}
