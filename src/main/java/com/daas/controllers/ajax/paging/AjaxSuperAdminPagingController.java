package com.daas.controllers.ajax.paging;


import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.controllers.AbstractBaseController;
import com.daas.entities.DaaS.Order;
import com.daas.entities.DaaS.ProductOffer;
import com.daas.entities.configurations.Configurations;
import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsCategory;
import com.daas.entities.subscriptions.Notifications;
import com.daas.entities.subscriptions.UserSubscriptions;
import com.daas.repositories.daas.OrderRepository;
import com.daas.repositories.daas.ProductOfferRepository;
import com.daas.repositories.iface.config.ConfigRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.repositories.iface.subscriptions.NotificationsRepository;
import com.daas.repositories.iface.subscriptions.UserSubscriptionRepository;
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

@PreAuthorize("hasRole('ROLE_ADMIN')")
@Controller
@RequestMapping(value = {"/ajax/super/paging"})
public class AjaxSuperAdminPagingController extends AbstractBaseController {


    @Autowired
    private ConfigRepository configRepository;

    @Autowired
    private PublicationsCategoryRepository publicationsCategoryRepository;

    @Autowired
    private PublicationsRepository publicationsRepository;

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    @Autowired
    private PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private OrderRepository orderRepository;

    @RequestMapping(value = {"/config"})
    public String configList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                             @RequestParam(value = "configName", required = false, defaultValue = "%") String configName,
                             @RequestParam(value = "configValue", required = false, defaultValue = "%") String configValue,
                             ModelMap model
    ) {
        Page<Configurations> configs = configRepository.findByConfigNameLikeAndConfigValueLike("%" + configName + "%", "%" + configValue + "%", pageable);
        model.addAttribute("configs", configs);
        model.addAttribute("pageable", pageable);
        model.addAttribute("configName", (configName.equals("%")) ? "" : configName);
        model.addAttribute("configValue", (configValue.equals("%")) ? "" : configValue);
        model.addAttribute("pagingUrl", "/ajax/super/paging/config");
        return "ajax/super/paging/configs";
    }


//For Searching the categories panel

    @RequestMapping(value = {"/category"})
    public String categoryList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                               @RequestParam(value = "categoryName", required = false, defaultValue = "%") String categoryName,
                               @RequestParam(value = "categoryDescription", required = false, defaultValue = "%") String categoryDescription,
                               ModelMap model
    ) {

        Page<PublicationsCategory> categories = publicationsCategoryRepository.findAllByCategoryNameLikeAndCategoryDescriptionLike("%" + categoryName + "%", "%" + categoryDescription + "%", pageable);

        model.addAttribute("categories", categories);
        model.addAttribute("pageable", pageable);
        model.addAttribute("categoryName", (categoryName.equals("%")) ? "" : categoryName);
        model.addAttribute("categoryDescription", (categoryDescription.equals("%")) ? "" : categoryDescription);
        model.addAttribute("pagingUrl", "/ajax/super/paging/category");
        return "ajax/super/paging/categories";
    }


    @RequestMapping(value = {"/publications"})
    public String publicationsList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                   @RequestParam(value = "publicationId", required = false, defaultValue = "%") String publicationId,
                                   @RequestParam(value = "publicationTitle", required = false, defaultValue = "%") String publicationTitle,
                                   @RequestParam(value = "description", required = false, defaultValue = "%") String description,
                                   ModelMap model
    ) {
        Page<Publications> publicationsList = publicationsRepository.findAllByPublicationTitleLikeAndPublicationIdLikeAndDescriptionLike("%" + publicationTitle + "%", "%" + publicationId + "%", "%" + description + "%", pageable);


        model.addAttribute("pagingUrl", "/ajax/super/paging/publications");
        model.addAttribute("pageable", pageable);
        model.addAttribute("publications", publicationsList);
        model.addAttribute("publicationTitle", (publicationTitle.equals("%")) ? "" : publicationTitle);
        model.addAttribute("description", (description.equals("%")) ? "" : description);
        model.addAttribute("publicationId", (publicationId.equals("%")) ? "" : publicationId);
        return "ajax/super/paging/publications";
    }

    @RequestMapping(value = {"/publications1"})
    public String publicationsList1(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                   @RequestParam(value = "publicationId", required = false, defaultValue = "%") String publicationId,
                                   @RequestParam(value = "publicationTitle", required = false, defaultValue = "%") String publicationTitle,
                                   @RequestParam(value = "description", required = false, defaultValue = "%") String description,
                                   ModelMap model
    ) {
        Page<Publications> publicationsList = publicationsRepository.findAllByPublicationTitleLikeAndPublicationIdLikeAndDescriptionLike("%" + publicationTitle + "%", "%" + publicationId + "%", "%" + description + "%", pageable);


        model.addAttribute("pagingUrl", "/ajax/super/paging/publications1");
        model.addAttribute("pageable", pageable);
        model.addAttribute("publications", publicationsList);
        model.addAttribute("publicationTitle", (publicationTitle.equals("%")) ? "" : publicationTitle);
        model.addAttribute("description", (description.equals("%")) ? "" : description);
        model.addAttribute("publicationId", (publicationId.equals("%")) ? "" : publicationId);
        return "ajax/super/paging/publications1";
    }


    @RequestMapping(value = {"/notification"})
    public String publicationsList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                                   @RequestParam(value = "taskId", required = false, defaultValue = "%") String taskId,
                                   ModelMap model
    ) {
        Page<Notifications> notifications = notificationsRepository.findAllByTaskIdLike("%" + taskId + "%", pageable);

        model.addAttribute("taskId", taskId);
        model.addAttribute("pagingUrl", "/ajax/super/paging/notification");
        model.addAttribute("notifications", notifications);
        model.addAttribute("pageable", pageable);
        return "ajax/super/paging/notifications";
    }

