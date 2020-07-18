package com.daas.controllers.ajax;


import com.daas.components.ajax.AjaxResponse;
import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.controllers.AbstractBaseController;
import com.daas.entities.DaaS.*;
import com.daas.entities.configurations.Configurations;
/*import com.publications.entities.forms.daas.DaasCategory;*/
import com.daas.entities.publications.Publications;
import com.daas.entities.subscriptions.Notifications;
import com.daas.entities.user.User;
import com.daas.events.event.daas.API90PerEvent;
import com.daas.events.event.daas.OCRPurchaseSuccessEvent;
import com.daas.events.event.daas.ProductUpdateSuccessEvent;
import com.daas.repositories.daas.*;
import com.daas.repositories.iface.config.ConfigRepository;
import com.daas.repositories.iface.publications.PublicationsCategoryRepository;
import com.daas.repositories.iface.publications.PublicationsRepository;
import com.daas.repositories.iface.subscriptions.NotificationsRepository;
import com.daas.utilities.singleton.CommonUtil;
import net.lingala.zip4j.ZipFile;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tika.Tika;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolation;
import java.io.*;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.zip.ZipEntry;

@PreAuthorize("hasRole('ROLE_ADMIN')")
@Controller
@RequestMapping(value = {"/ajax/super"})
public class AjaxSuperAdminController extends AbstractBaseController {

    @Autowired
    private ConfigRepository configRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private NotificationsRepository notificationsRepository;

    @Autowired
    private PublicationsCategoryRepository publicationsCategoryRepository;

    @Autowired
    private PublicationsRepository publicationsRepository;

    @Autowired
    private PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductVersionRepository productVersionRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductSlabRepository productSlabRepository;

    @Autowired
    private ProductSlabDetailRepository productSlabDetailRepository;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private DataContentTypeRepo dataContentTypeRepo;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;


    @Value("${daas.filepath}")
    private String filepath;


    public final static Logger LOG = LogManager.getLogger(AjaxSuperAdminController.class.getName());

    @GetMapping(value = {"/config/form", "/config/form/{id}"})
    public String colleagueForm(HttpServletRequest request, ModelMap model,
                                @PathVariable Optional<String> id
    ) {

        Configurations config = new Configurations();
        List<Long> roleIds = new ArrayList<>();
        if (id.isPresent()) {
            config = configRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
        }
        model.addAttribute("config", config);
        model.addAttribute("success", false);

        return "ajax/super/config/create";
    }


    @GetMapping(value = "/api/purchase/form/{orderDetId}")
    public String apiPurchaseDetailForm(HttpServletRequest request, ModelMap model, @PathVariable String orderDetId) {
        Optional<OrderDetail> orderDetail = orderDetailRepository.findById(pathVariableEncrypt.decryptId(orderDetId));
        if (orderDetail.isPresent()) {
            model.addAttribute("orderDetail", orderDetail.get());
        }
        model.addAttribute("success", false);
        return "ajax/super/purchase_detail/api/create";
    }

    @PostMapping(value = {"/config/create", "/config/create/{id}"})
    public String colleague(@ModelAttribute("config") Configurations config, BindingResult result,
                            @PathVariable Optional<String> id,
                            HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {


        try {

            if (id.isPresent() && !id.get().equalsIgnoreCase("0")) {
                Configurations configDb = configRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                config.setId(configDb.getId());
            }
            Set<ConstraintViolation<Configurations>> violations = validator.validate(config);
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                model.addAttribute("success", false);
                alerts.setError("required.fields.missing");
            } else {
                configRepository.save(config);
                alerts.setSuccess("config.create.success");
                model.addAttribute("success", true);
            }
        } catch (Exception e) {
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", config);

        return "ajax/super/config/create";
    }


    @PostMapping(value = "/api/purchase/form/{orderDetId}")
    public String updateApiPurchaseDetail(@ModelAttribute("orderDetail") OrderDetail orderDetail, ModelMap model, @PathVariable String orderDetId, HttpServletRequest request) {
        System.out.println("inside purchase detail api...");
        try {
            Optional<OrderDetail> orderDetailOld = orderDetailRepository.findById(pathVariableEncrypt.decryptId(orderDetId));
            if (orderDetailOld.isPresent()) {
                /*System.out.println("orderDetail.getUsedApiCallCount() : " + orderDetail.getUsedApiCallCount());
                System.out.println("orderDetailOld.get().getProductQty() : " + orderDetailOld.get().getProductQty());*/
                if ((!orderDetail.getSbuCode().equals("")) && (orderDetail.getUsedApiCallCount() <= orderDetailOld.get().getProductQty())) {
                    orderDetailOld.get().setSbuCode(orderDetail.getSbuCode());
                    orderDetailOld.get().setUsedApiCallCount(orderDetail.getUsedApiCallCount());
                    orderDetailRepository.save(orderDetailOld.get());

                    if(orderDetailOld.get().getUsedApiCallCount() >= (orderDetailOld.get().getProductQty() * 0.90)){
                        //sending email to the client regarding the 90% usage of api calls
                        Order order = orderRepository.findAllByOrderDetailList(orderDetailOld.get());
                        User user = order.getDaasUser();
                        eventPublisher.publishEvent(new API90PerEvent(user, order, orderDetail));
                    }

                    alerts.setSuccess("purchase.detail.api.updated");
                    model.addAttribute("success", true);
                } else {
                    model.addAttribute("success", false);
                    alerts.setError("required.fields.missing");
                }
            }
        } catch (Exception e) {
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }
        System.out.println("saying bye...");
        return "ajax/super/purchase_detail/api/create";
    }

    @ResponseBody
    @PostMapping(value = {"/config/change/{id}"})
    public AjaxResponse configChange(@PathVariable("id") String id, @RequestParam("configVaue") String value, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            Configurations config = configRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (config != null) {
                config.setConfigValue(value);
                configRepository.save(config);
                response.success("Data saved");
            }
        } catch (Exception e) {
            LOG.error("Error saving config", e);
            response.error("Error saving config");
        }
        return response;
    }

