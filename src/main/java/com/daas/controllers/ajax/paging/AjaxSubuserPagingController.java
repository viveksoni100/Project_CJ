package com.daas.controllers.ajax.paging;

import com.daas.controllers.AbstractBaseController;
import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsCategory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value = {"/ajax/suser/paging"})
@PreAuthorize("hasRole('ROLE_SUBUSER')")
public class AjaxSubuserPagingController extends AbstractBaseController {

    public final static Logger LOG = LogManager.getLogger(AjaxSubuserPagingController.class.getName());

    @GetMapping(value = {"/publications", "/publications/{id}"})
    public String publicationsList(
            @PathVariable Optional<String> id,
            @PageableDefault(page = 0, size = 9, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
            @RequestParam(value = "publicationTitle", required = false, defaultValue = "%") String publicationTitle,
            ModelMap model) {
        String pagingUrl = "/ajax/suser/paging/publications";
        try {
            Page<Publications> publications;
            if (id.isPresent()) {
                List<PublicationsCategory> categories = new ArrayList<>();
                PublicationsCategory category = publicationsCategoryRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                categories.add(category);
                publications = publicationsRepository.findAllByCategoriesInAndStatusAndPublicationTitleLike(categories, true, "%", pageable);
                pagingUrl = pagingUrl + "/" + id.get();
            } else {
                publications = publicationsRepository.findAllByPublicationTitleLikeAndStatus("%" + publicationTitle + "%", true, pageable);
            }
            model.addAttribute("publications", publications);
        } catch (Exception e) {
            LOG.error("Error getting publications list");
        }
        model.addAttribute("pagingUrl", pagingUrl);
        model.addAttribute("pageable", pageable);

        model.addAttribute("publicationsTitle", publicationTitle);

        return "ajax/paging/books";
    }


}
