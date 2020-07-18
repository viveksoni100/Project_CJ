package com.daas.entities.pdf;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.daas.entities.BaseEntity;
import com.daas.entities.publications.Publications;
import com.daas.entities.user.SubUser;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Table(name = "pdf_marks")
@Entity
@Getter
@Setter
public class PdfMark extends BaseEntity {


    @JsonIgnore
    @ManyToOne(targetEntity = Publications.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "publication_id")
    private Publications publications;


    @JsonIgnore
    @ManyToOne(targetEntity = SubUser.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = true, name = "subuser_id")
    private SubUser subUser;


    @Column(name = "annotation_id", nullable = false)
    private String annotationId;

    //Note or Highlight
    @Column(name = "mark_type")
    private String markType;

    @Lob
    @Column(name = "note")
    private String note;

    @Lob
    @Column(name = "selection_info")
    private String selectionInfo;

    @Column(name = "has_selection")
    private boolean hasSelection = false;

    @Column(name = "mark_color")
    private String color;

    @Column(name = "position_x")
    private String positionX;

    @Column(name = "position_y")
    private String positionY;


    @Column(name = "width")
    private String width;

    @Column(name = "height")
    private String height;

    @Column(name = "page_index")
    private String pageIndex;

    @Column(name = "collapsed")
    private boolean collapsed;

    @Column(name = "display_format")
    private String displayFormat;

    @Lob
    private String WA;

    @Lob
    private String UF;

    @Lob
    private String RD;

    @Lob
    private String FB;

    @Lob
    private String TA;

    @Lob
    private String YA;

    @Lob
    @Column(name = "selection_text")
    private String selectionText;

    @Lob
    private String points;

    @Column(name = "page_height")
    private String pageHeight;

    @Override
    @PrePersist
    public void preInsert() {
        super.preInsert();
        this.status = true;
    }


}
