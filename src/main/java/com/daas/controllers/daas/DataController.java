package com.daas.controllers.daas;

import com.daas.DTO.ProductSearchDTO;
import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.entities.DaaS.*;
import com.daas.entities.user.User;
import com.daas.repositories.daas.*;
import com.daas.services.DataTestService;
import com.daas.services.file.FileStorageService;
import com.daas.specification.OfferSpecification;
import com.daas.specification.ProductSearchCriteria;
import com.daas.specification.ProductSpecification;
import com.daas.utilities.session.UserUtil;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.cglib.core.Local;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Controller
@RequestMapping("/daas")
public class DataController {

    @Autowired
    private DataTestService dataTestService;

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private Environment environment;

    @Value("${daas.filepath}")
    private String filepath;


    @GetMapping(value = {"offers"})
    public String availableOffers(@PageableDefault(page = 0, size = 50, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
                                  Model model,
                                  @RequestParam("productName") Optional<String> productName,
                                  @RequestParam("minPrice") Optional<String> minPrice,
                                  @RequestParam("maxPrice") Optional<String> maxPrice,
                                  @RequestParam("timeAdded") Optional<String> timeAdded,
                                  @RequestParam("sortOfferBy") Optional<String> sortby) {

        String BaseUrl = "/daas/offers";


        List<ProductOffer> availableOffers = null;
        if (productName.isPresent()) {
            BaseUrl = BaseUrl + "?productName=" + productName.get();
            OfferSpecification spec1 = new OfferSpecification(new ProductSearchCriteria("offerName", ":", productName.get()));
            OfferSpecification spec2 = new OfferSpecification(new ProductSearchCriteria("offerDescription", ":", productName.get()));
            List<ProductOffer> tempOffers = productOfferRepository.findAll(Specification.where(spec1).or(spec2));
            availableOffers = new ArrayList<>();
            for (ProductOffer o : tempOffers) {
                if (o.getStatus() == true && o.getEndDate().isAfter(LocalDateTime.now())) {
                    availableOffers.add(o);
                }
            }
        } else {
            availableOffers = productOfferRepository.findAllByStatusAndEndDateAfter(true, LocalDateTime.now());
        }

        LocalDateTime timeFilter = LocalDateTime.now();
        if (timeAdded.isPresent()) {
            timeFilter = setTimeFilter(timeAdded, BaseUrl);
            BaseUrl = BaseUrl + "?timeAdded=" + timeAdded.get();
            List<ProductOffer> removeOffers = new ArrayList<>();

            for (ProductOffer o : availableOffers) {
                if (!(o.getCreatedAt().isAfter(timeFilter))) {
                    removeOffers.add(o);
                }
            }
            availableOffers.removeAll(removeOffers);
        }

        if (minPrice.isPresent() && maxPrice.isPresent()) {
            List<ProductOffer> removeOffers = new ArrayList<>();
            float minOfferPrice = Float.parseFloat(minPrice.get());
            float maxOfferPrice = Float.parseFloat(maxPrice.get());
            for (ProductOffer o : availableOffers) {
                if (o.getDiscountedPrice() < minOfferPrice || o.getDiscountedPrice() > maxOfferPrice){
                    removeOffers.add(o);
                }
            }
            availableOffers.removeAll(removeOffers);
        }

        List<ProductOffer> pageOfferList = new ArrayList<>();
        if (sortby.isPresent()) {
            BaseUrl = BaseUrl + "?sortOfferBy=" + sortby.get();
            pageOfferList = findOfferSortOrder(sortby, availableOffers);
            model.addAttribute("sortOrder", sortby.get()+"");
        } else {
            pageOfferList = availableOffers;
            Collections.sort(pageOfferList, Comparator.comparing(ProductOffer::getCreatedAt));
        }

        if (pageOfferList == null) {
            pageOfferList = new ArrayList<>();
        }

        ProductSearchDTO productSearchDTO = new ProductSearchDTO();
        ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> productCategories = productCategoryDetailRepository.findAllByProductType(productType);


        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > pageOfferList.size() ? pageOfferList.size() : (start + pageable.getPageSize());
        Page<ProductOffer> productofferPage = new PageImpl<ProductOffer>(pageOfferList.subList(start, end), pageable, pageOfferList.size());


        int totalPages = productofferPage.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }

        model.addAttribute("productoffer", productofferPage);
        model.addAttribute("pagingUrl", BaseUrl);
        model.addAttribute("datacategories", productCategories);
        model.addAttribute("productSearch", productSearchDTO);

        return "shop-list-wls-offer";
    }

