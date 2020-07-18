package com.daas.controllers.daas;

import com.daas.controllers.AbstractBaseController;
import com.daas.entities.DaaS.*;
import com.daas.repositories.daas.*;
import com.daas.utilities.session.UserUtil;
import com.daas.entities.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Controller
public class CartController extends AbstractBaseController {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @RequestMapping("/listShoppingCart")
    /*    @Transactional*/
    public String listShoppingCart(Model model, HttpServletResponse httpResponse) throws IOException {


        User daasUser = userUtil.getCurrentUser();
        /*User daasUser = daasUserRepository.findById(1L).get();*/
        Cart cart = cartRepository.findByDaasUser(daasUser);
        /*List<Product> productList = cart.getProductList();*/
        List<CartDetail> cartDetails = cart.getCartDetails();


        /*        System.out.println(productList);*/
        model.addAttribute("productListOnUsersCart", cartDetails);
        /*httpResponse.sendRedirect("/");*/

        /*ProductType productType = new ProductType();
        productType.setProductTypeName("DATA");
        productType.setProductTypeDescription("Data type");
        productType.setId(1L);

        ProductType productType2 = new ProductType();
        productType2.setProductTypeName("API");
        productType2.setProductTypeDescription("Api type");
        productType2.setId(2L);

        productTypeRepository.save(productType);
        productTypeRepository.save(productType2);

        System.out.println("both saved...");*/

        return "layouts/header";
    }

    @RequestMapping("/getCartPage")
    public String getCartPage(Model model, HttpServletRequest request, @RequestParam(value = "flagForOfferAvailed", required = false) String flagForCartOf) throws IOException {
        System.out.println("");
        User daasUser = userUtil.getCurrentUser();
        List<CartDetail> cartDetails = null;
        Cart cart = null;
        if (daasUser != null) {
            cart = cartRepository.findByDaasUser(daasUser);
        } else {
            HttpSession session = request.getSession();
            String currentSession = session.getId();
            cart = cartRepository.findCartBySessionId(currentSession);
        }
        if (cart == null) {
            cartDetails = new ArrayList<>();
        } else {
            cartDetails = cart.getCartDetails();
        }
        model.addAttribute("productListOnUsersCart", cartDetails);
        model.addAttribute("flagForOfferAvailed",flagForCartOf);
        System.out.println("");
        return "cartpage";
    }

/*    @GetMapping(value = {"/addtocart/", "/addtocart/{id}"})
    public String addProdtuctoToCart(@PathVariable Optional<String> id,
                                     HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        Cart cartForUser = null;
        *//*        List<Product> productList = null;*//*
        List<CartDetail> cartDetails = null;
        if (id.isPresent()) {
            Product product = productRepository.findFirstById(Long.valueOf(id.get()));

            CartDetail cartDetail = new CartDetail();
            cartDetail.setProduct(product);
            cartDetail.setQuantity(1l);
            cartDetail.setTotalPrice(product.getProductPrice());

            if (cartRepository.findByDaasUser(userUtil.getCurrentUser()) != null) {
                cartForUser = cartRepository.findByDaasUser(userUtil.getCurrentUser());
                cartDetails = cartForUser.getCartDetails();
                *//*productList = cartForUser.getProductList();*//*
            } else {
                cartForUser = new Cart();
                cartDetails = new ArrayList<CartDetail>();
                *//*productList= new ArrayList<Product>();*//*
            }


            Set<Product> productsInCart = new HashSet<>();
            if (!(cartDetails.isEmpty())) {
                for (CartDetail c : cartDetails) {
                    productsInCart.add(c.getProduct());
                }
            }

            Set<ProductOffer> offersAvailable = product.getProductOfferSet();
            Set<ProductOffer> offerToCustomer = new HashSet<>();
            if (offersAvailable != null) {
                for (ProductOffer offer : offersAvailable) {

                    Set<Product> productOnOffer = new HashSet<>();
                    productOnOffer.addAll(offer.getProductSet());
                    int num = 0;

                    for (Product cartProduct : productsInCart) {
                        if (productOnOffer.contains(cartProduct))
                            num++;
                    }

                    if (num == productOnOffer.size()) {
                        Set<Product> cartProductOnOffer = offer.getProductSet();
                        for(Product p:cartProductOnOffer) {
                            int index=cartDetails.indexOf(p);
                            CartDetail cartDetail1=cartDetails.get(index);
                            cartDetail1.setProductOffer(offer);
                            CartDetail res= cartDetailRepository.save(cartDetail1);
                            System.out.println("results:"+res.getId()+"**"+res.getQuantity());
                        }

                        cartDetail.setProductOffer(offer);
                        offerToCustomer.add(offer);
                    }
                }
            }

            cartDetails.add(cartDetail);
            cartForUser.setCartDetails(cartDetails);
            cartForUser.setDaasUser(userUtil.getCurrentUser());
            cartRepository.save(cartForUser);
        }
        return "redirect:/daas/Data";
    }*/

