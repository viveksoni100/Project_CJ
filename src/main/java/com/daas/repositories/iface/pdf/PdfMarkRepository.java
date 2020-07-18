package com.daas.repositories.iface.pdf;


import com.daas.entities.pdf.PdfMark;
import com.daas.entities.publications.Publications;
import com.daas.entities.user.SubUser;
import com.daas.entities.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

/**
 *
 */
public interface PdfMarkRepository extends JpaRepository<PdfMark, Long> {
    List<PdfMark> findAllByPublicationsAndSubUser_ParentUserAndStatus(Publications publications, User parentUser, Boolean status);

    @Query("select p from PdfMark as p where p.status=:status and p.publications=:publications and" +
            "(" +
            "(p.subUser.parentUser=:parentUser and " +
                "(p.markType='note' or p.markType='highlightnote' or p.markType='drawingnote') " +
            ") or ((p.markType='highlight' or p.markType='strikeout' or p.markType='drawing') and p.subUser=:subuser)" +
            ")")
    @Transactional
    Set<PdfMark> publicationsListBySubUser(@Param("status") boolean status, @Param("publications") Publications publications, @Param("parentUser") User parentUser,
                                           @Param("subuser") SubUser subUser);


    PdfMark findFirstByAnnotationId(String annotationId);
}
