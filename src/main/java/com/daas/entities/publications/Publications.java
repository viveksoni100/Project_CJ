package com.daas.entities.publications;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.daas.entities.BaseEntity;
import com.daas.validator.iface.field.BigDecimalRange;
import com.daas.validator.iface.field.EnsureNumber;
import com.daas.validator.iface.field.HtmlValidateConstraint;
import com.daas.validator.iface.entity.PublicationsConstraint;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Table(name = "publications_master")
@Entity
@Getter
@Setter
@PublicationsConstraint
public class Publications extends BaseEntity {


    @NotEmpty
    @NotNull
    @EnsureNumber
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "publication_id", nullable = false)
    private String publicationId;

    @NotEmpty
    @NotNull
    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "publication_title", nullable = false)
    private String publicationTitle;


    @Size(min=1)
    @NotEmpty(message="At least one category is required")
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "publications_categories", joinColumns = {
            @JoinColumn(name = "publication_id", nullable = false, updatable = false)},
            inverseJoinColumns = {@JoinColumn(name = "publication_category_id",
                    nullable = false, updatable = false)})
    public Set<PublicationsCategory> categories;





    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "publication_edition_label")
    private String publicationEditionLabel;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @Column(name = "publish_date", updatable = false)
    private LocalDate publishDate;

    @Lob
    @Column(name = "description")
    @Length(min = 100, max = 1000)
    private String description;


    @DecimalMin(value = "0.0", inclusive = false)
    @BigDecimalRange(minPrecision = 1, maxPrecision = 33, scale = 2, message = "The precision and the scale should be less than or equal to 35 and 2 respectively.")
    @Column(name = "price")
    @NotNull
    private BigDecimal price;


    @NotNull
    @NotEmpty
    @Column(name = "label_publication_upload_doc", length = 1000)
    private String labelPublicationUploadDoc;

    @NotNull
    @NotEmpty
    @Column(name = "label_publication_upload_toc", length = 1000)
    private String labelPublicationUploadToc;


    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "doc_name")
    private String docName;

    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "toc_name")
    private String tocName;

    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "image_name")
    private String imageName;

    @HtmlValidateConstraint(whiteListType = "none")
    @Column(name = "thumbnail_name")
    private String thumbnailName;




    @NotNull
    @NotEmpty
    @Column(name = "label_publication_original_image", length = 1000)
    private String labelPublicationOriginalImage;

    @NotNull
    @NotEmpty
    @Column(name = "label_publication_thumbnail", length = 1000)
    private String labelPublicationThumbnail;

    @Column(name = "is_document_in_split_mode")
    private boolean documentInSplitFormat;


    @Column(name = "download_count")
    private Long downloadCount;


    @Override
    public void preInsert() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.downloadCount = 0l;
    }

}