    @GetMapping(value = "/getValueByProductIdAjax/{productId}/{quantity}")
    @ResponseBody
    public String getApiTotalByAjax(@PathVariable("productId") String productId, @PathVariable("quantity") String quantity){
        System.out.println(productId);
        System.out.println(quantity);

        Product product = productRepository.findFirstById(Long.valueOf(productId));
        List<ProductSlabDetail> productSlabDetail = product.getProductSlab().getProductSlabDetailList();
        Long quantityLong = Long.valueOf(quantity) * 1000;
        float totalPrice = getCalculatedPriceIncrementally(quantityLong, productSlabDetail);
        float apiAveragePrice = totalPrice / quantityLong;
        return totalPrice+"|"+apiAveragePrice;
    }


    @GetMapping(value = {"/addtocart/", "/addtocart/{id}"})
    @ResponseBody
    public String addProductToCart(@PathVariable Optional<String> id,
                                   HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        System.out.println(id.get());
        Cart cartForUser = null;
        if (id.isPresent()) {
            Product product = productRepository.findFirstById(Long.valueOf(id.get()));
            CartDetail cartDetail = null;
            float totalprice = 0f;
            User currentUser = userUtil.getCurrentUser();
            if (currentUser != null) {
                if (cartRepository.findByDaasUser(currentUser) != null) {
                    cartForUser = cartRepository.findByDaasUser(currentUser);

                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(userUtil.getCurrentUser());
                    cartForUser.setSessionId(null);
                    cartRepository.save(cartForUser);
                }
                cartDetail = new CartDetail();
                System.out.println(product.getProductName());
                cartDetail.setProduct(product);
                cartDetail.setQuantity(1l);
                cartDetail.setTotalPrice(product.getProductPrice());
                cartDetail.setCart(cartForUser);
                CartDetail res = cartDetailRepository.save(cartDetail);


                Cart updatedCart = cartRepository.findByDaasUser(currentUser);
                List<CartDetail> cartDetails = updatedCart.getCartDetails();

                Set<Product> productSet = new HashSet<>();
                productSet.add(res.getProduct());
                Set<ProductOffer> offersAvailable = productOfferRepository.findAllByProductSetAndStatusAndEndDateAfter(productSet,
                        true, LocalDateTime.now());
                List<Product> productsInCart = new ArrayList<>();

                Set<ProductOffer> productOfferSet = new HashSet<>();
                if (offersAvailable != null && offersAvailable.size() > 0) {
                    for (CartDetail c : cartDetails) {
                        productsInCart.add(c.getProduct());
                    }

                    for (ProductOffer offer : offersAvailable) {
                        Set<Product> productsInOffer = new HashSet<>();
                        productsInOffer.addAll(offer.getProductSet());

                        if (productsInCart.containsAll(productsInOffer)) {
                            productOfferSet.add(offer);
                            for (Product p : offer.getProductSet()) {
                                int index = productsInCart.indexOf(p);
                                CartDetail c = cartDetailRepository.findFirstByCartAndProduct(updatedCart, productsInCart.get(index));
                                c.setProductOffer(offer);
                                Long totalPrice = (long) Math.round(c.getTotalPrice() * (100 - offer.getDiscountRate()));
                                c.setTotalPrice(totalPrice / 100);
                                if (cartDetailRepository.save(c) != null) {
                                    System.out.println("successfully added offer");
                                }
                            }
                        }
                    }
                }
            } else {
                HttpSession session = request.getSession();
                String currentSession = session.getId();
                if (cartRepository.findCartBySessionId(currentSession) != null) {
                    cartForUser = cartRepository.findCartBySessionId(currentSession);
                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(null);
                    cartForUser.setSessionId(currentSession);
                    cartRepository.save(cartForUser);
                }
                cartDetail = new CartDetail();
                System.out.println(product.getProductPrice());
                System.out.println(product.toString());
                cartDetail.setProduct(product); //aama
                cartDetail.setQuantity(1l);
                cartDetail.setTotalPrice(product.getProductPrice());
                cartDetail.setCart(cartForUser);
                CartDetail res = cartDetailRepository.save(cartDetail);

                Cart updatedCart = cartRepository.findCartBySessionId(currentSession);
                List<CartDetail> cartDetails = updatedCart.getCartDetails();

                Set<Product> productSet = new HashSet<>();
                productSet.add(res.getProduct());
                Set<ProductOffer> offersAvailable = productOfferRepository.findAllByProductSetAndStatusAndEndDateAfter(productSet, true, LocalDateTime.now());
                List<Product> productsInCart = new ArrayList<>();

                Set<ProductOffer> productOfferSet = new HashSet<>();
                if (offersAvailable != null && offersAvailable.size() > 0) {
                    for (CartDetail c : cartDetails) {
                        productsInCart.add(c.getProduct());
                    }

                    for (ProductOffer offer : offersAvailable) {
                        Set<Product> productsInOffer = new HashSet<>();
                        productsInOffer.addAll(offer.getProductSet());

                        if (productsInCart.containsAll(productsInOffer)) {
                            productOfferSet.add(offer);
                            for (Product p : offer.getProductSet()) {
                                int index = productsInCart.indexOf(p);
                                CartDetail c = cartDetailRepository.findFirstByCartAndProduct(updatedCart, productsInCart.get(index));
                                c.setProductOffer(offer);
                                Long totalPrice = (long) Math.round(c.getTotalPrice() * (100 - offer.getDiscountRate()));
                                c.setTotalPrice(totalPrice / 100);
                                if (cartDetailRepository.save(c) != null) {
                                    System.out.println("successfully added offer");
                                }
                            }
                        }
                    }
                }
            }
        }
        return "true";
    }