//changes is pending for usersubscription, database and entity needs to be created before this change

    @RequestMapping(value = {"/userSubscription"})
    public String usersList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                                   @RequestParam(value = "taskId", required = false, defaultValue = "%") String taskId,
                                   ModelMap model
    ) {
        Page<UserSubscriptions> userSubscriptions = userSubscriptionRepository.findAll(pageable);

        model.addAttribute("taskId", taskId);
        model.addAttribute("pagingUrl", "/ajax/super/paging/userSubscription");
        model.addAttribute("usersubscription", userSubscriptions);
        model.addAttribute("pageable", pageable);
        return "ajax/super/paging/userSubscription";
    }

    @RequestMapping(value = {"/purchasehistory"})
    public String userList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                               @RequestParam(value = "categoryName", required = false, defaultValue = "%") String categoryName,
                               @RequestParam(value = "categoryDescription", required = false, defaultValue = "%") String categoryDescription,
                               ModelMap model
    ) {

        Page<Order> purchasehistory = (Page<Order>) orderRepository.findAll();

        model.addAttribute("categories", purchasehistory);
        model.addAttribute("pageable", pageable);
        model.addAttribute("categoryName", (categoryName.equals("%")) ? "" : categoryName);
        model.addAttribute("categoryDescription", (categoryDescription.equals("%")) ? "" : categoryDescription);
        model.addAttribute("pagingUrl", "/ajax/super/paging/purchasehistory");
        return "ajax/super/paging/purchasehistory";
    }

    @RequestMapping(value = {"/offer"})
    public String offerList(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                            @RequestParam(value = "categoryName", required = false, defaultValue = "%") String categoryName,
                            @RequestParam(value = "categoryDescription", required = false, defaultValue = "%") String categoryDescription,
                            ModelMap model
    ) {

        Page<ProductOffer> productOffers=productOfferRepository.findAllByOfferNameLikeAndOfferDescriptionLike("%" + categoryName + "%", "%" + categoryDescription + "%", pageable);

        model.addAttribute("categories", productOffers);
        model.addAttribute("pageable", pageable);
        model.addAttribute("categoryName", (categoryName.equals("%")) ? "" : categoryName);
        model.addAttribute("categoryDescription", (categoryDescription.equals("%")) ? "" : categoryDescription);
        model.addAttribute("pagingUrl", "/ajax/super/paging/offer");
        return "ajax/super/paging/offer";
    }

}
