package com.daas.validator.impl.entity;


import com.daas.entities.publications.Publications;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.validator.Base.AbstractBaseValidator;
import com.daas.validator.iface.entity.PublicationsConstraint;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PublicationsValidator extends AbstractBaseValidator implements ConstraintValidator<PublicationsConstraint, Publications> {
    private PublicationsConstraint publicationsConstraint;

    @Autowired
    private PublicationsRepository publicationsRepository;

    public static final Logger logger = LogManager.getLogger(PublicationsValidator.class.getName());


    @Override
    public void initialize(PublicationsConstraint constraintAnnotation) {
        this.publicationsConstraint = constraintAnnotation;
    }

    @Override
    public boolean isValid(Publications publications, ConstraintValidatorContext context) {
        // Check the state of the Adminstrator.
        Publications publicationsDb = null;
        try {
            if (publications == null) {
                return false;
            } else {

                if (publications.getId() != null) {
                    publicationsDb = publicationsRepository.findFirstByPublicationIdAndIdNot(publications.getPublicationId(), publications.getId());
                } else if (publications.getId() == null || publications.getId() == 0) {
                    publicationsDb = publicationsRepository.findFirstByPublicationId(publications.getPublicationId());
                }
                if (publicationsDb == null) {
                    return true;
                }
                context.buildConstraintViolationWithTemplate(localeHelper.getApplicationPropertiesText("unique.publication.id.required", null, "Selected publications id already exist")).addPropertyNode("publicationId").addConstraintViolation();
            }
        } catch (Exception e) {
            logger.error("", e);
        }

        return false;
    }

}