    @GetMapping(value = {"/addtocartrenew/", "/addtocartrenew/{id}"})
    public String addProductToCartRenew(@PathVariable Optional<String> id,
                                        HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        System.out.println(id.get());
        Cart cartForUser = null;
        if (id.isPresent()) {
            Product product = productRepository.findFirstById(Long.valueOf(id.get()));
            CartDetail cartDetail = null;
            float totalprice = 0f;
            User currentUser = userUtil.getCurrentUser();
            if (currentUser != null) {
                if (cartRepository.findByDaasUser(currentUser) != null) {
                    cartForUser = cartRepository.findByDaasUser(currentUser);

                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(userUtil.getCurrentUser());
                    cartForUser.setSessionId(null);
                    cartRepository.save(cartForUser);
                }
                cartDetail = new CartDetail();
                System.out.println(product.getProductName());
                cartDetail.setProduct(product);
                cartDetail.setQuantity(1l);
                cartDetail.setTotalPrice(product.getProductPrice());
                cartDetail.setCart(cartForUser);
                CartDetail res = cartDetailRepository.save(cartDetail);


                Cart updatedCart = cartRepository.findByDaasUser(currentUser);
                List<CartDetail> cartDetails = updatedCart.getCartDetails();

                Set<Product> productSet = new HashSet<>();
                productSet.add(res.getProduct());
                Set<ProductOffer> offersAvailable = productOfferRepository.findAllByProductSetAndStatusAndEndDateAfter(productSet,
                        true, LocalDateTime.now());
                List<Product> productsInCart = new ArrayList<>();

                Set<ProductOffer> productOfferSet = new HashSet<>();
                if (offersAvailable != null && offersAvailable.size() > 0) {
                    for (CartDetail c : cartDetails) {
                        productsInCart.add(c.getProduct());
                    }

                    for (ProductOffer offer : offersAvailable) {
                        Set<Product> productsInOffer = new HashSet<>();
                        productsInOffer.addAll(offer.getProductSet());

                        if (productsInCart.containsAll(productsInOffer)) {
                            productOfferSet.add(offer);
                            for (Product p : offer.getProductSet()) {
                                int index = productsInCart.indexOf(p);
                                CartDetail c = cartDetailRepository.findFirstByCartAndProduct(updatedCart, productsInCart.get(index));
                                c.setProductOffer(offer);
                                Long totalPrice = (long) Math.round(c.getTotalPrice() * (100 - offer.getDiscountRate()));
                                c.setTotalPrice(totalPrice / 100);
                                if (cartDetailRepository.save(c) != null) {
                                    System.out.println("successfully added offer");
                                }
                            }
                        }
                    }
                }
            } else {
                HttpSession session = request.getSession();
                String currentSession = session.getId();
                if (cartRepository.findCartBySessionId(currentSession) != null) {
                    cartForUser = cartRepository.findCartBySessionId(currentSession);
                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(null);
                    cartForUser.setSessionId(currentSession);
                    cartRepository.save(cartForUser);
                }
                cartDetail = new CartDetail();
                System.out.println(product.getProductPrice());
                System.out.println(product.toString());
                cartDetail.setProduct(product); //aama
                cartDetail.setQuantity(1l);
                cartDetail.setTotalPrice(product.getProductPrice());
                cartDetail.setCart(cartForUser);
                CartDetail res = cartDetailRepository.save(cartDetail);

                Cart updatedCart = cartRepository.findCartBySessionId(currentSession);
                List<CartDetail> cartDetails = updatedCart.getCartDetails();

                Set<Product> productSet = new HashSet<>();
                productSet.add(res.getProduct());
                Set<ProductOffer> offersAvailable = productOfferRepository.findAllByProductSetAndStatusAndEndDateAfter(productSet, true, LocalDateTime.now());
                List<Product> productsInCart = new ArrayList<>();

                Set<ProductOffer> productOfferSet = new HashSet<>();
                if (offersAvailable != null && offersAvailable.size() > 0) {
                    for (CartDetail c : cartDetails) {
                        productsInCart.add(c.getProduct());
                    }

                    for (ProductOffer offer : offersAvailable) {
                        Set<Product> productsInOffer = new HashSet<>();
                        productsInOffer.addAll(offer.getProductSet());

                        if (productsInCart.containsAll(productsInOffer)) {
                            productOfferSet.add(offer);
                            for (Product p : offer.getProductSet()) {
                                int index = productsInCart.indexOf(p);
                                CartDetail c = cartDetailRepository.findFirstByCartAndProduct(updatedCart, productsInCart.get(index));
                                c.setProductOffer(offer);
                                Long totalPrice = (long) Math.round(c.getTotalPrice() * (100 - offer.getDiscountRate()));
                                c.setTotalPrice(totalPrice / 100);
                                if (cartDetailRepository.save(c) != null) {
                                    System.out.println("successfully added offer");
                                }
                            }
                        }
                    }
                }
            }
        }


        return "redirect:/getCartPage";
    }

