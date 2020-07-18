package com.daas.repositories.iface.publications;


import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsNote;
import com.daas.entities.user.SubUser;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 */
public interface PublicationsNoteRepository extends JpaRepository<PublicationsNote, Long> {


    PublicationsNote findFirstById(Long id);

    PublicationsNote findFirstByPublicationsAndSubUser(Publications publications, SubUser subUser);

}
