package com.daas.controllers;


import com.daas.DTO.PurchaseDetailsAPI;
import com.daas.DTO.PurchaseDetailsData;
import com.daas.entities.DaaS.*;
import com.daas.entities.configurations.Configurations;
import com.daas.entities.subscriptions.Notifications;
import com.daas.entities.subscriptions.UserSubscriptions;
import com.daas.entities.user.User;
import com.daas.repositories.daas.*;
import com.daas.repositories.iface.config.ConfigRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.repositories.iface.subscriptions.NotificationsRepository;
import com.daas.repositories.iface.subscriptions.UserSubscriptionRepository;
import org.apache.tomcat.jni.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping(value = {"/admin"})
@PreAuthorize("hasRole('ROLE_ADMIN')")
public class SuperAdminController extends AbstractBaseController {

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
    private ProductRepository productRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductVersionRepository productVersionRepository;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private EntityManager entityManager;

    @Autowired
    OrderRepository orderRepository;

    public static String baseTemplate = "admin/superadmin/";

    @GetMapping(value = {"/home"})
    public String home() {
        try {

        } catch (Exception e) {

        }
        return baseTemplate + "users/profile";
    }

    @GetMapping(value = {"/config/list"})
    public String configuration(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                                HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "config/list";
        try {
            Page<Configurations> configs = configRepository.findAll(pageable);
            model.addAttribute("configs", configs);
            model.addAttribute("pagingUrl", "/ajax/super/paging/config");
            model.addAttribute("pageable", pageable);
        } catch (Exception e) {


        }
        return ret;
    }