    @Transactional
    @GetMapping(value = {"/deletefromcartcustom/", "/deletefromcartcustom/{daasDataId}"})
    @ResponseBody
    public String deleteFromCartDetail(@PathVariable Long daasDataId,
                                       HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        cartDetailRepository.deleteByProductId(daasDataId);

        return "true";
    }

    @Transactional
    @GetMapping(value = {"/deletefromcartcustomapi/", "/deletefromcartcustomapi/{daasDataId}"})
    public String deleteFromCartDetailApi(@PathVariable Long daasDataId,
                                       HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        cartDetailRepository.deleteByProductId(daasDataId);

        return "redirect:/daas/api-as-service";

    }

    @GetMapping(value = "/getTotalNumberOfCartOrders")
    @ResponseBody
    public String getTotalNumberOfCartOrders(HttpServletRequest request){
        int totalCount = serviceUtil.getCartEntriesCount(request);
        return totalCount+"";
    }

    @GetMapping(value = {"/deletefromcart/", "/deletefromcart/{cartDetailId}"})
    public String deleteFromUsersCart(@PathVariable Long cartDetailId,
                                      HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        /*int affectedrows = cartDetailRepository.deleteByProductId(id);
        System.out.println(affectedrows);*/

        /*int affectedrows = cartDetailRepository.deleteByProduct(product);
        System.out.println(affectedrows);*/

        CartDetail cartDetail = cartDetailRepository.findFirstById(cartDetailId);

        if (cartDetail != null) {
            ProductOffer offer = cartDetail.getProductOffer();
            if (offer != null) {
                Cart cart = cartDetail.getCart();
                cart = cartRepository.findFirstById(cart.getId());
                List<CartDetail> offerRemoveOnProduct = new ArrayList<>();
                offerRemoveOnProduct.addAll(cart.getCartDetails());
                if (!(offerRemoveOnProduct.isEmpty())) {
                    for (CartDetail c : offerRemoveOnProduct) {
                        ProductOffer offerApplied = c.getProductOffer();
                        if (offerApplied != null) {
                            if (offerApplied.getId() == offer.getId()) {
                                c.setProductOffer(null);
                                c.setTotalPrice(c.getProduct().getProductPrice() * c.getQuantity());
                                cartDetailRepository.save(c);
                            }
                        }
                    }
                }
            }
        }

        cartDetailRepository.deleteById(cartDetailId);
        /*CartDetail cartDetail = cartDetailRepository.findFirstById(cartDetailId);
        cartDetailRepository.delete(cartDetail);*/

        return "redirect:/getCartPage";

    }