    /*    @Transactional*/
    @RequestMapping(value = {"/Data", "/Data/{category}"})
    public String listDaasData(@PageableDefault(page = 0, size = 50) Pageable pageable,
                               Model model, @PathVariable Optional<String> category,
                               @RequestParam("productName") Optional<String> productName,
                               @RequestParam("minPrice") Optional<String> minPrice,
                               @RequestParam("maxPrice") Optional<String> maxPrice,
                               @RequestParam("timeAdded") Optional<String> timeAdded,
                               @RequestParam("sortProductBy") Optional<String> sortby) {
        String BaseUrl = "/daas/Data";

        ProductSearchDTO productSearchDTO = new ProductSearchDTO();
        ProductType productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        List<ProductCategoryDetail> productCategories = productCategoryDetailRepository.findAllByProductTypeAndStatusIsTrue(productType);

        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<>();
        if (category.isPresent() && (!(category.get().equalsIgnoreCase("all")))) {
            productCategoryDetailList.add(productCategoryDetailRepository.findFirstById(Long.parseLong(category.get())));
            BaseUrl = BaseUrl + "/" + category.get();

        } else {
            productCategoryDetailList.addAll(productCategoryDetailRepository.findAllByProductType(productType));
            BaseUrl = BaseUrl + "/all";
        }

        int flag = 0;

        if (productName.isPresent()) {
            BaseUrl = BaseUrl + "?productName=" + productName.get();
            flag++;
        }
        LocalDateTime timeFilter = null;
        if (timeAdded.isPresent()) {
            BaseUrl = BaseUrl + "?timeAdded=" + timeAdded.get();
            timeFilter = setTimeFilter(timeAdded, BaseUrl);
        }

        float minAmount = 0;
        float maxAmount = 1000000;
        if (minPrice.isPresent() && maxPrice.isPresent()) {
            minAmount = Float.parseFloat(minPrice.get());
            maxAmount = Float.parseFloat(maxPrice.get());
            BaseUrl = BaseUrl + "?minPrice=" + minAmount + "&maxPrice=" + maxAmount;

            productSearchDTO.setMinPrice(minAmount);
            productSearchDTO.setMaxPrice(maxAmount);
        }


        List<Product> productList = new ArrayList<Product>();
        for (ProductCategoryDetail p : productCategoryDetailList) {
            List<Product> product = new ArrayList<>();

            if (productName.isPresent()) {
                ProductSpecification spec1 = new ProductSpecification(new ProductSearchCriteria("productName", ":", productName.get()));
                ProductSpecification spec2 = new ProductSpecification(new ProductSearchCriteria("productDescription", ":", productName.get()));
                ProductSpecification spec3 = new ProductSpecification(new ProductSearchCriteria("productCategoryDetail", ":", p.getId()));
                product = productRepository.findAll(Specification.where(spec1).or(spec2).and(spec3));
            } else {
                product = productRepository.findAllByProductCategoryDetailAndStatus(p, true);
            }

            List<Product> removeProducts = new ArrayList<>();
            if (minPrice.isPresent() && maxPrice.isPresent()) {
                for (Product tempProduct : product) {
                    if (!(tempProduct.getProductPrice() > minAmount && tempProduct.getProductPrice() < maxAmount)) {
                        removeProducts.add(tempProduct);
                    }
                }
            }
            if (!(removeProducts.isEmpty())) {
                product.removeAll(removeProducts);
            }
            removeProducts = new ArrayList<>();
            if (timeAdded.isPresent()) {
                for (Product tempProduct : product) {
                    if (!(tempProduct.getCreatedAt().isAfter(timeFilter))) {
                        removeProducts.add(tempProduct);
                    }
                }

            }

            if (!(removeProducts.isEmpty())) {
                product.removeAll(removeProducts);
            }

            if (!(product.isEmpty())) {
                productList.addAll(product);
            }

        }

        List<Product> pageProductList = new ArrayList<>();
        Sort sortOrder = null;
        if (sortby.isPresent()) {
            BaseUrl = BaseUrl + "?sortProductBy=" + sortby.get();
            pageProductList = findSortOrder(sortby, productList);
            model.addAttribute("sortOrder", sortby.get()+"");
        } else {
            pageProductList = productList;
            Collections.sort(pageProductList, Comparator.comparing(Product::getCreatedAt));
        }


        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > pageProductList.size() ? pageProductList.size() : (start + pageable.getPageSize());

        Page<Product> productPage = new PageImpl<Product>(pageProductList.subList(start, end), pageable, pageProductList.size());

        int totalPages = productPage.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }

        model.addAttribute("daasDatas", productPage);
        /*model.addAttribute("daasDatas", productList);*/
        model.addAttribute("datacategories", productCategories);

        model.addAttribute("productSearch", productSearchDTO);
        model.addAttribute("pagingUrl", BaseUrl);
        /*model.addAttribute("categoryId", category.get());*/


        //for all
        if(category.isPresent()){
            model.addAttribute("highlightAttId","all");
        }

        //for highlighting the text
        if(category.isPresent()){
            model.addAttribute("highlightAttId",category.get()+"");
        }