    @ResponseBody
    @PostMapping(value = {"/config/status/{id}"})
    public AjaxResponse configStatusChange(@PathVariable("id") String id, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            Configurations config = configRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (config != null) {
                config.setStatus(!config.getStatus());
                configRepository.save(config);
                response.success("Status changed", Arrays.asList(config.getStatus()));
            }
        } catch (Exception e) {
            LOG.error("Error saving config", e);
            response.error("Error saving config");
        }
        return response;
    }


    @GetMapping(value = {"/category/form", "/category/form/{id}"})
    public String categoryForm(HttpServletRequest request, ModelMap model,
                               @PathVariable Optional<String> id
    ) {
        List<ProductType> productTypeList = new ArrayList<ProductType>();
        ProductCategory productCategory = null;

        List<String> typevalues = new ArrayList<String>();

        if (id.isPresent()) {
            ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
            productCategory = productCategoryDetail.getProductCategory();

            productTypeList.add(productCategoryDetail.getProductType());
        } else {
            productTypeList.addAll(productTypeRepository.findAll());
            productCategory = new ProductCategory();
        }
        model.addAttribute("producttype", productTypeList);
        model.addAttribute("productcategory", productCategory);
        model.addAttribute("typeValues", typevalues);
        model.addAttribute("success", false);

/*
        PublicationsCategory publicationsCategory = new PublicationsCategory();

        if (id.isPresent()) {
            publicationsCategory = publicationsCategoryRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
        }
        model.addAttribute("publicationsCategory", publicationsCategory);
        model.addAttribute("success", false);*/

        return "ajax/super/publications/category/create";
    }


    public boolean isDuplicateNamePresent(ProductCategory productCategory){

        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllNonDeletedCategories();

        for(int i=0; i<productCategoryDetailList.size(); i++){
            if(productCategoryDetailList.get(i).getProductCategory().getProductCategoryName().equals(productCategory.getProductCategoryName())){
                return true;
            }
        }
        return false;
    }

    @PostMapping(value = {"/category/create", "/category/create/{id}"})
    public String category(@ModelAttribute("productcategory") ProductCategory productCategory, BindingResult result,
                           @PathVariable Optional<String> id,
                           @RequestParam("typeValues") Optional<String> typeValues,
                           HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();
        List<ProductCategoryDetail> productCategoryDetailListNew = productCategoryDetailRepository.findAllNonDeletedCategories();
        boolean success = false;

        boolean flagOfDuplicateName = false;

        try {

            if(!id.isPresent()){
                flagOfDuplicateName = isDuplicateNamePresent(productCategory);
            }

            Set<ConstraintViolation<ProductCategory>> violations = validator.validate(productCategory);

            ProductCategory tempCat = new ProductCategory();
            if (violations.size() > 0 || typeValues == null || (!(typeValues.isPresent())) || flagOfDuplicateName) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                success = false;
                if ((!(typeValues.isPresent())) || typeValues == null) {
                    alerts.setError("At least one type must be checked.");
                    success = false;
                }
                List<ProductType> productTypeList = productTypeRepository.findAll();
                model.addAttribute("producttype", productTypeList);

                for(int i=0; i<productCategoryDetailListNew.size(); i++){
                    if(productCategoryDetailListNew.get(i).getProductCategory().getProductCategoryName().equals(productCategory.getProductCategoryName())){
                        result.rejectValue("productCategoryName", "", "Duplicate Category Name is not allowed.");
                    }
                }

  /*              List<ProductType> productTypeList = new ArrayList<ProductType>();
                productTypeList.addAll(productTypeRepository.findAll());
                model.addAttribute("producttype", productTypeList);

                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                success = false;
                alerts.setError("required.fields.missing");*/
            } else {
                tempCat = productCategoryRepository.findFirstByProductCategoryName(productCategory.getProductCategoryName());
                if (tempCat != null) {
                    productCategory.setId(tempCat.getId());
                } else {
                    tempCat = new ProductCategory();
                }
                productCategoryRepository.save(productCategory);
                tempCat = productCategoryRepository.findFirstByProductCategoryName(productCategory.getProductCategoryName());


                List<String> productTypes = new ArrayList<>();
                productTypes.addAll(Arrays.asList(typeValues.get().split(",")));

                for (String type : productTypes) {
                    ProductCategoryDetail productCategoryDetail = new ProductCategoryDetail();
                    if (id.isPresent()) {
                        productCategoryDetail.setId(pathVariableEncrypt.decryptId(id.get()));
                    }
                    productCategoryDetail.setProductCategory(tempCat);
                    productCategoryDetail.setProductType(productTypeRepository.findFirstByProductTypeName(type));
                    productCategoryDetail.setStatus(true);
                    productCategoryDetail.setDeleted(false);

                    productCategoryDetailList.add(productCategoryDetail);
                }
                success = true;
                productCategoryDetailRepository.saveAll(productCategoryDetailList);

/*
                publicationsCategoryRepository.save(publicationsCategory);
                alerts.setSuccess("category.create.success");
*/

            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(e.getMessage());
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }

        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", productCategoryDetailList);
        model.addAttribute("success", success);

        return "ajax/super/publications/category/create";
    }


    @ResponseBody
    @PostMapping(value = {"/category/status/{id}"})
    public AjaxResponse categoryStatusChange(@PathVariable("id") String id, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (productCategoryDetail != null) {
                if (productCategoryDetail.getStatus() == null) {
                    productCategoryDetail.setStatus(false);
                }
                productCategoryDetail.setStatus(!productCategoryDetail.getStatus());
                productCategoryDetailRepository.save(productCategoryDetail);
                response.success("Status changed", Arrays.asList(productCategoryDetail.getStatus()));
            }

            /*PublicationsCategory category = publicationsCategoryRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (category != null) {
                category.setStatus(!category.getStatus());
                publicationsCategoryRepository.save(category);
                response.success("Status changed", Arrays.asList(category.getStatus()));
            }*/
        } catch (Exception e) {
            LOG.error("Error saving category", e);
            response.error("Error saving category");
        }
        return response;
    }


    @GetMapping(value = {"/publications/dataform", "/publications/dataform/{id}"})
    public String publicationsForm(HttpServletRequest request, ModelMap model,
                                   @PathVariable Optional<String> id) {
        ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductTypeAndIsDeletedAndStatus(productType, false, true);

        for (ProductCategoryDetail productCategory : productCategoryDetailList) {
            productCategory.getProductCategory();
        }

        try {

            Product product = new Product();

            if (id.isPresent()) {
                product = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                ProductCategoryDetail productCategoryDetail = product.getProductCategoryDetail();
                if (productCategoryDetail != null) {
                    ProductCategory productCategory = productCategoryDetail.getProductCategory();
                }
                ProductVersion curVersion = productVersionRepository.findFirstByProductsOrderByProductVersionDesc(product);

                float ver = curVersion.getProductVersion();
                ver = Math.round((ver + 0.1f) * 10);
                ver = ver / 10;

                model.addAttribute("versionName", curVersion.getProductVersionName());
                model.addAttribute("productVersion", ver);

            } else {
                model.addAttribute("productVersion", 1.0f);
                model.addAttribute("versionName", " ");
            }
            model.addAttribute("daasproduct", product);
            model.addAttribute("success", false);
        } catch (Exception e) {
            LOG.error("Error getting Data product create form", e);
        }
        model.addAttribute("categories", productCategoryDetailList);

        return "ajax/super/publications/datacreate";
    }

    @GetMapping(value = {"/publications/dataformUpload", "/publications/dataformUpload/{id}"})
    public String publicationsFormUpload(HttpServletRequest request, ModelMap model,
                                         @PathVariable Optional<String> id) {
        System.out.println("");
        ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);

        for (ProductCategoryDetail productCategory : productCategoryDetailList) {
            productCategory.getProductCategory();
        }

        try {

            Product product = new Product();

            if (id.isPresent()) {
                product = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                ProductCategoryDetail productCategoryDetail = product.getProductCategoryDetail();
                if (productCategoryDetail != null) {
                    ProductCategory productCategory = productCategoryDetail.getProductCategory();
                }
                ProductVersion curVersion = productVersionRepository.findFirstByProductsOrderByProductVersionDesc(product);

                float ver = curVersion.getProductVersion();
                ver = Math.round((ver + 0.1f) * 10);
                ver = ver / 10;

                model.addAttribute("productVersion", ver);
                model.addAttribute("versionName", curVersion.getProductVersionName());
            } else {
                model.addAttribute("productVersion", 1.0f);
                model.addAttribute("versionName", " ");
            }
            model.addAttribute("daasproduct", product);
            model.addAttribute("success", false);
        } catch (Exception e) {
            LOG.error("Error getting Data product create form", e);
        }
        model.addAttribute("categories", productCategoryDetailList);

        return "ajax/super/publications/datacreate-upload";
    }


    @PostMapping(value = {"/publications/datacreate", "/publications/datacreate/{id}"})
    public String publications(@ModelAttribute("daasproduct") Product product, BindingResult result,
                               @RequestParam("dataFile") MultipartFile[] dataFile,
                               @RequestParam("productThumbnail") MultipartFile productThumbnail,
                               @RequestParam("productVersion") String version,
                               @RequestParam("versionName") String versionName,
                               @RequestParam("categories") String categoryDetail,
                               @PathVariable Optional<String> id,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        System.out.println("");
        boolean success = false;
        boolean duplicatePIDFlag = false;

        String productID = product.getProductId();
        String productName = product.getProductName();

        Product productWithDuplicatePID = productRepository.findFirstByProductIdAndIsDeleted(productID, false);
        if (productWithDuplicatePID != null && productWithDuplicatePID.getProductId().equals(productID)) {
            if (productWithDuplicatePID.getProductId().equals(productID) && productWithDuplicatePID.getProductName().equals(productName))
                duplicatePIDFlag = false;
            if (productWithDuplicatePID.getProductId().equals(productID) && (!productWithDuplicatePID.getProductName().equals(productName)))
                duplicatePIDFlag = true;
        } else {
            duplicatePIDFlag = false;
        }

        if (id.isPresent()) {
            product.setId(pathVariableEncrypt.decryptId(id.get()));
        }

        Set<ConstraintViolation<Product>> violations = validator.validate(product);
        if (violations.size() > 0 || ((!(id.isPresent())) && dataFile[0].isEmpty()) || product.getProductPrice() < 1 || duplicatePIDFlag) {
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            if ((!(id.isPresent())) && dataFile[0].isEmpty()) {
                result.rejectValue("dataFileName", "", "No file has been uploaded.");
            }
            if (product.getProductPrice() < 1) {
                result.rejectValue("productPrice", "", "Price must be higher than 1");
            }
            if (duplicatePIDFlag) {
                result.rejectValue("productId", "", "Product ID is already present");
            }
            success = false;
        } else {
            ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.valueOf(Integer.parseInt(categoryDetail)));
            product.setProductCategoryDetail(productCategoryDetail);
            product.setFile_path(product.getProductId());
            ProductVersion productVersion = new ProductVersion();
            productVersion.setProducts(product);
            productVersion.setProductVersion(Float.parseFloat(version));
            productVersion.setProductVersionName(versionName);

            List<ProductVersion> productVersions = new ArrayList<ProductVersion>();
            productVersions.add(productVersion);
            product.setProductVersions(productVersions);
            product.setDeleted(false);

            FileSystem fileSystem = FileSystems.getDefault();
            String productFilespath = filepath.toString() + product.getProductId() + fileSystem.getSeparator();

            boolean contentTypecheck = false;
            try {
                if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                    if (id.isPresent() && dataFile[0].isEmpty()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        product.setDataFileName(temp.getDataFileName());
                    } else {
                        success = false;
                        alerts.setError("Please upload required files");
                    }
                } else {
                    contentTypecheck = savingDataFile(productFilespath, productVersion, product, dataFile);
                }
                boolean thumbresult = false;
                if (!(productThumbnail.isEmpty())) {
                    thumbresult = savingThumbnailfile(productFilespath, productVersion, product, productThumbnail);
                } else {
                    /*code for uploading default product image*/
                    if (id.isPresent()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        product.setProductThumbnailName(temp.getProductThumbnailName());
                    } else {
                        product.setProductThumbnailName(null);
                    }
                    thumbresult = true;
                }
                product.setEndDate(LocalDateTime.of(9999, 12, 31, 23, 59, 59));
                if (contentTypecheck == false || thumbresult == false) {
                    if (contentTypecheck == false) {
                        alerts.setError("File type restriction violated!");
                        success = false;
                    }
                    if (thumbresult == false) {
                        alerts.setError("Something went wrong while saving thumbnail file.");
                        success = false;
                    }
                } else if (!(violations.size() > 0)) {
                    product.setStatus(true);
                    productRepository.save(product);
                    success = true;
                    productVersionRepository.save(productVersion);
                    if (id.isPresent()) {
                        List<OrderDetail> orderDetails = orderDetailRepository.findAllByProductId(pathVariableEncrypt.decryptId(id.get()));
                        Order orders = new Order();
                        List<String> usersListEmailSrt = new ArrayList<>();
                        Product productData = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        for (int i = 0; i < orderDetails.size(); i++) {
                            orders = orderRepository.findAllByOrderDetailList(orderDetails.get(i));
                            User user = orders.getDaasUser();
                            usersListEmailSrt.add(user.getEmail());
                        }
                        eventPublisher.publishEvent(new ProductUpdateSuccessEvent(usersListEmailSrt, productData));
                    }
                }

            } catch (Exception e) {
                success = false;
                alerts.setError("general.error.msg");
                e.printStackTrace();
            }
        }
        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();
        model.addAttribute("success", success);
        if (!success) {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        product.setStatus(true);
        model.addAttribute("daasproduct", product);
        model.addAttribute("config", product);
        model.addAttribute("categories", productCategoryDetailList);
        model.addAttribute("productVersion", Float.parseFloat(version));
        model.addAttribute("versionName", versionName);

        System.out.println("done 6e bro...");

        return "ajax/super/publications/datacreate";

    }

    @PostMapping(value = {"/publications/datacreateUpload", "/publications/datacreateUpload/{id}"})
    public String publicationsUpload(@ModelAttribute("daasproduct") Product product, BindingResult result,
                                     @RequestParam("dataFile") MultipartFile[] dataFile,
                                     @RequestParam(value = "productThumbnail", required = false) MultipartFile productThumbnail,
                                     @RequestParam("productVersion") String version, @RequestParam("versionName") String versionName,
                                     @RequestParam("versionNote") String versionNote,
                                     @PathVariable Optional<String> id,
                                     HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        System.out.println("andar avyu...");
        if (id.isPresent()) {
            product.setId(pathVariableEncrypt.decryptId(id.get()));
        }

        Product productNew = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
        product.setProductDescription(productNew.getProductDescription());
        product.setProductPrice(productNew.getProductPrice());

        boolean success = false;
        Set<ConstraintViolation<Product>> violations = validator.validate(product);
        if (violations.size() > 0 || ((!(id.isPresent())) && dataFile[0].isEmpty()) || productNew.getProductPrice() < 1) {
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            if ((!(id.isPresent())) && dataFile[0].isEmpty()) {
                result.rejectValue("dataFileName", "", "No file has been uploaded.");
            }
            if (productNew.getProductPrice() < 1) {
                result.rejectValue("productPrice", "", "Price must be higher than 1");
            }
            success = false;
        } else {
            /*ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.valueOf(Integer.parseInt(categoryDetail)));
            product.setProductCategoryDetail(productCategoryDetail);*/
            productNew.setFile_path(productNew.getProductId());
            ProductVersion productVersion = new ProductVersion();
            productVersion.setProducts(productNew);
            productVersion.setProductVersion(Float.parseFloat(version));
            productVersion.setProductVersionName(versionName);
            productVersion.setProductVersionNote(versionNote);

            List<ProductVersion> productVersions = new ArrayList<ProductVersion>();
            productVersions.add(productVersion);
            productNew.setProductVersions(productVersions);

            FileSystem fileSystem = FileSystems.getDefault();
            String productFilespath = filepath.toString() + productNew.getProductId() + fileSystem.getSeparator();

            boolean contentTypecheck = false;
            try {
                if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                    if (id.isPresent() && dataFile[0].isEmpty()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        productNew.setDataFileName(temp.getDataFileName());
                    } else {
                        success = false;
                        alerts.setError("Please upload required files");
                    }
                } else {
                    contentTypecheck = savingDataFile(productFilespath, productVersion, productNew, dataFile);
                }
                /*boolean thumbresult = false;
                if (!(productThumbnail.isEmpty())) {
                    thumbresult = savingThumbnailfile(productFilespath, productVersion, productNew, productThumbnail);
                } else {
                    if (id.isPresent()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        productNew.setProductThumbnailName(temp.getProductThumbnailName());
                    } else {
                        productNew.setProductThumbnailName(null);
                    }
                    thumbresult = true;
                }*/
                productNew.setEndDate(LocalDateTime.of(9999, 12, 31, 23, 59, 59));
                if (contentTypecheck == false) {
                    if (contentTypecheck == false) {
                        alerts.setError("File type restriction violated!");
                        success = false;
                    }
                    /*if (thumbresult == false) {
                        alerts.setError("Something went wrong while saving thumbnail file.");
                        success = false;
                    }*/
                } else if (!(violations.size() > 0)) {
                    productRepository.save(productNew);
                    success = true;
                    productVersionRepository.save(productVersion);
                    if (id.isPresent()) {
                        List<OrderDetail> orderDetails = orderDetailRepository.findAllByProductId(pathVariableEncrypt.decryptId(id.get()));
                        Order orders = new Order();
                        List<String> usersListEmailSrt = new ArrayList<>();
                        Product productData = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        for (int i = 0; i < orderDetails.size(); i++) {
                            orders = orderRepository.findAllByOrderDetailList(orderDetails.get(i));
                            User user = orders.getDaasUser();
                            usersListEmailSrt.add(user.getEmail());
                        }
                        eventPublisher.publishEvent(new ProductUpdateSuccessEvent(usersListEmailSrt, productData));
                    }
                }

            } catch (Exception e) {
                success = false;
                alerts.setError("general.error.msg");
                e.printStackTrace();
            }
        }
        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();
        model.addAttribute("success", success);
        if (!success) {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        product.setStatus(true);
        model.addAttribute("daasproduct", productNew);
        model.addAttribute("config", productNew);
        model.addAttribute("categories", productCategoryDetailList);
        model.addAttribute("productVersion", Float.parseFloat(version));
        model.addAttribute("versionName", versionName);
        model.addAttribute("versionNote", versionNote);

        return "ajax/super/publications/datacreate-upload";

    }


    @GetMapping(value = {"/publications/apiform", "/publications/apiform/{id}"})
    public String apiForm(HttpServletRequest request, ModelMap model,
                          @PathVariable Optional<String> id) {

        System.out.println("*********************************************");

        ProductType productType = productTypeRepository.findFirstByProductTypeName("Web Service");
        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductTypeAndIsDeletedAndStatus(productType, false, true);


        try {

            Product product = new Product();
            List<ProductSlabDetail> productSlabDetailList = new ArrayList<ProductSlabDetail>();

            if (id.isPresent()) {
                product = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                ProductCategoryDetail productCategoryDetail = product.getProductCategoryDetail();
                if (productCategoryDetail != null) {
                    ProductCategory productCategory = productCategoryDetail.getProductCategory();
                }
                ProductVersion curVersion = productVersionRepository.findFirstByProductsOrderByProductVersionDesc(product);

                float ver = curVersion.getProductVersion();
                ver = Math.round((ver + 0.1f) * 10);
                ver = ver / 10;

                model.addAttribute("productVersion", ver);

            } else {
                ProductSlabDetail productSlabDetail = new ProductSlabDetail();
                productSlabDetail.setSlabLowerLimit(0);
                productSlabDetail.setSlabRate(0f);
                productSlabDetailList.add(productSlabDetail);

                ProductSlab productSlab = new ProductSlab();
                productSlab.setProductSlabDetailList(productSlabDetailList);
                product.setProductSlab(productSlab);


                model.addAttribute("productVersion", 1.0f);
            }
            model.addAttribute("daasproduct", product);
            System.out.println(product.getProductId() + "****************************");
            model.addAttribute("success", false);
        } catch (Exception e) {
            LOG.error("Error getting Data product create form", e);
        }
        model.addAttribute("categories", productCategoryDetailList);

        return "ajax/super/publications/apicreate";

/*        List<Long> categories = new ArrayList<>();
        try {
            Publications publications = new Publications();

            if (id.isPresent()) {
                publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                if (publications.getCategories() != null && publications.getCategories().size() > 0) {
                    for (PublicationsCategory cat : publications.getCategories()) {
                        categories.add(cat.getId());
                    }
                }
            }
            model.addAttribute("publications", publications);
            model.addAttribute("success", false);
        } catch (Exception e) {
            LOG.error("Error getting publication create form", e);
        }
        model.addAttribute("categories", categories);

        return "ajax/super/publications/apicreate";*/
    }


    @PostMapping(value = {"/publications/apicreate", "/publications/apicreate/{id}"})
    public String apiCreate(@ModelAttribute("daasproduct") Product product, BindingResult result,
                            @RequestParam("dataFile") MultipartFile[] dataFile,
                            @RequestParam("productThumbnail") MultipartFile productThumbnail,
                            @RequestParam("productVersion") String version,
                            @RequestParam("categories") String categoryDetail,
                            @PathVariable Optional<String> id,
                            HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        System.out.println("inside out...");
        boolean success = false;
        boolean duplicatePIDFlag = false;

        String productID = product.getProductId();
        String productName = product.getProductName();

        Product productWithDuplicatePID = productRepository.findFirstByProductIdAndIsDeleted(productID, false);
        if (productWithDuplicatePID != null && productWithDuplicatePID.getProductId().equals(productID)) {
            if (productWithDuplicatePID.getProductId().equals(productID) && productWithDuplicatePID.getProductName().equals(productName))
                duplicatePIDFlag = false;
            if (productWithDuplicatePID.getProductId().equals(productID) && (!productWithDuplicatePID.getProductName().equals(productName)))
                duplicatePIDFlag = true;
        } else {
            duplicatePIDFlag = false;
        }

        if (id.isPresent()) {
            product.setId(pathVariableEncrypt.decryptId(id.get()));
        }

        Set<ConstraintViolation<Product>> violations = validator.validate(product);
        if (violations.size() > 0 || ((!(id.isPresent())) && dataFile[0].isEmpty()) || duplicatePIDFlag) {
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            if ((!(id.isPresent())) && dataFile[0].isEmpty()) {
                result.rejectValue("dataFileName", "", "No file has been uploaded.");
            }
            if (duplicatePIDFlag) {
                result.rejectValue("productId", "", "Product ID is already present");
            }
            success = false;
        } else {

            ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.valueOf(Integer.parseInt(categoryDetail)));
            product.setProductCategoryDetail(productCategoryDetail);
            product.setFile_path(product.getProductId());
            ProductVersion productVersion = new ProductVersion();
            productVersion.setProducts(product);
            productVersion.setProductVersion(Float.parseFloat(version));


            List<ProductVersion> productVersions = new ArrayList<ProductVersion>();
            productVersions.add(productVersion);
            product.setProductVersions(productVersions);
            product.setDeleted(false);

            FileSystem fileSystem = FileSystems.getDefault();

            String productFilespath = filepath.toString() + product.getProductId() + fileSystem.getSeparator();
            Path path = Paths.get(productFilespath);
            try {

                if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                    if (id.isPresent() && dataFile[0].isEmpty()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        product.setDataFileName(temp.getDataFileName());
                    } else {
                        success = false;
                        alerts.setError("Please upload required files");
                    }
                } else {


                    if (!Files.isDirectory(path)) {
                        try {
                            Files.createDirectories(path);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    /*---------------------------------ApiDocFile--------------------------------------------*/

                    char dot = 46;
                    List<File> filesToZip = new ArrayList<File>();
                    String zipProductname = productVersion.getProductVersion() + "_" + product.getProductId() + Character.toString(dot) + "zip";
                    try {
                        product.setApiDocumentationFileName(zipProductname);

                        for (MultipartFile curdataFile : dataFile) {
                            String filename = curdataFile.getOriginalFilename();
                            byte barr[] = curdataFile.getBytes();
                            int num = 1;
                            while (Files.exists(Paths.get(path + filename))) {
                                filename = "(" + num + ")" + filename;
                            }
                            BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(path + fileSystem.getSeparator() + filename));
                            bout.write(barr);
                            bout.flush();
                            bout.close();
                            filesToZip.add(new File(path + fileSystem.getSeparator() + filename));
                        }
                        ZipFile zipFile = new ZipFile(path + fileSystem.getSeparator() + zipProductname);
                        zipFile.addFiles(filesToZip);

                    } catch (Exception e) {
                        System.out.println(e);
                    }
                }
                /*---------------------------------ThumbFile--------------------------------------------*/
                boolean thumbresult = false;
                if (!(productThumbnail.isEmpty())) {
                    thumbresult = savingThumbnailfile(productFilespath, productVersion, product, productThumbnail);
                } else {
                    if (id.isPresent()) {
                        Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                        product.setProductThumbnailName(temp.getProductThumbnailName());
                    } else {
                        product.setProductThumbnailName(null);
                    }
                    thumbresult = true;
                }
                product.setEndDate(LocalDateTime.of(9999, 12, 31, 23, 59, 59));

                if (thumbresult == false) {
                    alerts.setError("Something went wrong while saving thumbnail file.");
                    success = false;

                } else if (!(violations.size() > 0)) {
                    product.setStatus(true);
                    productRepository.save(product);
                    productVersionRepository.save(productVersion);
                    success = true;
                }
            } catch (Exception e) {
                success = false;
                alerts.setError("general.error.msg");
                e.printStackTrace();
            }
        }
        model.addAttribute("success", success);
        /*List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();*/

        ProductType productType = productTypeRepository.findFirstByProductTypeName("Web Service");
        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductTypeAndIsDeleted(productType, false);

        if (!success) {
            ProductType productTypeNew = productTypeRepository.findFirstByProductTypeName("Web Service");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductTypeAndIsDeleted(productType, false);
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", product);
        model.addAttribute("categories", productCategoryDetailList);
        model.addAttribute("productVersion", Float.parseFloat(version));

        System.out.println("done 6e bro...");

        return "ajax/super/publications/apicreate";
    }


    @PostMapping(value = {"/publications/copy/{id}"})
    @ResponseBody
    public AjaxResponse publicationsCopy(@PathVariable String id, HttpServletRequest request, ModelMap
            model, RedirectAttributes redirectAttributes) {
        AjaxResponse response = new AjaxResponse();
        try {
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            Publications publicationsNew = new Publications();
            BeanUtils.copyProperties(publications, publicationsNew);
            publicationsNew.setId(0l);
            publicationsNew.setPublicationId(publications.getPublicationId() + " - " + publications.getPublicationId() + " copy");
            publicationsNew.setPublicationTitle(publications.getPublicationTitle());
            publicationsRepository.save(publicationsNew);
            response.success("Publication copied with publication id - " + publicationsNew.getPublicationId());
        } catch (Exception e) {
            response.error("Error while copying publications");
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        return response;
    }


    @ResponseBody
    @PostMapping(value = {"/publications/status/{id}"})
    public AjaxResponse publicationsStatusChange(@PathVariable("id") String id, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            Product product = productRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (product != null) {
                product.setStatus(!product.getStatus());
                productRepository.save(product);
                response.success("Status Changed.", Arrays.asList(product.getStatus()));
            }

     /*       Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (publications != null) {
                publications.setStatus(!publications.getStatus());
                publicationsRepository.save(publications);
                response.success("Status changed", Arrays.asList(publications.getStatus()));
            }*/
        } catch (Exception e) {
            LOG.error("Error saving publication", e);
            response.error("Error saving publication");
        }
        return response;
    }


    /**
     * @param request
     * @param model
     * @param id
     * @return
     */
    @GetMapping(value = {"/notification/form", "/notification/form/{id}"})
    public String notificationForm(HttpServletRequest request, ModelMap model, @PathVariable Optional<String> id
    ) {

        Notifications notification = new Notifications();
        if (id.isPresent()) {
            notification = notificationsRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
        }
        model.addAttribute("notifications", notification);
        model.addAttribute("success", false);
        return "ajax/super/notification/create";
    }


    @ResponseBody
    @PostMapping(value = {"/notification/status/{type}/{id}"})
    public AjaxResponse notificationStatusChange(@PathVariable("id") String id, @PathVariable("type") String
            type, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            Notifications notification = notificationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (notification != null) {
                switch (type.toLowerCase()) {
                    case "e":
                        notification.setEmail(!notification.isEmail());
                        response.success("Status changed", Arrays.asList(notification.isEmail()));
                        break;
                    case "m":
                        notification.setSms(!notification.isSms());
                        response.success("Status changed", Arrays.asList(notification.isSms()));
                        break;
                    case "s":
                        notification.setStatus(!notification.getStatus());
                        response.success("Status changed", Arrays.asList(notification.getStatus()));
                        break;
                }

                notificationsRepository.save(notification);

            }
        } catch (Exception e) {
            response = new AjaxResponse();
            LOG.error("Error saving category", e);
            response.error("Error saving category");
        }
        return response;
    }


    @PostMapping(value = {"/notification/create", "/notification/create/{id}"})
    public String notificationCreate(@ModelAttribute("notifications") Notifications notifications, BindingResult
            result,
                                     @PathVariable Optional<String> id,
                                     HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {


        try {

            if (id.isPresent() && !id.get().equalsIgnoreCase("0")) {
                Notifications notificationsDb = notificationsRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                notifications.setId(notificationsDb.getId());
            }
            Set<ConstraintViolation<Notifications>> violations = validator.validate(notifications);
            if (violations.size() > 0) {
                CommonUtil.setViolations(violations, result, model, alerts);
                model.addAttribute("success", false);
            } else {
                notificationsRepository.save(notifications);
                alerts.setSuccess("notification.create.success");
                model.addAttribute("success", true);
            }
        } catch (Exception e) {
            model.addAttribute("success", false);
            alerts.setError("general.error.msg");
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("notifications", notifications);

        return "ajax/super/notification/create";
    }

    //Changes for the offer form is pending, need to create database and entity before this change
    @GetMapping(value = {"/offer/form", "/offer/form/{id}"})
    public String offerForm(HttpServletRequest request, ModelMap model,
                            @PathVariable Optional<String> id
    ) {

        ProductOffer productOffer = new ProductOffer();

        /*        PublicationsCategory publicationsCategory = new PublicationsCategory();*/

        if (id.isPresent()) {
            productOffer = productOfferRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));

            //converting LocalDateTime object to Date
            LocalDateTime startDate = productOffer.getStartDate();
            LocalDate startDateDate = startDate.toLocalDate();

            LocalDateTime endDate = productOffer.getEndDate();
            LocalDate endDateDate = endDate.toLocalDate();

            model.addAttribute("startDatePrevious", startDateDate);
            model.addAttribute("endDatePrevious", endDateDate);
            model.addAttribute("selectedProducts", productOffer.getProductSet());

            /*            publicationsCategory = publicationsCategoryRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));*/
        }

        List<Product> productList = findProductsNotInOffer();
        if (productList == null) {
            productList = new ArrayList<Product>();
        }
        model.addAttribute("productList", productList);
        model.addAttribute("productoffer", productOffer);
        model.addAttribute("success", false);

        return "ajax/super/offer/create";
    }

    private List<Product> findProductsNotInOffer() {
        System.out.println("Start...");
        ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAllByProductTypeAndIsDeletedAndStatus(productType, false, true);
        List<Product> productList = new ArrayList<>();
        List<ProductOffer> productOfferList = productOfferRepository.findAllByStatusAndEndDateAfter(true, LocalDateTime.now());
        Set<Product> productsInOffer = new HashSet<>();
        if (productOfferList != null) {

            for (ProductOffer p : productOfferList) {
                productsInOffer.addAll(p.getProductSet());
            }
        }

        for (ProductCategoryDetail p : productCategoryDetailList) {
            /*step 3 : only fetch those product that is devoid of offer*/
            List<Product> product = productRepository.findAllByProductCategoryDetailAndIsDeletedAndStatus(p, false, true);
            /*List<Product> product = productRepository.findAllByProductCategoryDetail(p);*/

            for (Product tempProduct : product) {
                if (!(productsInOffer.contains(tempProduct))) {
                    productList.add(tempProduct);
                }
            }
        }
        System.out.println("Ends...");
        if (productList.isEmpty()) {
            return null;
        } else {
            return productList;
        }
    }