        @PostMapping(value = {"/apiaddtocart/", "/apiaddtocart/{id}"})
    public String addApiToCart(@PathVariable Optional<String> id, @RequestParam(name = "upperlimitvalue") Long quantity,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        Cart cartForUser = null;

        //multiply it with 1000
        quantity = quantity * 1000;
        User user = userUtil.getCurrentUser();
        if (id.isPresent()) {
            Product product = productRepository.findFirstById(Long.valueOf(id.get()));
            CartDetail cartDetail = null;
            float totalprice = 0f;
            if(user!=null) {
                if (cartRepository.findByDaasUser(user) != null) {
                    cartForUser = cartRepository.findByDaasUser(userUtil.getCurrentUser());
                    cartDetail = cartDetailRepository.findFirstByCartAndProduct(cartForUser, product);
                    if (cartDetail != null) {
                        quantity += cartDetail.getQuantity();
                    } else {
                        cartDetail = new CartDetail();
                    }

                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(user);
                    cartForUser.setSessionId(null);
                    cartRepository.save(cartForUser);
                }
                cartDetail.setProduct(product);
                cartDetail.setQuantity(quantity);

                List<ProductSlabDetail> productSlabDetail = product.getProductSlab().getProductSlabDetailList();
                /*for (ProductSlabDetail slabs : productSlabDetail) {
                    if (quantity < slabs.getSlabUpperLimit() && quantity > slabs.getSlabLowerLimit()) {
                        totalprice = slabs.getSlabRate() * quantity;
                        break;
                    } else if (quantity == slabs.getSlabLowerLimit() || quantity == slabs.getSlabUpperLimit()) {
                        totalprice = slabs.getSlabRate() * quantity;
                        break;
                    }
                }
                totalprice = Math.round(totalprice * 100);
                cartDetail.setTotalPrice(totalprice / 100);*/
                float totalPrice = getCalculatedPriceIncrementally(quantity, productSlabDetail);
                /*long finalTotalPrice = (Math.round(totalPrice / quantity * 100) * quantity) / 100;*/
                cartDetail.setTotalPrice(totalPrice);

                cartDetail.setCart(cartForUser);
                cartDetailRepository.save(cartDetail);
            }
            else{
                HttpSession session = request.getSession();
                String currentSession = session.getId();
                if (cartRepository.findCartBySessionId(currentSession) != null) {
                    cartForUser = cartRepository.findCartBySessionId(currentSession);
                    cartDetail = cartDetailRepository.findFirstByCartAndProduct(cartForUser, product);
                    if (cartDetail != null) {
                        quantity += cartDetail.getQuantity();
                    } else {
                        cartDetail = new CartDetail();
                    }

                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(null);
                    cartForUser.setSessionId(currentSession);
                    cartRepository.save(cartForUser);
                    cartDetail=new CartDetail();
                }
                cartDetail.setProduct(product);
                cartDetail.setQuantity(quantity);

                List<ProductSlabDetail> productSlabDetail = product.getProductSlab().getProductSlabDetailList();
                /*for (ProductSlabDetail slabs : productSlabDetail) {
                    if (quantity < slabs.getSlabUpperLimit() && quantity > slabs.getSlabLowerLimit()) {
                        totalprice = slabs.getSlabRate() * quantity;
                        break;
                    } else if (quantity == slabs.getSlabLowerLimit() || quantity == slabs.getSlabUpperLimit()) {
                        totalprice = slabs.getSlabRate() * quantity;
                        break;
                    }
                }*/
                /*totalprice = Math.round(totalprice * 100);*/
                /*cartDetail.setTotalPrice(totalprice / 100);*/

                /*float totalPrice = getCalculatedPriceIncrementally(quantity, productSlabDetail);
                cartDetail.setTotalPrice(totalPrice);*/

                float totalPrice = getCalculatedPriceIncrementally(quantity, productSlabDetail);
                /*long finalTotalPrice = (Math.round(totalPrice / quantity * 100) * quantity) / 100;*/
                cartDetail.setTotalPrice(totalPrice);

                cartDetail.setCart(cartForUser);
                cartDetailRepository.save(cartDetail);
            }
        }
        System.out.println("");
        return "redirect:/daas/api-as-service";
    }