        return "shop-list-wls-data1";
    }

    @GetMapping(value = {"/downloadFile/{productId}/{fileName:.+}"})
    public ResponseEntity<Resource> downloadFile(@PathVariable String productId, @PathVariable String fileName, HttpServletRequest request) {
        // Load file as Resource
        Resource resource = fileStorageService.loadFileAsResource(productId + File.separator + fileName, environment.getProperty("daas.filepath"));


        // Try to determine file's content type
        String contentType = null;
        try {
            ServletContext context = request.getSession().getServletContext();
            contentType = context.getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            //logger.info("Could not determine file type.");
        }

        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @RequestMapping("/Cat")
    public String listCategory(Model model) {
        List<DataTest> daasList = dataTestService.findAll();
        System.out.println(daasList.get(0).getDescription());

        List<ProductCategoryDetail> productCategoryDetailList = productCategoryDetailRepository.findAll();
        for (ProductCategoryDetail categoryDetail : productCategoryDetailList) {
            System.out.println(categoryDetail.getId() + "|*****|" + categoryDetail.getProductCategory().toString() + "|*****|" + categoryDetail.getProductType().toString());
        }
        return "shop-list-wls-data";
    }

    @RequestMapping(value = {"/api-as-service", "/api-as-service/{category}"})
    public String listDaasapi(@PageableDefault(page = 0, size = 50) Pageable pageable
            , Model model, @PathVariable Optional<String> category,
                              @RequestParam("timeAdded") Optional<String> timeAdded,
                              @RequestParam("productName") Optional<String> productName,
                              @RequestParam("sortProductBy") Optional<String> sortby) {
        String BaseUrl = "/daas/api-as-service";


        ProductType productType = productTypeRepository.findFirstByProductTypeName("Web Service");
        List<ProductCategoryDetail> productCategories = productCategoryDetailRepository.findAllByProductType(productType);


        List<ProductCategoryDetail> productCategoryDetailList = new ArrayList<>();
        if (category.isPresent() && (!(category.get().equalsIgnoreCase("all")))) {
            productCategoryDetailList.add(productCategoryDetailRepository.findFirstById(Long.parseLong(category.get())));
            model.addAttribute("pagingUrl", BaseUrl + "/" + category.get());
        } else {
            productCategoryDetailList.addAll(productCategoryDetailRepository.findAllByProductType(productType));
            model.addAttribute("pagingUrl", BaseUrl + "/all");
        }

        LocalDateTime timeFilter = LocalDateTime.now();
        if (timeAdded.isPresent()) {
            timeFilter = setTimeFilter(timeAdded, BaseUrl);
            BaseUrl = BaseUrl + "?timeAdded=" + timeAdded.get();
        }


        List<Product> productList = new ArrayList<Product>();
        for (ProductCategoryDetail p : productCategoryDetailList) {
            List<Product> product = new ArrayList<Product>();
            if (productName.isPresent()) {
                ProductSpecification spec1 = new ProductSpecification(new ProductSearchCriteria("productName", ":", productName.get()));
                ProductSpecification spec2 = new ProductSpecification(new ProductSearchCriteria("productDescription", ":", productName.get()));
                ProductSpecification spec3 = new ProductSpecification(new ProductSearchCriteria("productCategoryDetail", ":", p.getId()));
                product = productRepository.findAll(Specification.where(spec1).or(spec2).and(spec3));
            } else {
                product = productRepository.findAllByProductCategoryDetailAndStatus(p, true);
            }

            List<Product> removeProducts = new ArrayList<>();
            if (timeAdded.isPresent()) {
                for (Product tempProduct : product) {
                    if (!(tempProduct.getCreatedAt().isAfter(timeFilter))) {
                        removeProducts.add(tempProduct);
                    }
                }

            }

            if (!(removeProducts.isEmpty())) {
                product.removeAll(removeProducts);
            }

            if (!(product.isEmpty())) {
                productList.addAll(product);
            }
        }

        List<Product> pageProductList = new ArrayList<>();
        Sort sortOrder = null;
        if (sortby.isPresent()) {
            BaseUrl = BaseUrl + "?sortProductBy=" + sortby.get();
            pageProductList = findSortOrder(sortby, productList);
        } else {
            pageProductList = productList;
            Collections.sort(pageProductList, Comparator.comparing(Product::getCreatedAt));
        }

        int start = (int) pageable.getOffset();
        int end = (start + pageable.getPageSize()) > pageProductList.size() ? pageProductList.size() : (start + pageable.getPageSize());
        Page<Product> productPage = new PageImpl<Product>(pageProductList.subList(start, end), pageable, pageProductList.size());

        int totalPages = productPage.getTotalPages();
        if (totalPages > 0) {
            List<Integer> pageNumbers = IntStream.rangeClosed(1, totalPages)
                    .boxed()
                    .collect(Collectors.toList());
            model.addAttribute("pageNumbers", pageNumbers);
        }
        model.addAttribute("daasapilist", productPage);

        /*        model.addAttribute("daasapilist", productList);*/
        model.addAttribute("addApitoCart", new CartDetail());

        model.addAttribute("apicategories", productCategories);
        model.addAttribute("productSearch", new ProductSearchDTO());

        //for all
        if(category.isPresent()){
            model.addAttribute("highlightAttId","all");
        }

        //for highlighting the text
        if(category.isPresent()){
            model.addAttribute("highlightAttId",category.get()+"");
        }


        return "shop-list-wls-api1";
    }

    private LocalDateTime setTimeFilter(Optional<String> timeAdded, String BaseUrl) {
        LocalDateTime timeFilter = LocalDateTime.now();
        switch (timeAdded.get()) {
            case "week":
                timeFilter = timeFilter.minusDays(7);
                break;
            case "month":
                timeFilter = timeFilter.minusMonths(1);
                break;
            case "year":
                timeFilter = timeFilter.minusYears(1);
                break;
            default:
                timeFilter = timeFilter.minusYears(50);
                break;
        }
        return timeFilter;
    }

    private List<Product> findSortOrder(Optional<String> sortby, List<Product> productList) {
        Sort sortOrder = null;
        switch (sortby.get()) {
            case "productPriceAsc":
                Collections.sort(productList, Comparator.comparing(Product::getProductPrice));
                break;
            case "productPriceDesc":
                Collections.sort(productList, Comparator.comparing(Product::getProductPrice).reversed());
                break;
            case "createdAt":
                Collections.sort(productList, Comparator.comparing(Product::getCreatedAt).reversed());
                break;
            case "updatedAt":
                Collections.sort(productList, Comparator.comparing(Product::getUpdatedAt).reversed());
                break;
            case "none":
                Collections.sort(productList, Comparator.comparing(Product::getCreatedAt).reversed());
                break;
            default:
                Collections.sort(productList, Comparator.comparing(Product::getCreatedAt).reversed());
                break;
        }
        return productList;
    }

    private List<ProductOffer> findOfferSortOrder(Optional<String> sortby, List<ProductOffer> offerList) {
        Sort sortOrder = null;
        switch (sortby.get()) {
            case "productPriceAsc":
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getDiscountedPrice));
                break;
            case "productPriceDesc":
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getDiscountedPrice).reversed());
                break;
            case "createdAt":
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getCreatedAt).reversed());
                break;
            case "updatedAt":
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getUpdatedAt).reversed());
                break;
            case "none":
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getCreatedAt).reversed());
                break;
            default:
                Collections.sort(offerList, Comparator.comparing(ProductOffer::getCreatedAt).reversed());
                break;
        }
        return offerList;
    }


    @RequestMapping(value = "/downloadRequest/{productId}", method = RequestMethod.GET)
    public void downloadfile(Model model, @PathVariable Long productId, HttpServletResponse response) {

        Product product = productRepository.findFirstById(productId);

        ProductCategoryDetail categoryDetail = product.getProductCategoryDetail();

        ProductType productType = categoryDetail.getProductType();

        if (productType.getProductTypeName().equalsIgnoreCase("Web Service")) {

            FileSystem fileSystem = FileSystems.getDefault();


            try {
                Path path = Paths.get(filepath + product.getProductId() + fileSystem.getSeparator() + product.getApiDocumentationFileName());

                if (Files.exists(path)) {
                    File file = path.toFile();
                    Tika tika = new Tika();
                    response.setContentType(tika.detect(file));
                    String headerkey = "Content-Disposition";
                    String filename = product.getApiDocumentationFileName();
                    String headerValue = String.format("attachment; filename=\"%s\"", filename);
                    response.setHeader(headerkey, headerValue);

                    FileInputStream inputStream;
                    try {
                        inputStream = new FileInputStream(path.toString());
                        try {
                            int c;
                            while ((c = inputStream.read()) != -1) {
                                response.getWriter().write(c);
                            }
                        } finally {
                            if (inputStream != null)
                                try {
                                    inputStream.close();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            response.getWriter().close();
                        }
                    } catch (IOException e) {
                        e.printStackTrace();

                    }

                }

            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        /*  return null;*/
    }

    @Transactional
    @GetMapping(value = {"/delcat/{categoryId}"})
    public String categoryDelete(Model model, @PathVariable String categoryId, HttpServletResponse response){

        System.out.println("delete thase...");
        System.out.println(categoryId);
        /*productCategoryRepository.deleteById(pathVariableEncrypt.decryptId(categoryId));*/
        productCategoryDetailRepository.deleteById(pathVariableEncrypt.decryptId(categoryId));

        return "redirect:/admin/category/list";

    }

}