    @GetMapping(value = {"/category/list"})
    public String category(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                           HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "publications/category/list";
        try {
            Page<ProductCategoryDetail> categories = productCategoryDetailRepository.findAll(pageable);
            /*List<ProductCategoryDetail> cats = productCategoryDetailRepository.findAll();*/
            List<ProductCategoryDetail> cats = productCategoryDetailRepository.findAllNonDeletedCategories();

            /*            Page<PublicationsCategory> categories = publicationsCategoryRepository.findAll(pageable);
             */
            //model.addAttribute("categories", categories);
            model.addAttribute("categories", cats);
            //model.addAttribute("pagingUrl", "/ajax/super/paging/category");
            //model.addAttribute("pageable", pageable);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return ret;
    }

    @GetMapping(value = {"/dashboard/list"})
    public String dashboard(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                           HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "publications/dashboard/list";
        int orderThisMonth = 0;
        String[] months = {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
        String monthlyIncome = "", monthWiseAmt = "", monthsList = "", productDataTitles = "", productAPITitles = "", productDataAmt = "", productAPIAmt = "";
        long earningThisMonth = 0, regUsers = 0, visitors = 0;
        for(Order ord : orderRepository.findAll())
            if(ord.getPurchaseDate().getMonthValue()==LocalDateTime.now().getMonthValue()){
                orderThisMonth+=1;
                earningThisMonth+=ord.getNetPrice();
            }
        for(User user : userRepository.findAll()){
            regUsers += 1;
            if(orderRepository.findAllByDaasUser(user).size()==0)
                visitors += 1;
        }
        LocalDate now = LocalDate.now();
        LocalDate prevMonth = now.minusDays(30);
        List<Order> orders = orderRepository.findAll();

        for(int j = 1; j <=12; j++){
            long earn = 0;
            for(Order order : orders)
                if(order.getPurchaseDate().getMonthValue() == j && order.getPurchaseDate().getYear() == now.getYear())
                    earn += order.getNetPrice();
            if(j == 1)
                monthlyIncome = String.valueOf(earn);
            else
                monthlyIncome = monthlyIncome + "," + earn;
        }
        LinkedHashMap<Product, Float> dataProductPrices = new LinkedHashMap<>();
        LinkedHashMap<Product, Float> APIProductPrices = new LinkedHashMap<>();
        for(Order ord : orders){
            if(LocalDateTime.now().getMonthValue() == ord.getPurchaseDate().getMonthValue()){
                List<OrderDetail> orderDetailList = ord.getOrderDetailList();
                for(OrderDetail od : orderDetailList){
                    Product product = od.getProduct();
                    String productTypeText = product.getProductCategoryDetail().getProductType().getProductTypeName();
                    if(productTypeText.equals("Customs Data"))
                        if(!dataProductPrices.containsKey(product))
                            dataProductPrices.put(product, od.getNetPrice());
                        else
                            dataProductPrices.replace(product, dataProductPrices.get(product), dataProductPrices.get(product)+od.getNetPrice());
                    else if(productTypeText.equals("Web Service"))
                        if(!APIProductPrices.containsKey(product))
                            APIProductPrices.put(product, od.getNetPrice());
                        else
                            APIProductPrices.replace(product, APIProductPrices.get(product), APIProductPrices.get(product)+od.getNetPrice());
                }
            }
        }
        Map<Product, Float> DATAresult = sortMap(dataProductPrices);
        int k = 0;
        for (Map.Entry<Product, Float> entry : DATAresult.entrySet()) {
            if(k==5)
                break;
            if(k == 0){
                int length = entry.getKey().getProductName().length();
                productDataTitles = entry.getKey().getProductName().substring(0,length>15?15:length);
                productDataAmt = entry.getValue().toString();
            }
            else{
                int length = entry.getKey().getProductName().length();
                productDataTitles = productDataTitles + "," + entry.getKey().getProductName().substring(0,length>15?15:length);
                productDataAmt = productDataAmt + "," + entry.getValue().toString();

            }
            k+=1;
        }
        Map<Product, Float> APIresult = sortMap(APIProductPrices);
        int h = 0;
        for (Map.Entry<Product, Float> entry : APIresult.entrySet()) {
            if(h==5)
                break;
            if(h == 0){
                int length = entry.getKey().getProductName().length();
                productAPITitles = entry.getKey().getProductName().substring(0,length>15?15:length);
                productAPIAmt = entry.getValue().toString();
            }
            else{
                int length = entry.getKey().getProductName().length();
                productAPITitles = productAPITitles + "," + entry.getKey().getProductName().substring(0,length>15?15:length);
                productAPIAmt = productAPIAmt + "," + entry.getValue().toString();

            }
            h+=1;
        }
        model.addAttribute("orderThisMonth", orderThisMonth);
        model.addAttribute("earningThisMonth", earningThisMonth);
        model.addAttribute("regUsers", regUsers);
        model.addAttribute("visitors", visitors);
        //model.addAttribute("monthsList", monthsList);
        //model.addAttribute("monthWiseAmt", monthWiseAmt);
        //model.addAttribute("prev", now.minusDays(30).getDayOfMonth() + "-" + now.minusDays(30).getMonthValue() + "-" + now.minusDays(30).getYear());
        //model.addAttribute("now", now.getDayOfMonth() + "-" + now.getMonthValue() + "-" + now.getYear());
        model.addAttribute("monthwiseIncome", monthlyIncome);
        model.addAttribute("productDataTitles",productDataTitles);
        model.addAttribute("productDataAmt", productDataAmt);
        model.addAttribute("productAPITitles",productAPITitles);
        model.addAttribute("productAPIAmt", productAPIAmt);
        model.addAttribute("month", months[now.getMonthValue()-1]);
        return ret;
    }

    private LinkedHashMap<Product, Float> sortMap(LinkedHashMap<Product, Float> productPrices) {
        List<Map.Entry<Product, Float>> capitalList = new LinkedList<>(productPrices.entrySet());

        Collections.sort(capitalList, (o1, o2) -> o2.getValue().compareTo(o1.getValue()));

        LinkedHashMap<Product, Float> result = new LinkedHashMap<>();
        for (Map.Entry<Product, Float> entry : capitalList)
            result.put(entry.getKey(), entry.getValue());
        return result;
    }


    @GetMapping(value = {"/publications/datalist"})
    public String publications(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "publications/datalist";
        try {
            /*ProductType productType = productTypeRepository.findFirstByProductTypeName("DATA");*/
            ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
            List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
            List<Product> productList = new ArrayList<>();
            for (ProductCategoryDetail p : productCategoryDetailList) {
                System.out.println(p.getId() + "*******************************data*");
                List<Product> product = productRepository.findAllByProductCategoryDetailAndEndDateAfterAndIsDeleted(p, LocalDateTime.now(), false);
                /*List<Product> product = productRepository.findAllNonDeletedData();*/
                productList.addAll(product);
            }
            System.out.println(productList.size() + "******************************data*******************");

            //Page<Product> products=new PageImpl<Product>(productList,pageable,productList.size());
            //List<Product> products =
            /*  Page<Product> products=productRepository.findAll(pageable);*/
            model.addAttribute("dataproduct", productList);
            //model.addAttribute("pagingUrl", "/ajax/super/paging/publications");
            //model.addAttribute("pageable", pageable);
            /*Page<Publications> publications = publicationsRepository.findAll(pageable);
            model.addAttribute("publications", publications);
            model.addAttribute("pagingUrl", "/ajax/super/paging/publications");
            model.addAttribute("pageable", pageable);*/
        } catch (Exception e) {

        }
        return ret;
    }

    /*DataListHenil*/
    /*@GetMapping(value = {"/publications/datalist"})
    public String publications(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        System.out.println("WTF...");
        String ret = baseTemplate + "publications/datalist";
        try {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("DATA");
            List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
            List<Product> productList = new ArrayList<>();
            for (ProductCategoryDetail p : productCategoryDetailList) {
                //System.out.println(p.getId() + "*******************************data*");
                //List<Product> product = productRepository.findAllByProductCategoryDetailAndEndDateAfterAndIsDeleted(p, LocalDateTime.now(), false);
                //List<Product> products = productRepository.findAllByProductCategoryDetailAndIsDeleted(p, false);
                List<Product> prods = productRepository.findAllByProductCategoryDetail(p);
                for(Product pr : prods) {
                    System.out.println(pr.getDeleted());
                    if (pr.getEndDate().isAfter(LocalDateTime.now()) && !pr.getDeleted())
                        productList.add(pr);
                }
                *//*List<Product> product = productRepository.findAllNonDeletedData();*//*
                //productList.addAll(product);
            }
            //System.out.println(productList.size() + "******************************data*******************");

            //Page<Product> products=new PageImpl<Product>(productList,pageable,productList.size());
            //List<Product> products =
            *//*  Page<Product> products=productRepository.findAll(pageable);*//*
            model.addAttribute("dataproduct", productList);
            //model.addAttribute("pagingUrl", "/ajax/super/paging/publications");
            //model.addAttribute("pageable", pageable);
            *//*Page<Publications> publications = publicationsRepository.findAll(pageable);
            model.addAttribute("publications", publications);
            model.addAttribute("pagingUrl", "/ajax/super/paging/publications");
            model.addAttribute("pageable", pageable);*//*
        } catch (Exception e) {

        }
        System.out.println("Okay...");
        return ret;
    }*/

    @GetMapping(value = {"/publications/apilist"})
    public String publications1(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "publications/apilist";
        try {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("Web Service");
            /*ProductType productType = productTypeRepository.findFirstByProductTypeName("API");*/
            List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
            List<Product> productList = new ArrayList<>();
            for (ProductCategoryDetail p : productCategoryDetailList) {

                List<Product> product = productRepository.findAllByProductCategoryDetailAndIsDeleted(p, false);
                productList.addAll(product);
            }


            //Page<Product> products=new PageImpl<Product>(productList,pageable,productList.size());
            model.addAttribute("dataproduct", productList);
/*
            Page<Publications> publications = publicationsRepository.findAll(pageable);
            model.addAttribute("publications1", publications);
*/
            //model.addAttribute("pagingUrl", "/ajax/super/paging/publications1");
            //model.addAttribute("pageable", pageable);
        } catch (Exception e) {


        }
        return ret;
    }

    /*APIListHenil*/
    /*@GetMapping(value = {"/publications/apilist"})
    public String publications1(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "publications/apilist";
        try {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("API");
            List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
            List<Product> productList = new ArrayList<>();
            for (ProductCategoryDetail p : productCategoryDetailList) {
                System.out.println(p.getId() +" -> "+ p.getProductType().getProductTypeName());
            }
            for (ProductCategoryDetail p : productCategoryDetailList) {

                List<Product> product = productRepository.findAllByProductCategoryDetailAndIsDeleted(p, false);
                List<Product> products = productRepository.findAllByProductCategoryDetail(p);
                for(Product prod : products)
                    if(!prod.getDeleted())
                        productList.add(prod);
                //productList.addAll(product);
            }

            //Page<Product> products=new PageImpl<Product>(productList,pageable,productList.size());
            model.addAttribute("dataproduct", productList);
*//*
            Page<Publications> publications = publicationsRepository.findAll(pageable);
            model.addAttribute("publications1", publications);
*//*
            //model.addAttribute("pagingUrl", "/ajax/super/paging/publications1");
            //model.addAttribute("pageable", pageable);
        } catch (Exception e) {


        }
        return ret;
    }*/


    @GetMapping(value = {"/notification/list"})
    public String notification(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "subscription/notifications";
        try {
            Page<Notifications> notifications = notificationsRepository.findAll(pageable);
            model.addAttribute("notifications", notifications);
            model.addAttribute("pagingUrl", "/ajax/super/paging/notification");
            model.addAttribute("pageable", pageable);
        } catch (Exception e) {


        }
        return ret;
    }

// database and entity creation needs to be done before all below code

    @GetMapping(value = {"/user/list"})
    public String userSubscription(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                                   HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "user/list";
        try {
            Page<UserSubscriptions> userSubscriptions = userSubscriptionRepository.findAll(pageable);
            model.addAttribute("usersubscription", userSubscriptions);
            model.addAttribute("pagingUrl", "/ajax/super/paging/usersubscription");
            model.addAttribute("pageable", pageable);
        } catch (Exception e) {
            System.err.println(e.getMessage());
        }
        return ret;
    }

    @GetMapping(value = {"/offer/list"})
    public String offer(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
                        HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "offer/list";
        try {
            /*List<ProductOffer> offers = productOfferRepository.findAll();*/
            List<ProductOffer> offers = productOfferRepository.findAllNonDeletedOffers();

            for (ProductOffer p : offers) {
                System.out.println(p.getStartDate() + "---------" + p.getEndDate());
            }


            //Page<ProductOffer> offerList = productOfferRepository.findAll(pageable);
            model.addAttribute("offers", offers);
            //model.addAttribute("pagingUrl", "/ajax/super/paging/offer");
            //model.addAttribute("pageable", pageable);
        } catch (Exception e) {

        }
        return ret;
    }

    @GetMapping(value = {"/purchasehistory/apilist"})
    public String apilist(@PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                          HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "purchasehistory/apilist";

        List<PurchaseDetailsAPI> purchaseDetailsAPI = new ArrayList<>();
        ProductType apiType = productTypeRepository.findFirstByProductTypeName("Web Service");
        List<ProductCategoryDetail> apiProductCategoryDetail = productCategoryDetailRepository.findAllByProductType(apiType);
        List<Product> apiProduct = new ArrayList<>();
        for (ProductCategoryDetail cd : apiProductCategoryDetail) {
            apiProduct.addAll(productRepository.findAllByProductCategoryDetail(cd));
        }
        List<Order> allOrderList = orderRepository.findAll();
        for (Order o : allOrderList) {
            List<OrderDetail> orderDetails = o.getOrderDetailList();
            for (OrderDetail od : orderDetails) {
                if (apiProduct.contains(od.getProduct())) {

                    PurchaseDetailsAPI api = new PurchaseDetailsAPI();
                    api.setOrderId(o.getId());
                    api.setUFirstName(o.getDaasUser().getFirstName());
                    api.setULastName(o.getDaasUser().getLastName());
                    api.setOrderDetId(od.getId());
                    api.setEmail(o.getDaasUser().getEmail());
                    api.setPurchaseDate(o.getPurchaseDate());
                    api.setProductName(od.getProductName());
                    api.setExpiryDate(od.getProductExpiryDate());
                    if (od.getSbuCode() != null) {
                        api.setSbuCode(od.getSbuCode());
                    }
                    api.setTotalQty(od.getProductQty());
                    if (od.getUsedApiCallCount() != null) {
                        api.setApiCallsUsed(od.getUsedApiCallCount());
                    }
                    if (api.getApiCallsUsed() != null) {
                        api.setRemainingCalls(api.getTotalQty() - api.getApiCallsUsed());
                    }
                    api.setTotalAmount(od.getNetPrice());

                    purchaseDetailsAPI.add(api);
                }
            }
        }
        System.out.println(purchaseDetailsAPI);

        model.addAttribute("orders", purchaseDetailsAPI);

        return ret;
    }

    @GetMapping(value = "/purchasehistory/datalist")
    public String datalist(ModelMap model) {
        String ret = baseTemplate + "purchasehistory/datalist";
        List<PurchaseDetailsData> purchaseDetailsData = new ArrayList<>();
        ProductType dataType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> dataProductCategoryDetail = productCategoryDetailRepository.findAllByProductType(dataType);
        List<Product> dataProduct = new ArrayList<>();
        for (ProductCategoryDetail cd : dataProductCategoryDetail) {
            dataProduct.addAll(productRepository.findAllByProductCategoryDetail(cd));
        }

        List<Order> allOrderList = orderRepository.findAll();
        for (Order o : allOrderList) {
            List<OrderDetail> orderDetails = o.getOrderDetailList();
            for (OrderDetail od : orderDetails) {
                if (dataProduct.contains(od.getProduct())) {
                    PurchaseDetailsData data = new PurchaseDetailsData();
                    data.setUFirstName(o.getDaasUser().getFirstName());
                    data.setULastName(o.getDaasUser().getLastName());
                    data.setOrderId(o.getId());
                    data.setEmail(o.getDaasUser().getEmail());
                    data.setPurchaseDate(o.getPurchaseDate());
                    data.setProductName(od.getProductName());
                    data.setExpiryDate(od.getProductExpiryDate());
                    data.setTotalPrice(od.getNetPrice());
                    if (od.getOfferAppliedId() != null) {
                        data.setOfferIdApplied(od.getOfferAppliedId());
                    }
                    purchaseDetailsData.add(data);
                }
            }
        }
        model.addAttribute("orders", purchaseDetailsData);
        System.out.println(purchaseDetailsData);
        return ret;
    }


}