/*    @PostMapping(value = {"/offer/create", "/offer/create/{id}"})
    public String offer(@ModelAttribute("productoffer") ProductOffer productOffer, BindingResult result,
                        @RequestParam("productSet") Optional<String> productList,
                        @RequestParam("offerThumbnailname") MultipartFile offerThumbnail,
                        @PathVariable Optional<String> id,
                        @RequestParam("startDate") String startDate,
                        @RequestParam("endDate") String endDate,
                        HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        Set<Product> products = new HashSet<>();
        if (id.isPresent()) {
            productOffer.setId(pathVariableEncrypt.decryptId(id.get()));
        }
        boolean success = false;
        Set<ConstraintViolation<ProductOffer>> violations = validator.validate(productOffer);
        if (violations.size() > 0 ) {
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            success = false;
        } else {

            startDate = startDate.replace("T", " ");
            endDate = endDate.replace("T", " ");
            if (id.isPresent()) {
                productOffer.setId(pathVariableEncrypt.decryptId(id.get()));
            }

            float totalPrice = 0f;



            if (productList.isPresent()) {
                List<String> idList = new ArrayList<>();
                productList.ifPresent(idList::add);
                for (String productId : idList) {
                    Product p = productRepository.findFirstById(Long.valueOf(Integer.parseInt(productId)));
                    if (p != null) {
                        products.add(p);
                    }
                    totalPrice += p.getProductPrice();
                }
            }

            productOffer.setProductSet(products);
            productOffer.setFilePath(productOffer.getOfferId());

            FileSystem fileSystem = FileSystems.getDefault();
            String offerFilespath = filepath.toString() + productOffer.getOfferId() + fileSystem.getSeparator();


            success = false;
            try {

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                productOffer.setStartDate(LocalDateTime.parse(startDate, formatter));
                productOffer.setEndDate(LocalDateTime.parse(endDate, formatter));

                if (offerThumbnail.isEmpty()) {
                    productOffer.setOfferThumbnailname(null);
                } else {

                    Path path = Paths.get(offerFilespath);
                    if (!Files.isDirectory(path)) {
                        Files.createDirectories(path);
                    }
                    *//*---------------------------------ThumbFile--------------------------------------------*//*
                    String tfilename = offerThumbnail.getOriginalFilename();

                    char dot = 46;
                    String[] ttemp = tfilename.split("\\.");
                    String ftype = ttemp[ttemp.length - 1];

                    productOffer.setOfferThumbnailname(productOffer.getOfferId() + "_thumbnail" + Character.toString(dot) + ftype);
                    try {
                        byte barr[] = offerThumbnail.getBytes();
                        BufferedOutputStream bout = new BufferedOutputStream(
                                new FileOutputStream(path + fileSystem.getSeparator() + productOffer.getOfferId() + "_thumbnail" + Character.toString(dot) + ftype));
                        bout.write(barr);
                        bout.flush();
                        bout.close();

                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                    }
                    float dicountedprice = productOffer.getDiscountedPrice();
                    float rate = 100 - (dicountedprice / totalPrice * 100);

                    productOffer.setDiscountRate(rate);
                    productOfferRepository.save(productOffer);
                    success = true;
                }

            } catch (Exception e) {
                System.out.println(e.getMessage());
                success = false;
                alerts.setError("general.error.msg");

                e.printStackTrace();
            }
        }
        model.addAttribute("success", success);
        if (!success) {
*//*
            ProductType productType = productTypeRepository.findFirstByProductTypeName("DATA");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);
*//*

        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();

        model.addAttribute("config", productOffer);
        model.addAttribute("productList", products);


        return "ajax/super/offer/create";
    }*/

    @ResponseBody
    @PostMapping(value = {"/offer/status/{id}"})
    public AjaxResponse offerStatusChange(@PathVariable("id") String id, HttpServletRequest request) {
        AjaxResponse response = new AjaxResponse();
        try {
            ProductOffer offer = productOfferRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (offer != null) {
                offer.setStatus(!offer.getStatus());
                productOfferRepository.save(offer);
                response.success("Status changed", Arrays.asList(offer.getStatus()));
            }
        } catch (Exception e) {
            LOG.error("Error saving config", e);
            response.error("Error saving config");
        }
        return response;
    }

    public boolean savingDataFile(String productFilespath, ProductVersion productVersion, Product
            product, MultipartFile[] dataFile) {
        productFilespath = productFilespath.trim().replaceAll("\\s", "");
        Path path = Paths.get(productFilespath);
        if (!Files.isDirectory(path)) {
            try {
                Files.createDirectories(path);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        Tika tika = new Tika();

        List<String> zipTypeFiles = new ArrayList<String>();

        if (dataFile.length < 1) return false;

        for (MultipartFile data : dataFile) {

            try {
                String contentType = tika.detect(data.getBytes());

                if (contentType.equalsIgnoreCase("application/zip")) {
                    zipTypeFiles.add(data.getOriginalFilename());
                }

                DataContentType dataContentType = dataContentTypeRepo.findFirstByContentTypeValue(contentType);

                if (dataContentType == null) {
                    return false;
                }

            } catch (IOException e) {
                e.printStackTrace();
            }

        }
        try {
            char dot = 46;
            List<File> filesToZip = new ArrayList<File>();
            String zipProductname = productVersion.getProductVersion() + "_" + product.getProductId() + Character.toString(dot) + "zip";
            product.setDataFileName(zipProductname);
            FileSystem fileSystem = FileSystems.getDefault();

            for (MultipartFile curdataFile : dataFile) {
                String filename = curdataFile.getOriginalFilename();
                byte barr[] = curdataFile.getBytes();
                int num = 0;
                while (Files.exists(Paths.get(path + filename))) {
                    filename = "(" + (++num) + ")" + filename;
                }

                BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(path + fileSystem.getSeparator() + filename));
                bout.write(barr);
                bout.flush();
                bout.close();
                filesToZip.add(new File(path + fileSystem.getSeparator() + filename));
            }
            ZipFile zipFile = new net.lingala.zip4j.ZipFile(path + fileSystem.getSeparator() + zipProductname);
            zipFile.addFiles(filesToZip);


            for (String filename : zipTypeFiles) {
                java.util.zip.ZipFile zipFileCheck = new java.util.zip.ZipFile(new File(path + fileSystem.getSeparator() + filename));
                Enumeration<? extends ZipEntry> entries = zipFileCheck.entries();

                while (entries.hasMoreElements()) {
                    ZipEntry zipEntry = entries.nextElement();
                    InputStream in = zipFileCheck.getInputStream(zipEntry);
                    String contentType = tika.detect(in);
                    DataContentType dataContentType = dataContentTypeRepo.findFirstByContentTypeValue(contentType);

                    if (dataContentType == null) {
                        return false;
                    }
                }
            }

        } catch (Exception e) {
            System.err.println(e.getMessage());
            e.printStackTrace();
        }
        return true;
    }

    public boolean savingThumbnailfile(String productFilespath, ProductVersion productVersion, Product
            product, MultipartFile productThumbnail) {
        Path path = Paths.get(productFilespath);
        char dot = 46;
        FileSystem fileSystem = FileSystems.getDefault();
        String tfilename = productThumbnail.getOriginalFilename();
        String[] ttemp = tfilename.split("\\.");
        String ftype = ttemp[ttemp.length - 1];
        product.setProductThumbnailName(productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype);

        if (productThumbnail.getSize() > 500000) { //500kb = 500000bytes
            return false;
        }

        try {
            byte barr[] = productThumbnail.getBytes();
            BufferedOutputStream bout = new BufferedOutputStream(
                    new FileOutputStream(path + fileSystem.getSeparator() + productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype));
            bout.write(barr);
            bout.flush();
            bout.close();

        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
        return true;
    }


/*    @PostMapping(value = {"/publications/datacreate", "/publications/datacreate/{id}"})
    public String publications123(@ModelAttribute("daasproduct") Product product, BindingResult result,
                                  @RequestParam("dataFile") MultipartFile[] dataFile,
                                  @RequestParam("productThumbnail") MultipartFile productThumbnail,
                                  @RequestParam("productVersion") String version,
                                  @RequestParam("categories") String categoryDetail,
                                  @PathVariable Optional<String> id,
                                  HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        *//*if (id.isPresent()) {

     *//**//*---------For maintaining History---------*//**//*
     *//**//*
            Product oldProduct = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
            oldProduct.setId(null);
            oldProduct.setEndDate(LocalDateTime.now());
            oldProduct.setStatus(false);
            productRepository.save(oldProduct);
*//**//*

            product.setId(pathVariableEncrypt.decryptId(id.get()));
        }
        ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.valueOf(Integer.parseInt(categoryDetail)));
        product.setProductCategoryDetail(productCategoryDetail);
        product.setFile_path(product.getProductId());


        ProductVersion productVersion = new ProductVersion();
        productVersion.setProducts(product);
        productVersion.setProductVersion(Float.parseFloat(version));


        List<ProductVersion> productVersions = new ArrayList<ProductVersion>();
        productVersions.add(productVersion);
        product.setProductVersions(productVersions);

        FileSystem fileSystem = FileSystems.getDefault();
        String productFilespath = filepath.toString() + product.getProductId() + fileSystem.getSeparator();


        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();
        boolean success = false;
        boolean contentTypecheck = false;
        try {


            if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                if (id.isPresent()) {
                    Product temp = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                    product.setDataFileName(temp.getDataFileName());
                } else {
                    success = false;
                    alerts.setError("required.fields.missing");
                    alerts.setError("Please upload required files");
                }
            } else {
                contentTypecheck = savingDataFile(productFilespath, productVersion, product, dataFile);
                Path path = Paths.get(productFilespath);
                char dot = 46;
               *//**//* if (!Files.isDirectory(path)) {
                    Files.createDirectories(path);
                }
                *//**//**//**//*---------------------------------DATAFile--------------------------------------------*//**//**//**//*


                List<File> filesToZip = new ArrayList<File>();
                String zipProductname = productVersion.getProductVersion() + "_" + product.getProductId() + Character.toString(dot) + "zip";
                try {
                    product.setDataFileName(zipProductname);

                    for (MultipartFile curdataFile : dataFile) {
                        String filename = curdataFile.getOriginalFilename();
                        byte barr[] = curdataFile.getBytes();
                        int num = 0;
                        while (Files.exists(Paths.get(path + filename))) {
                            filename = "(" + (++num) + ")" + filename;
                        }

                        BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(path + "\\" + filename));
                        bout.write(barr);
                        bout.flush();
                        bout.close();
                        filesToZip.add(new File(path + "\\" + filename));
                    }
                    ZipFile zipFile = new ZipFile(path + "\\" + zipProductname);
                    zipFile.addFiles(filesToZip);*//**//*

     *//**//*                } catch (Exception e) {
                    System.out.println(e);
                }*//**//*
     *//**//*---------------------------------ThumbFile--------------------------------------------*//**//*
                if (!(productThumbnail.isEmpty())) {
                    String tfilename = productThumbnail.getOriginalFilename();
                    String[] ttemp = tfilename.split("\\.");

                    String ftype = ttemp[ttemp.length - 1];

                    product.setProductThumbnailName(productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype);
                    try {
                        byte barr[] = productThumbnail.getBytes();
                        BufferedOutputStream bout = new BufferedOutputStream(
                                new FileOutputStream(path + fileSystem.getSeparator() + productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype));
                        bout.write(barr);
                        bout.flush();
                        bout.close();

                    } catch (Exception e) {
                        System.out.println(e);
                    }
                } else {
                    if (id.isPresent()) {
                        Product temp = productRepository.findFirstById(Long.parseLong(id.get()));
                        product.setProductThumbnailName(temp.getProductThumbnailName());
                    } else
                        product.setProductThumbnailName(null);
                }
                product.setEndDate(LocalDateTime.of(9999, 12, 31, 23, 59, 59));

                Set<ConstraintViolation<Product>> violations = validator.validate(product);

                if (violations.size() > 0) {
                    for (ConstraintViolation violation : violations) {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                        System.out.println(violation.getPropertyPath().toString() + "" + violation.getMessage());
                    }
*//**//*                    if (product.getProductPrice() < 1) {
                        result.rejectValue("productPrice", "", "The price must be higher than 0.");
                    }*//**//*
                    if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                        result.rejectValue("dataFileName", "", "No files has been uploaded.");
                    }
                    if (contentTypecheck == false) {
                        alerts.setError("File type restriction violated!");
                    }

                    success = false;
                    alerts.setError("required.fields.missing");
                } else {
                    productRepository.save(product);
                    success = true;
                    productVersionRepository.save(productVersion);
                }


                //get the list of emails of customers who have purchased this product
                *//**//*List<OrderDetail> orderDetails = orderDetailRepository.findAllByProductId(Long.valueOf(String.valueOf(id)));*//**//*
                if (id.isPresent()) {
                    List<OrderDetail> orderDetails = orderDetailRepository.findAllByProductId(pathVariableEncrypt.decryptId(id.get()));
                    Order orders = new Order();
                    List<String> usersListEmailSrt = new ArrayList<>();
                    Product productData = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));

                    for (int i = 0; i < orderDetails.size(); i++) {

                        orders = orderRepository.findAllByOrderDetailList(orderDetails.get(i));
                        User user = orders.getDaasUser();
                        usersListEmailSrt.add(user.getEmail());

                    }

                    //send mail to customers who bought this product
                    *//**//*eventPublisher.publishEvent(new OCRPurchaseSuccessEvent(daasUser, order, orderDetail, orderDetailList));*//**//*
                    eventPublisher.publishEvent(new ProductUpdateSuccessEvent(usersListEmailSrt, productData));
                }

            }

            *//**//*else {

                if (labelPublicationOriginalImage.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationOriginalImage(null);
                } else if (!labelPublicationOriginalImage.isEmpty()) {
                    String imageFileName = fileStorageService.storeFile(labelPublicationOriginalImage, "image_", environment.getProperty("publication.path.image"));
                    publications.setLabelPublicationOriginalImage(imageFileName);
                    publications.setImageName(labelPublicationOriginalImage.getOriginalFilename());
                }

                if (labelPublicationThumbnail.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationThumbnail(null);
                } else if (!labelPublicationThumbnail.isEmpty()) {
                    String thumbFileName = fileStorageService.storeFile(labelPublicationThumbnail, "thumb_", environment.getProperty("publication.path.thumb"));
                    publications.setLabelPublicationThumbnail(thumbFileName);
                    publications.setThumbnailName(labelPublicationThumbnail.getOriginalFilename());

                    String filePath = environment.getProperty("publication.path.thumb") + "/" + thumbFileName;
                    String newWidth = serviceUtil.getConfig(Constants.IMAGE_MAX_WIDTH_CONFIG, Constants.IMAGE_MAX_WIDTH_CONFIG_VAL);
                    String newHeight = serviceUtil.getConfig(Constants.IMAGE_MAX_HEIGHT_CONFIG, Constants.IMAGE_MAX_HEIGHT_CONFIG_VAL);
                    imageEditService.resizeWidthHeight(Integer.parseInt(newWidth), Integer.parseInt(newHeight), filePath, filePath);
                }

*//**//*

     *//**//*            Set<ConstraintViolation<Product>> violations=validator.validate(product);*//**//*


     *//**//*Set<ConstraintViolation<Publications>> violations = validator.validate(publications);
                if (violations.size() > 0) {
                    for (ConstraintViolation violation : violations) {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                    }
                    success = false;
                    alerts.setError("required.fields.missing");

                } else {


                    publicationsRepository.save(publications);
                    alerts.setSuccess("publication.create.success");
                    success = true;
                }*//**//*
            //}

        } catch (Exception e) {
            success = false;
            alerts.setError("general.error.msg");
            System.out.println(e.getMessage());
        }
        model.addAttribute("success", success);
        if (!success) {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("DATA");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);

*//**//*            if (publications.getCategories() != null && publications.getCategories().size() > 0) {
                for (PublicationsCategory cat : publications.getCategories()) {
                    categories.add(cat.getId());
                }
            }*//**//*
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        product.setStatus(true);
        model.addAttribute("daasproduct", product);
        model.addAttribute("config", product);
        model.addAttribute("categories", productCategoryDetailList);
        model.addAttribute("productVersion", productVersion.getProductVersion());

        return "ajax/super/publications/datacreate";*//*
    }*/


    /*    @PostMapping(value = {"/publications/apicreate", "/publications/apicreate/{id}"})
    public String apiCreate(@ModelAttribute("daasproduct") Product product, BindingResult result,
                            @RequestParam("dataFile") MultipartFile[] dataFile,
                            @RequestParam("productThumbnail") MultipartFile productThumbnail,
                            @RequestParam("productVersion") String version,
                            @RequestParam("categories") String categoryDetail,
                            @PathVariable Optional<String> id,
                            HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {


        if (id.isPresent()) {

            *//*---------For maintaining History---------*//*
     *//*
            Product oldProduct = productRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
            oldProduct.setId(null);
            oldProduct.setEndDate(LocalDateTime.now());
            oldProduct.setStatus(false);
            productRepository.save(oldProduct);
*//*

            product.setId(pathVariableEncrypt.decryptId(id.get()));
        }

        ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.valueOf(Integer.parseInt(categoryDetail)));
        product.setProductCategoryDetail(productCategoryDetail);
        product.setFile_path(product.getProductId());


        ProductVersion productVersion = new ProductVersion();
        productVersion.setProducts(product);
        productVersion.setProductVersion(Float.parseFloat(version));


        List<ProductVersion> productVersions = new ArrayList<ProductVersion>();
        productVersions.add(productVersion);
        product.setProductVersions(productVersions);

        FileSystem fileSystem = FileSystems.getDefault();

        String productFilespath = filepath.toString() + product.getProductId() + fileSystem.getSeparator();


        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<ProductCategoryDetail>();
        boolean success = false;
        try {

            if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                success = false;
                alerts.setError("required.fields.missing");
                alerts.setError("Please upload required files");
            } else {

                Path path = Paths.get(productFilespath);
                if (!Files.isDirectory(path)) {
                    Files.createDirectories(path);
                }
                *//*---------------------------------ApiDocFile--------------------------------------------*//*

                char dot = 46;
                List<File> filesToZip = new ArrayList<File>();
                String zipProductname = productVersion.getProductVersion() + "_" + product.getProductId() + Character.toString(dot) + "zip";
                try {
                    product.setApiDocumentationFileName(zipProductname);

                    for (MultipartFile curdataFile : dataFile) {
                        String filename = curdataFile.getOriginalFilename();
                        byte barr[] = curdataFile.getBytes();
                        int num = 1;
                        while (Files.exists(Paths.get(path + filename))) {
                            filename = "(" + num + ")" + filename;
                        }
                        BufferedOutputStream bout = new BufferedOutputStream(new FileOutputStream(path + fileSystem.getSeparator() + filename));
                        bout.write(barr);
                        bout.flush();
                        bout.close();
                        filesToZip.add(new File(path + fileSystem.getSeparator() + filename));
                    }
                    ZipFile zipFile = new ZipFile(path + fileSystem.getSeparator() + zipProductname);
                    zipFile.addFiles(filesToZip);

                } catch (Exception e) {
                    System.out.println(e);
                }
                *//*---------------------------------ThumbFile--------------------------------------------*//*
                if (!(productThumbnail.isEmpty())) {
                    String tfilename = productThumbnail.getOriginalFilename();
                    String[] ttemp = tfilename.split("\\.");

                    String ftype = ttemp[ttemp.length - 1];
                    product.setProductThumbnailName(productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype);
                    try {
                        byte barr[] = productThumbnail.getBytes();
                        BufferedOutputStream bout = new BufferedOutputStream(
                                new FileOutputStream(path + fileSystem.getSeparator() + productVersion.getProductVersion() + "_" + product.getProductId() + "_thumbnail" + Character.toString(dot) + ftype));
                        bout.write(barr);
                        bout.flush();
                        bout.close();

                    } catch (Exception e) {
                        System.out.println(e);
                    }
                } else {
                    product.setProductThumbnailName(null);
                }

                ProductSlab productSlab = product.getProductSlab();

                product.setEndDate(LocalDateTime.of(9999, 12, 31, 23, 59, 59));

                Set<ConstraintViolation<Product>> violations = validator.validate(product);

                if (violations.size() > 0) {
                    for (ConstraintViolation violation : violations) {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                        System.out.println(violation.getPropertyPath().toString() + "" + violation.getMessage());
                    }
                    if (dataFile.length == 0 || dataFile[0].isEmpty()) {
                        result.rejectValue("dataFileName", "", "No files has been uploaded.");
                    }
                    success = false;
                    alerts.setError("required.fields.missing");
                } else {


                    productRepository.save(product);
                    productVersionRepository.save(productVersion);
                    success = true;
                }


            }
        *//*
        List<Long> categories = new ArrayList<>();

        try {


            if (id.isPresent() && !id.get().equalsIgnoreCase("0")) {
                Publications publicationsDb = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                publications.setId(publicationsDb.getId());
                publications.setLabelPublicationThumbnail(publicationsDb.getLabelPublicationThumbnail());
                publications.setLabelPublicationUploadDoc(publicationsDb.getLabelPublicationUploadDoc());
                publications.setLabelPublicationUploadToc(publicationsDb.getLabelPublicationUploadToc());
                publications.setLabelPublicationOriginalImage(publicationsDb.getLabelPublicationOriginalImage());
            }

            if (labelPublicationOriginalImage == null || labelPublicationThumbnail == null || uploadDocfile == null || uploadTocFile == null) {
                success = false;
                alerts.setError("required.fields.missing");
                alerts.setError("Please upload required files");
            } else {


                if (labelPublicationOriginalImage.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationOriginalImage(null);
                } else if (!labelPublicationOriginalImage.isEmpty()) {
                    String imageFileName = fileStorageService.storeFile(labelPublicationOriginalImage, "image_", environment.getProperty("publication.path.image"));
                    publications.setLabelPublicationOriginalImage(imageFileName);
                    publications.setImageName(labelPublicationOriginalImage.getOriginalFilename());
                }

                if (labelPublicationThumbnail.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationThumbnail(null);
                } else if (!labelPublicationThumbnail.isEmpty()) {
                    String thumbFileName = fileStorageService.storeFile(labelPublicationThumbnail, "thumb_", environment.getProperty("publication.path.thumb"));
                    publications.setLabelPublicationThumbnail(thumbFileName);
                    publications.setThumbnailName(labelPublicationThumbnail.getOriginalFilename());

                    String filePath = environment.getProperty("publication.path.thumb") + "/" + thumbFileName;
                    String newWidth = serviceUtil.getConfig(Constants.IMAGE_MAX_WIDTH_CONFIG, Constants.IMAGE_MAX_WIDTH_CONFIG_VAL);
                    String newHeight = serviceUtil.getConfig(Constants.IMAGE_MAX_HEIGHT_CONFIG, Constants.IMAGE_MAX_HEIGHT_CONFIG_VAL);
                    imageEditService.resizeWidthHeight(Integer.parseInt(newWidth), Integer.parseInt(newHeight), filePath, filePath);
                }


                if (uploadTocFile.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationUploadToc(null);
                } else if (!uploadTocFile.isEmpty()) {
                    String tocFileName = fileStorageService.storeFile(uploadTocFile, "toc_", environment.getProperty("publication.path.toc"));
                    publications.setTocName(uploadTocFile.getOriginalFilename());
                    publications.setLabelPublicationUploadToc(tocFileName);
                }


                if (uploadDocfile.isEmpty() && !id.isPresent()) {
                    publications.setLabelPublicationUploadDoc(null);
                } else if (!uploadDocfile.isEmpty()) {
                    String docFileName = fileStorageService.storeFile(uploadDocfile, "doc_", environment.getProperty("publication.path.doc"));
                    publications.setDocName(uploadDocfile.getOriginalFilename());
                    publications.setLabelPublicationUploadDoc(docFileName);
                }


                Set<ConstraintViolation<Publications>> violations = validator.validate(publications);
                if (violations.size() > 0) {
                    for (ConstraintViolation violation : violations) {
                        result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                    }
                    success = false;
                    alerts.setError("required.fields.missing");

                } else {


                    publicationsRepository.save(publications);
                    alerts.setSuccess("publication.create.success");
                    success = true;
                }
            }

        } catch (Exception e) {
            success = false;
            alerts.setError("general.error.msg");
        }
        model.addAttribute("success", success);
        if (!success) {
            if (publications.getCategories() != null && publications.getCategories().size() > 0) {
                for (PublicationsCategory cat : publications.getCategories()) {
                    categories.add(cat.getId());
                }
            }
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", publications);
        model.addAttribute("categories", categories);
*//*
        } catch (Exception e) {
            System.out.println(e.getMessage() + "**********************************");
            success = false;
            alerts.setError("general.error.msg");
        }
        model.addAttribute("success", success);
        if (!success) {
            ProductType productType = productTypeRepository.findFirstByProductTypeName("DATA");
            productCategoryDetailList = productCategoryDetailRepository.findAllByProductType(productType);

*//*            if (publications.getCategories() != null && publications.getCategories().size() > 0) {
                for (PublicationsCategory cat : publications.getCategories()) {
                    categories.add(cat.getId());
                }
            }*//*
        }
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", product);
        model.addAttribute("categories", productCategoryDetailList);
        model.addAttribute("productVersion", productVersion.getProductVersion());

        return "ajax/super/publications/apicreate";
    }*/

    /*offer ni post method*/
    @PostMapping(value = {"/offer/create", "/offer/create/{id}"})
    public String offer(@ModelAttribute("productoffer") ProductOffer productOffer, BindingResult result,
                        @RequestParam("productSet") Optional<String> productList,
                        @RequestParam("offerThumbnailname") MultipartFile offerThumbnail,
                        @PathVariable Optional<String> id,
                        @RequestParam("startDate") Optional<String> openDate,
                        @RequestParam("endDate") String closeDate,
                        HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        System.out.println("inside out...");
        boolean duplicatePIDFlag = false;

        String offerID = productOffer.getOfferId();
        String offerName = productOffer.getOfferName();

        ProductOffer productWithDuplicatePID = productOfferRepository.findFirstByOfferIdAndIsDeleted(offerID, false);
        if (productWithDuplicatePID != null && productWithDuplicatePID.getOfferId().equals(offerID)) {
            if(productWithDuplicatePID.getOfferId().equals(offerID) && productWithDuplicatePID.getOfferName().equals(offerName))
                duplicatePIDFlag = false;
            if(productWithDuplicatePID.getOfferId().equals(offerID) && (!productWithDuplicatePID.getOfferName().equals(offerName)))
                duplicatePIDFlag = true;
        } else {
            duplicatePIDFlag = false;
        }

        Set<Product> products = new HashSet<>();
        List<Product> productsNotInOffer = null;

        String openDateStr = null;
        String closeDateStr = null;
        //to get only date from the admin side here, concatenating the string with time
        if (openDate.isPresent() && !closeDate.equals("")) {
            openDateStr = openDate.get() + "T00:00";
            closeDateStr = closeDate + "T00:00";
        }
        if (openDate.isPresent() && closeDate.equals("")) {
            openDateStr = openDate.get() + "T00:00";
            closeDateStr = "9999-12-31T00:00";
        }

        if (id.isPresent()) {
            productOffer.setId(pathVariableEncrypt.decryptId(id.get()));
        }
        boolean success = false;
        Set<ConstraintViolation<ProductOffer>> violations = validator.validate(productOffer);
        if (violations.size() > 0 || (!(productList.isPresent())) || (!(openDate.isPresent()))
                || (openDate.get().equals("")) || duplicatePIDFlag) {
            for (ConstraintViolation violation : violations) {
                result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
            }
            if ((!(productList.isPresent()))) {
                result.rejectValue("productSet", "", "No products has been chosen for offer.");
            }
            if ((!(openDate.isPresent())) || (openDate.get().equals(""))) {
                result.rejectValue("startDate", "", "This field can't be empty.");
            }
            if (duplicatePIDFlag) {
                result.rejectValue("offerId", "", "OfferId ID is already present");
            }
            /*if ((!(closeDate.isPresent())) || (closeDate.get().equals(""))) {
                result.rejectValue("endDate", "", "This field can't be empty.");
            }*/
            productsNotInOffer = findProductsNotInOffer();
            if (productsNotInOffer == null) {
                productsNotInOffer = new ArrayList<Product>();
            }

            success = false;
        } else {

            String startDate = openDateStr.replace("T", " ");
            String endDate = closeDateStr.replace("T", " ");
            if (id.isPresent()) {
                productOffer.setId(pathVariableEncrypt.decryptId(id.get()));
            }

            float totalPrice = 0f;

            if (productList.isPresent()) {


                List<String> idList = new ArrayList<>();
                idList.addAll(Arrays.asList(productList.get().split(",")));

                for (String productId : idList) {
                    System.out.println(productId);
                    Product p = productRepository.findFirstById(Long.parseLong(productId));

                    if (p != null) {
                        products.add(p);
                    }
                    totalPrice += p.getProductPrice();
                }
            }

            productOffer.setProductSet(products);
            productOffer.setFilePath(productOffer.getOfferId());

            FileSystem fileSystem = FileSystems.getDefault();
            String offerFilespath = filepath.toString() + productOffer.getOfferId() + fileSystem.getSeparator();


            success = false;
            try {

                /*
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
                productOffer.setStartDate(LocalDateTime.parse(startDate, formatter));
                productOffer.setEndDate(LocalDateTime.parse(endDate, formatter));
                */

                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

                LocalDateTime LDTStartDate = LocalDateTime.parse(startDate, formatter);
                LocalDateTime LDTEndDate = LocalDateTime.parse(endDate, formatter);

                if (LDTEndDate.isBefore(LDTStartDate)) {
                    result.rejectValue("endDate", "", "End Date can't be before Start Date");
                    success = false;
                } else {
                    productOffer.setStartDate(LDTStartDate);
                    productOffer.setEndDate(LDTEndDate);
                }

                System.out.println("product thumbnail check...");
                if (offerThumbnail.isEmpty()) {
                    productOffer.setOfferThumbnailname(null);
                    if (LDTEndDate.isBefore(LDTStartDate))
                        success = false;
                    else
                        success = true;
                } else {

                    Path path = Paths.get(offerFilespath);
                    if (!Files.isDirectory(path)) {
                        Files.createDirectories(path);
                    }
                    /*---------------------------------ThumbFile--------------------------------------------*/
                    String tfilename = offerThumbnail.getOriginalFilename();

                    char dot = 46;
                    String[] ttemp = tfilename.split("\\.");
                    String ftype = ttemp[ttemp.length - 1];

                    productOffer.setOfferThumbnailname(productOffer.getOfferId() + "_thumbnail" + Character.toString(dot) + ftype);


                    try {

                        if (offerThumbnail.getSize() > 500000) {
                            success = false;
                            throw new Exception("thumbnail size can not exceed 500 kb");
                        }

                        byte barr[] = offerThumbnail.getBytes();
                        BufferedOutputStream bout = new BufferedOutputStream(
                                new FileOutputStream(path + fileSystem.getSeparator() + productOffer.getOfferId() + "_thumbnail" + Character.toString(dot) + ftype));
                        bout.write(barr);
                        bout.flush();
                        bout.close();

                        success = true;

                    } catch (Exception e) {
                        System.out.println(e.getMessage());
                        alerts.setError("thumbnail size can not exceed 500 kb");
                    }

                }

            } catch (Exception e) {
                System.out.println(e.getMessage());
                success = false;
                alerts.setError("general.error.msg");

                e.printStackTrace();
            }


            if (!success == false) {
                float dicountedprice = productOffer.getDiscountedPrice();
                float rate = 100 - (dicountedprice / totalPrice * 100);
                productOffer.setDiscountRate(rate);
                productOffer.setDeleted(false);
                productOffer.setStatus(true);
                productOfferRepository.save(productOffer);
            }

            /*success = true;*/
        }
        model.addAttribute("success", success);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("config", productOffer);
        model.addAttribute("productList", productsNotInOffer);

        System.out.println("done 6e bro...");

        return "ajax/super/offer/create";
    }
}