    public float getCalculatedPriceIncrementally(Long quantity, List<ProductSlabDetail> productSlabDetailList){
        System.out.println("");
        Long mainQuantity = quantity;
        float totalPrice = 0f;

        for(int i = 0 ; i < productSlabDetailList.size() ; i++){
            if(mainQuantity>0 && i != (productSlabDetailList.size()-1)){
                int slabDiffrence = 0;
                    if(i==0){
                        slabDiffrence = productSlabDetailList.get(i).getSlabUpperLimit() - productSlabDetailList.get(i).getSlabLowerLimit() + 1;
                    } else {
                        slabDiffrence = productSlabDetailList.get(i).getSlabUpperLimit() - productSlabDetailList.get(i).getSlabLowerLimit() + 1;
                    }

                if(slabDiffrence > mainQuantity){
                    totalPrice = totalPrice + (productSlabDetailList.get(i).getSlabRate() * mainQuantity);
                }
                else {
                    totalPrice = totalPrice + (productSlabDetailList.get(i).getSlabRate() * slabDiffrence);
                }

                mainQuantity = mainQuantity - slabDiffrence;
            }
            else {
                break;
            }
        }
        if(mainQuantity > 0){
            totalPrice = totalPrice + (mainQuantity * productSlabDetailList.get(productSlabDetailList.size()-1).getSlabRate());
        }
        System.out.println("");
        return totalPrice;
    }

    /*@PostMapping(value = {"/apiaddtocart", "/apiaddtocart/{id}"})
    public String addApiToCart(@PathVariable Optional<String> id,
                               @RequestParam(name = "upperlimitvalue") String upperlimitvalue1,
                               @RequestParam(name = "priceofslab") String priceofslab1,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        System.out.println(upperlimitvalue1);
        System.out.println(priceofslab1);
        System.out.println(id.get());

        return "redirect:/daas/api-as-service";
    }*/


