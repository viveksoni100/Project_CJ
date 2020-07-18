package com.daas.controllers.ajax.paging;


import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.controllers.AbstractBaseController;
import com.daas.entities.user.SubUser;
import com.daas.repositories.iface.config.ConfigRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.repositories.iface.user.SubUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@PreAuthorize("hasRole('ROLE_CORPORATE') or hasRole('ROLE_ADMIN')")
@Controller
@RequestMapping(value = {"/ajax/corporate/paging"})
public class AjaxCorporatePagingController extends AbstractBaseController {


    @Autowired
    private ConfigRepository configRepository;

    @Autowired
    private PublicationsCategoryRepository publicationsCategoryRepository;

    @Autowired
    private PublicationsRepository publicationsRepository;

    @Autowired
    private PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    private SubUserRepository subUserRepository;


    @RequestMapping(value = {"/subusers"})
    public String subUserList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                              @RequestParam(value = "parent_id", required = false) Long parentId,
                              @RequestParam(value = "email", required = false, defaultValue = "%") String email,
                              @RequestParam(value = "username", required = false, defaultValue = "%") String username,
                              @RequestParam(value = "transaction_id", required = false, defaultValue = "%") String transactionId,
                              @RequestParam(value = "first_name", required = false, defaultValue = "%") String firstName,
                              @RequestParam(value = "last_name", required = false, defaultValue = "%") String lastName,
                              @RequestParam(value = "phone", required = false, defaultValue = "%") String phone,
                              @RequestParam(value = "status", required = false) boolean status,
                              ModelMap model
    ) {
       /* User user = new User();
        user.setId(parentId);*/
        Page<SubUser> users = subUserRepository.findByEmailLikeAndFirstNameLikeAndLastNameLikeAndPhoneLikeAndTransactionIdLike(
                "%" + email + "%", "%" + firstName + "%", "%" + lastName + "%", "%" + phone + "%",  "%" + transactionId + "%", pageable);

        model.addAttribute("subusers", users.stream().filter(user -> user.getParentUser().getId().longValue() == parentId.longValue()));
        model.addAttribute("pageable", pageable);
        model.addAttribute("firstName", (firstName.equals("%")) ? "" : firstName);
        model.addAttribute("lastName", (lastName.equals("%")) ? "" : lastName);
        model.addAttribute("phone", (phone.equals("%")) ? "" : phone);
        model.addAttribute("email", (email.equals("%")) ? "" : email);
        model.addAttribute("username", (username.equals("%")) ? "" : username);
        model.addAttribute("username", (transactionId.equals("%")) ? "" : transactionId);
        model.addAttribute("pagingUrl", "/ajax/corporate/paging/subusers");
        return "ajax/paging/subusers";
    }


}