    @GetMapping(value = {"/addoffertocart/", "/addoffertocart/{id}"})
    public String addOffertoToCart(@PathVariable Optional<String> id,
                                   HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        ProductOffer offer = productOfferRepository.findFirstById(Long.valueOf(id.get()));
        User currentUser = userUtil.getCurrentUser();
        Cart cartForUser = null;
        if (currentUser != null) {
            if (id.isPresent()) {
                if (cartRepository.findByDaasUser(currentUser) != null) {
                    cartForUser = cartRepository.findByDaasUser(currentUser);
                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(userUtil.getCurrentUser());
                    cartForUser.setSessionId(null);
                    cartRepository.save(cartForUser);
                }
            }
            Cart updatedCart = cartRepository.findByDaasUser(currentUser);
            List<CartDetail> cartDetails = updatedCart.getCartDetails();

            if (cartDetails.isEmpty()) {
                for (Product p : offer.getProductSet()) {
                    CartDetail cartProductInOffer = new CartDetail();
                    cartProductInOffer.setProduct(p);
                    cartProductInOffer.setQuantity(1L); //for zip data only
                    float totalPrice = Math.round((p.getProductPrice() * (100 - offer.getDiscountRate())));
                    cartProductInOffer.setTotalPrice(totalPrice / 100);
                    cartProductInOffer.setProductOffer(offer);
                    cartProductInOffer.setCart(cartForUser);
                    cartDetails.add(cartProductInOffer);
                }
                cartDetailRepository.saveAll(cartDetails);
            } else {
                List<Product> productInCartSet = new ArrayList<>();
                for (CartDetail c : cartDetails) {
                    productInCartSet.add(c.getProduct());
                }
                for (Product p : offer.getProductSet()) {
                    CartDetail c;
                    if (productInCartSet.contains(p)) {
                        int index = productInCartSet.indexOf(p);
                        c = cartDetails.get(index);
                    } else {
                        c = new CartDetail();
                        c.setProduct(p);
                        c.setQuantity(1L); //for zip data only
                        c.setCart(cartForUser);
                    }
                    Long price = (long) Math.round(p.getProductPrice() * (100 - offer.getDiscountRate()));
                    c.setTotalPrice(price / 100);
                    c.setProductOffer(offer);
                    cartDetailRepository.save(c);
                }

            }
        } else {
            HttpSession session = request.getSession();
            String currentSession = session.getId();
            if (id.isPresent()) {
                if (cartRepository.findCartBySessionId(currentSession) != null) {
                    cartForUser = cartRepository.findCartBySessionId(currentSession);
                } else {
                    cartForUser = new Cart();
                    cartForUser.setDaasUser(null);
                    cartForUser.setSessionId(currentSession);
                    cartRepository.save(cartForUser);
                }
            }
            Cart updatedCart = cartRepository.findCartBySessionId(currentSession);
            List<CartDetail> cartDetails = updatedCart.getCartDetails();

            if (cartDetails.isEmpty()) {
                for (Product p : offer.getProductSet()) {
                    CartDetail cartProductInOffer = new CartDetail();
                    cartProductInOffer.setProduct(p);
                    cartProductInOffer.setQuantity(1L); //for zip data only
                    float totalPrice = Math.round((p.getProductPrice() * (100 - offer.getDiscountRate())));
                    cartProductInOffer.setTotalPrice(totalPrice / 100);
                    cartProductInOffer.setProductOffer(offer);
                    cartProductInOffer.setCart(cartForUser);
                    cartDetails.add(cartProductInOffer);
                }
                cartDetailRepository.saveAll(cartDetails);
            } else {
                List<Product> productInCartSet = new ArrayList<>();
                for (CartDetail c : cartDetails) {
                    productInCartSet.add(c.getProduct());
                }
                for (Product p : offer.getProductSet()) {
                    CartDetail c;
                    if (productInCartSet.contains(p)) {
                        int index = productInCartSet.indexOf(p);
                        c = cartDetails.get(index);
                    } else {
                        c = new CartDetail();
                        c.setProduct(p);
                        c.setQuantity(1L); //for zip data only
                        c.setCart(cartForUser);
                    }
                    Long price = (long) Math.round(p.getProductPrice() * (100 - offer.getDiscountRate()));
                    c.setTotalPrice(price / 100);
                    c.setProductOffer(offer);
                    cartDetailRepository.save(c);
                }

            }
        }

        return "redirect:/daas/offers";

    }
}