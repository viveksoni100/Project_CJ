package com.daas.controllers;


import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.entities.DaaS.*;
import com.daas.entities.forms.ResetPasswordForm;
import com.daas.entities.user.*;
import com.daas.events.event.ForgotPasswordEvent;
import com.daas.events.event.RegistrationEvent;
import com.daas.events.event.daas.OCRPurchaseSuccessEvent;
import com.daas.events.event.daas.SendMessageEvent;
import com.daas.repositories.daas.*;
import com.daas.repositories.iface.user.ForgotPasswordRepository;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.repositories.iface.user.VerificationRepository;
import com.daas.utilities.PdfGenaratorUtil;
import com.daas.utilities.session.UserUtil;
import com.daas.utilities.singleton.CommonUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.aop.scope.ScopedObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;

@Controller
@RequestMapping(value = "/")
public class IndexController extends AbstractBaseController {


    public final static Logger LOG = LogManager.getLogger(IndexController.class.getName());

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    PdfGenaratorUtil pdfGenaratorUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ForgotPasswordRepository forgotPasswordRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Value("${eventbrite.api.token}")
    private String eventBrite;

    public static final String baseTemplate = "user/";
    public static final String redirect = "redirect:/";

    @GetMapping(value = {"homeNew"})
    public String homeNew(ModelMap model, HttpServletRequest request) {

        return "home";
    }

    @GetMapping(value = {""})
        public String homePage(ModelMap model, HttpServletRequest request) {
        System.out.println("");
        User user = userUtil.getCurrentUser();
        if (user != null) {
            HttpSession session = request.getSession();
            String currentSession = session.getId();
            if (cartRepository.findCartBySessionId(currentSession) != null) {
                Cart sesCart = cartRepository.findCartBySessionId(currentSession);
                Cart userCart = null;
                List<CartDetail> sesCartDet = cartDetailRepository.findAllByCart(sesCart);
                if (cartRepository.findByDaasUser(user) != null) {
                    userCart = cartRepository.findByDaasUser(user);

                    //if offer is applied then empty the cart...
                    List<CartDetail> cartDetailList = userCart.getCartDetails();
                    for (CartDetail c : cartDetailList) {
                        if (c.getProductOffer() != null) {
                            System.out.println(c.getProductOffer());
                        }
                    }

                } else {
                    userCart = new Cart();
                    userCart.setDaasUser(user);
                    userCart.setSessionId(null);
                    cartRepository.save(userCart);
                }
                boolean flagForOfferCart = true;
                for(int i=0; i<sesCartDet.size(); i++){
                    CartDetail cartDetail = new CartDetail();
                    if ((!userCart.getCartDetails().contains(sesCartDet.get(i)) && (inSessionButNotInOrderOfCurrentUser(sesCartDet.get(i).getProduct(), user)))) {
                        if(userCart.getCartDetails().size() > 0){
                            if(!sessionProductAndCartProductAreNotSame(sesCartDet.get(i).getProduct(), userCart.getCartDetails().get(i).getProduct())){
                                flagForOfferCart = false;
                                cartDetail.setProduct(sesCartDet.get(i).getProduct());
                                cartDetail.setQuantity(sesCartDet.get(i).getQuantity());
                                cartDetail.setTotalPrice(sesCartDet.get(i).getTotalPrice());
                                cartDetail.setCart(userCart);
                                cartDetailRepository.save(cartDetail);
                            }
                        } else {
                            flagForOfferCart = false;
                            cartDetail.setProduct(sesCartDet.get(i).getProduct());
                            cartDetail.setQuantity(sesCartDet.get(i).getQuantity());
                            cartDetail.setTotalPrice(sesCartDet.get(i).getTotalPrice());
                            cartDetail.setCart(userCart);
                            cartDetailRepository.save(cartDetail);
                        }

                    }
                }
                /*for (CartDetail cd : sesCartDet) {
                    CartDetail cartDetail = new CartDetail();
                    if (!userCart.getCartDetails().contains(cd)) {
                        cartDetail.setProduct(cd.getProduct());
                        cartDetail.setQuantity(cd.getQuantity());
                        cartDetail.setTotalPrice(cd.getTotalPrice());
                        cartDetail.setCart(userCart);
                        cartDetailRepository.save(cartDetail);
                    }
                }*/
                cartRepository.delete(sesCart);
                if(flagForOfferCart == true){
                    model.addAttribute("flagForOfferAvailed","true");
                } else {
                    model.addAttribute("flagForOfferAvailed","false");
                }
                return "redirect:/getCartPage";

            }

            if (user.getId() == 1) {
                return "redirect:/admin/dashboard/list";
            }

            if (orderRepository.findFirstByDaasUser(user) != null) {
                return "redirect:/subscription";
            }

        }
        System.out.println("");
        return "home";
    }

    private boolean sessionProductAndCartProductAreNotSame(Product product, Product product1) {
        if(product.getId() == product1.getId()){
            return true;
        }
        return false;
    }

    @GetMapping(value = {"home"})
    public String home(ModelMap model, HttpServletRequest request) {
        User user = userUtil.getCurrentUser();
        if (user != null) {
            HttpSession session = request.getSession();
            String currentSession = session.getId();
            if (cartRepository.findCartBySessionId(currentSession) != null) {
                Cart sesCart = cartRepository.findCartBySessionId(currentSession);
                Cart userCart = null;
                List<CartDetail> sesCartDet = cartDetailRepository.findAllByCart(sesCart);
                if (cartRepository.findByDaasUser(user) != null) {
                    userCart = cartRepository.findByDaasUser(user);

                    //if offer is applied then empty the cart...
                    List<CartDetail> cartDetailList = userCart.getCartDetails();
                    for (CartDetail c : cartDetailList) {
                        if (c.getProductOffer() != null) {
                            System.out.println(c.getProductOffer());
                        }
                    }

                } else {
                    userCart = new Cart();
                    userCart.setDaasUser(user);
                    userCart.setSessionId(null);
                    cartRepository.save(userCart);
                }
                boolean flagForOfferCart = true;
                for(int i=0; i<sesCartDet.size(); i++){
                    CartDetail cartDetail = new CartDetail();
                    if ((!userCart.getCartDetails().contains(sesCartDet.get(i)) && (inSessionButNotInOrderOfCurrentUser(sesCartDet.get(i).getProduct(), user)))) {
                        flagForOfferCart = false;
                        cartDetail.setProduct(sesCartDet.get(i).getProduct());
                        cartDetail.setQuantity(sesCartDet.get(i).getQuantity());
                        cartDetail.setTotalPrice(sesCartDet.get(i).getTotalPrice());
                        cartDetail.setCart(userCart);
                        cartDetailRepository.save(cartDetail);
                    }
                }
                /*for (CartDetail cd : sesCartDet) {
                    CartDetail cartDetail = new CartDetail();
                    if (!userCart.getCartDetails().contains(cd)) {
                        cartDetail.setProduct(cd.getProduct());
                        cartDetail.setQuantity(cd.getQuantity());
                        cartDetail.setTotalPrice(cd.getTotalPrice());
                        cartDetail.setCart(userCart);
                        cartDetailRepository.save(cartDetail);
                    }
                }*/
                cartRepository.delete(sesCart);
                if(flagForOfferCart == true){
                    model.addAttribute("flagForOfferAvailed","true");
                } else {
                    model.addAttribute("flagForOfferAvailed","false");
                }
                return "redirect:/getCartPage";

            }

            if (user.getId() == 1) {
                return "redirect:/admin/dashboard/list";
            }

            if (orderRepository.findFirstByDaasUser(user) != null) {
                return "redirect:/subscription";
            }

        }
        return "home";
    }

    public Boolean inSessionButNotInOrderOfCurrentUser(Product product, User user){

        List<Order> orders = orderRepository.findAllByDaasUser(user);
        for(int i=0; i< orders.size(); i++){
            List<OrderDetail> orderDetails = orderDetailRepository.findAllByOrderId(orders.get(i).getId()+"");
            for(int j=0; j<orderDetails.size(); j++){
                if(product.getProductId().equals(orderDetails.get(j).getProduct().getProductId())){
                    return false;
                }
            }
        }
        return true;
    }

    @GetMapping(value = {"api-as-service"})
    public String apiAsService(ModelMap model) {
        return "shop-list-wls-api";
    }

    @RequestMapping(value = {"categorySoftDelete/{id}"})
    public String categorySoftDelete(Model model, @PathVariable String id) {

        ProductCategoryDetail productCategoryDetail = productCategoryDetailRepository.findFirstById(Long.parseLong(id));
        productCategoryDetail.setDeleted(true);
        productCategoryDetail.setStatus(false);
        productCategoryDetailRepository.save(productCategoryDetail);

        return "redirect:/admin/category/list";
    }

    @RequestMapping(value = {"dataSoftDelete/{id}"})
    public String dataSoftDelete(Model model, @PathVariable String id) {

        Product product = productRepository.findFirstById(Long.parseLong(id));
        product.setDeleted(true);
        product.setStatus(false);
        productRepository.save(product);

        return "redirect:/admin/publications/datalist";
    }

    @RequestMapping(value = {"apiSoftDelete/{id}"})
    public String apiSoftDelete(Model model, @PathVariable String id) {

        Product product = productRepository.findFirstById(Long.parseLong(id));
        product.setDeleted(true);
        product.setStatus(false);
        productRepository.save(product);

        return "redirect:/admin/publications/apilist";
    }

    @RequestMapping(value = {"comboSoftDelete/{id}"})
    public String comboSoftDelete(Model model, @PathVariable String id) {

        ProductOffer productOffer = productOfferRepository.findFirstById(Long.parseLong(id));
        productOffer.setDeleted(true);
        productOffer.setStatus(false);
        productOfferRepository.save(productOffer);

        return "redirect:/admin/offer/list";
    }

    @GetMapping(value = {"faq-page"})
    public String faq(ModelMap model) {
        return "faq";
    }

    @GetMapping(value = {"invoice"})
    public String getInvoice(ModelMap model) {
        return "/checkout/invoice";
    }

    @GetMapping(value = {"aboutus"})
    public String aboutUs(ModelMap model) {
        return "about-us";
    }

    @GetMapping(value = {"contactus"})
    public String contactUs(ModelMap model) {
        return "contact-us";
    }

    /*@GetMapping(value = {"cartpage"})
    public String cartPage(ModelMap model) {
        return "cartpage";
    }*/


    /**
     * @param error
     * @param type
     * @param logout
     * @param page
     * @param model
     * @param user
     * @param redirectAttributes
     * @param request
     * @param httpSession
     * @return
     * @throws IOException
     */
    @RequestMapping(value = {"/login"}, method = RequestMethod.GET)
    public String login(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "type", required = false) String type,
                        @RequestParam(value = "logout", required = false) String logout,
                        @RequestParam(value = "page", required = false) String page,
                        ModelMap model, User user, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpSession httpSession) throws IOException {

        //alerts.clearAlert();
        System.out.println("inside out...");
        Authentication auth = userUtil.getAuthentication();

        if (!(auth instanceof AnonymousAuthenticationToken)) {
            httpSession.setAttribute("isSessionActive", "true");
            return "redirect:/subscription";
            /*return "redirect:/daas/Data";*/
        }
        // Check if there is an error while loggin in
        if (error != null) {

            if (type != null && type.equalsIgnoreCase("captcha")) { // Throw captcha error if captcha validation failed
                alerts.setError("Captch.required");
                model.addAttribute("captchaTokenError", "Captcha required");
            } else if (type != null && type.equalsIgnoreCase("status")) { // throw user status error if user is still not enabled
                alerts.setError("user.status.disabled");
            } else if (type != null && type.equalsIgnoreCase("packageExpired")) {
                alerts.setError("user.package.expired");
                return "redirect:/payment";
            } else
                alerts.setError("Incorrect.login");

            alerts.setAlertModelAttribute(model);
        }

        String verification = request.getParameter("verification");
        if (verification != null && verification.equalsIgnoreCase("success")) {
            alerts.setSuccess("verification.success");
            alerts.setAlertModelAttribute(model);
        }
        model.addAttribute("loginCssClass", "active");
        alerts.clearAlert();
        //alerts.setAlertRedirectAttribute(redirectAttributes);
        System.out.println("just leaving...");
        return "user/login";
    }

    @RequestMapping(value = {"/loginAPI"}, method = RequestMethod.GET)
    public String loginAPI(@RequestParam(value = "error", required = false) String error,
                        @RequestParam(value = "type", required = false) String type,
                        @RequestParam(value = "logout", required = false) String logout,
                        @RequestParam(value = "page", required = false) String page,
                        ModelMap model, User user, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpSession httpSession) throws IOException {

        //alerts.clearAlert();
        System.out.println("inside out...");
        Authentication auth = userUtil.getAuthentication();

        if (!(auth instanceof AnonymousAuthenticationToken)) {
            httpSession.setAttribute("isSessionActive", "true");
            return "redirect:/subscriptionAPI";
            /*return "redirect:/daas/Data";*/
        }
        // Check if there is an error while loggin in
        if (error != null) {

            if (type != null && type.equalsIgnoreCase("captcha")) { // Throw captcha error if captcha validation failed
                alerts.setError("Captch.required");
                model.addAttribute("captchaTokenError", "Captcha required");
            } else if (type != null && type.equalsIgnoreCase("status")) { // throw user status error if user is still not enabled
                alerts.setError("user.status.disabled");
            } else if (type != null && type.equalsIgnoreCase("packageExpired")) {
                alerts.setError("user.package.expired");
                return "redirect:/payment";
            } else
                alerts.setError("Incorrect.login");

            alerts.setAlertModelAttribute(model);
        }

        String verification = request.getParameter("verification");
        if (verification != null && verification.equalsIgnoreCase("success")) {
            alerts.setSuccess("verification.success");
            alerts.setAlertModelAttribute(model);
        }
        model.addAttribute("loginCssClass", "active");
        alerts.clearAlert();
        //alerts.setAlertRedirectAttribute(redirectAttributes);
        System.out.println("just leaving...");
        /*return "user/login";*/
        return "user/login";
    }

    @RequestMapping(value = {"/getCheckoutPopup"}, method = RequestMethod.GET)
    public String loginpopup(@RequestParam(value = "error", required = false) String error,
                             @RequestParam(value = "type", required = false) String type,
                             @RequestParam(value = "logout", required = false) String logout,
                             @RequestParam(value = "page", required = false) String page,
                             ModelMap model, User user, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpSession httpSession) throws IOException {

        //alerts.clearAlert();
        System.out.println("inside out...");
        Authentication auth = userUtil.getAuthentication();

        if (!(auth instanceof AnonymousAuthenticationToken)) {
            httpSession.setAttribute("isSessionActive", "true");
            return "redirect:/daas/Data";
        }
        // Check if there is an error while loggin in
        if (error != null) {

            if (type != null && type.equalsIgnoreCase("captcha")) { // Throw captcha error if captcha validation failed
                alerts.setError("Captch.required");
                model.addAttribute("captchaTokenError", "Captcha required");
            } else if (type != null && type.equalsIgnoreCase("status")) { // throw user status error if user is still not enabled
                alerts.setError("user.status.disabled");
            } else if (type != null && type.equalsIgnoreCase("packageExpired")) {
                alerts.setError("user.package.expired");
                return "redirect:/payment";
            } else
                alerts.setError("Incorrect.login");

            alerts.setAlertModelAttribute(model);
        }

        String verification = request.getParameter("verification");
        if (verification != null && verification.equalsIgnoreCase("success")) {
            alerts.setSuccess("verification.success");
            alerts.setAlertModelAttribute(model);
        }
        model.addAttribute("loginCssClass", "active");
        alerts.clearAlert();
        //alerts.setAlertRedirectAttribute(redirectAttributes);
        System.out.println("just leaving...");
        return "user/loginpopup";
    }

    @RequestMapping(value = {"/sessionExpired"}, method = RequestMethod.GET)
    public String sessionExpired(){
        return "user/session-expired";
    }

    @RequestMapping(value = {"/login-new"}, method = RequestMethod.GET)
    public String loginNew(@RequestParam(value = "error", required = false) String error,
                           @RequestParam(value = "type", required = false) String type,
                           @RequestParam(value = "logout", required = false) String logout,
                           @RequestParam(value = "page", required = false) String page,
                           ModelMap model, User user, RedirectAttributes redirectAttributes, HttpServletRequest request, HttpSession httpSession) throws IOException {

        //alerts.clearAlert();
        Authentication auth = userUtil.getAuthentication();

        if (!(auth instanceof AnonymousAuthenticationToken)) {
            httpSession.setAttribute("isSessionActive", "true");
            return "redirect:/daas/Data";
        }
        // Check if there is an error while loggin in
        if (error != null) {

            if (type != null && type.equalsIgnoreCase("captcha")) { // Throw captcha error if captcha validation failed
                alerts.setError("Captch.required");
                model.addAttribute("captchaTokenError", "Captcha required");
            } else if (type != null && type.equalsIgnoreCase("status")) { // throw user status error if user is still not enabled
                alerts.setError("user.status.disabled");
            } else if (type != null && type.equalsIgnoreCase("packageExpired")) {
                alerts.setError("user.package.expired");
                return "redirect:/payment";
            } else
                alerts.setError("Incorrect.login");

            alerts.setAlertModelAttribute(model);
        }

        String verification = request.getParameter("verification");
        if (verification != null && verification.equalsIgnoreCase("success")) {
            alerts.setSuccess("verification.success");
            alerts.setAlertModelAttribute(model);
        }
        model.addAttribute("loginCssClass", "active");
        alerts.clearAlert();
        //alerts.setAlertRedirectAttribute(redirectAttributes);
        return "user/login-new";
    }

    /**
     * @param request
     * @param redirectAttributes
     * @param model
     * @return
     */
    @GetMapping(value = "register")
    public String register(HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        model.addAttribute("user", new User());
        return "user/register";
    }

    @GetMapping(value = "register-new")
    public String registerNew(HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        model.addAttribute("user", new User());
        return "user/register-new";
    }

    @GetMapping(value = {"/password/edit"})
    public String passwordEdit(HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model, @RequestParam Optional<String> active,
                               @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        String ret = "/home";
        try {
            User user = userUtil.getCurrentUser();
            if (user != null) {
                model.addAttribute("passwordForm", new PasswordForm());

                //model.addAttribute("active", (active.isPresent() && active.get().equalsIgnoreCase("user")) ? "user" : "profile");
                ret = "user/change_password";
            }
        } catch (Exception e) {
            LOG.error("Error getting details of users ", e);
        }
        model.addAttribute("success", false);
        return ret;
    }


    @GetMapping(value = {"apiPriceCalculation/{id}"})
    public String moreInfoData(@PathVariable String id, ModelMap model){
        System.out.println("");

        CartDetail cartDetail = cartDetailRepository.findFirstById(Long.parseLong(id));
        Product product = cartDetail.getProduct();
        List<ProductSlabDetail> productSlabDetails = product.getProductSlab().getProductSlabDetailList();
        List<ProductSlabDetailFinal> productSlabDetailFinals = new ArrayList<>();

        Long productQty = cartDetail.getQuantity();
        int totalSlabDifferance = 0;
        int rounds = howManyRoundsToTake(productQty, productSlabDetails);

        if(rounds >= productSlabDetails.size()){
            for(int i = 0 ; i < productSlabDetails.size() ; i++){
                ProductSlabDetailFinal productSlabDetailFinal = new ProductSlabDetailFinal();
                productSlabDetailFinal.setSlabLowerLimit(productSlabDetails.get(i).getSlabLowerLimit());
                productSlabDetailFinal.setSlabUpperLimit(productSlabDetails.get(i).getSlabUpperLimit());
                productSlabDetailFinal.setSlabRate(productSlabDetails.get(i).getSlabRate());
                int slabDiffrence = 0;
                if(!(i==productSlabDetails.size()-1)){
                    if(i==0){
                        slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - productSlabDetails.get(i).getSlabLowerLimit() + 1;
                        totalSlabDifferance = slabDiffrence;
                    } else {
                        slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - productSlabDetails.get(i).getSlabLowerLimit() + 1;
                        totalSlabDifferance += slabDiffrence;
                    }
                    productSlabDetailFinal.setTotal(slabDiffrence * productSlabDetails.get(i).getSlabRate());
                    productSlabDetailFinals.add(productSlabDetailFinal);
                } else {
                    productSlabDetailFinal.setTotal((productQty - totalSlabDifferance) * productSlabDetails.get(i).getSlabRate());
                    productSlabDetailFinals.add(productSlabDetailFinal);
                }
            }
        }

        if(rounds < productSlabDetails.size()){
            Long mainQuantity = productQty;
            for(int i = 0 ; i < productSlabDetails.size() ; i++){
                ProductSlabDetailFinal productSlabDetailFinal = new ProductSlabDetailFinal();
                productSlabDetailFinal.setSlabLowerLimit(productSlabDetails.get(i).getSlabLowerLimit());
                productSlabDetailFinal.setSlabUpperLimit(productSlabDetails.get(i).getSlabUpperLimit());
                productSlabDetailFinal.setSlabRate(productSlabDetails.get(i).getSlabRate());
                int slabDiffrence = 0;
                if(!(i==productSlabDetails.size()-1)){
                    if(i==0){
                        slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - productSlabDetails.get(i).getSlabLowerLimit() + 1;
                        totalSlabDifferance += slabDiffrence;
                    } else {
                        slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - productSlabDetails.get(i).getSlabLowerLimit() + 1;
                        totalSlabDifferance += slabDiffrence;
                    }
                    if(slabDiffrence > mainQuantity) {
                        productSlabDetailFinal.setTotal(mainQuantity * productSlabDetails.get(i).getSlabRate());
                        productSlabDetailFinals.add(productSlabDetailFinal);
                    } else {
                        productSlabDetailFinal.setTotal(slabDiffrence * productSlabDetails.get(i).getSlabRate());
                        productSlabDetailFinals.add(productSlabDetailFinal);
                    }

                    mainQuantity = mainQuantity - slabDiffrence;

                } else {
                    productSlabDetailFinal.setTotal((productQty - totalSlabDifferance) * productSlabDetails.get(i).getSlabRate());
                    productSlabDetailFinals.add(productSlabDetailFinal);
                }
                if(i == rounds-1)
                    break;
            }
        }

        model.addAttribute("cartDetail", cartDetail);
        model.addAttribute("productSlabDetailFinals", productSlabDetailFinals);
        model.addAttribute("productSlabDetails", productSlabDetails);
        model.addAttribute("cartDetail", cartDetail);
        model.addAttribute("productQty", productQty);

        System.out.println("");
        return "user/apiPriceCalculation";
    }

    public int howManyRoundsToTake(Long productQty, List<ProductSlabDetail> productSlabDetails){

        Long mainQuantity = productQty;
        int rounds = 0;
        int slabDiffrence = 0;

        for(int i = 0 ; i < productSlabDetails.size() ; i++){
            if(mainQuantity>0 && i != (productSlabDetails.size()-1)){
                if(i==0){
                    slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - (productSlabDetails.get(i).getSlabLowerLimit() - 1);
                } else {
                    slabDiffrence = productSlabDetails.get(i).getSlabUpperLimit() - (productSlabDetails.get(i).getSlabLowerLimit() - 1);
                }

                if(slabDiffrence > mainQuantity){
                    rounds++;
                }
                else {
                    rounds++;
                }

                mainQuantity = mainQuantity - slabDiffrence;
            }
            else {
                break;
            }
        }

        while(!(mainQuantity <= 0)){
            mainQuantity = mainQuantity - slabDiffrence;
            rounds++;
        }

        return rounds;
    }

    @GetMapping(value = {"moreinfo/data/{id}"})
    public String moreInfoData(@PathVariable String id,
                               HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        String ret = "/home";
        try {

            if (id != null) {
                Product product = productRepository.findFirstById(Long.parseLong(pathVariableEncrypt.decrypt(id)));
                model.addAttribute("product", product);
                ret = "user/more_info";
            }

        } catch (Exception e) {
            LOG.error("Error getting details of product ", e);
        }

        return ret;
    }

    @GetMapping(value = {"/versionhisotry/{id}"})
    public String versionHistory(@PathVariable String id,
                                 HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        System.out.println("in version history...");
        String ret = "/home";
        try {

            if (id != null) {
                Product product = productRepository.findFirstById(pathVariableEncrypt.decryptId(id));
                model.addAttribute("product", product);
                ret = "user/version-history";
            }

        } catch (Exception e) {
            LOG.error("Error getting details of product ", e);
        }

        return ret;
    }

    @GetMapping(value = {"moreinfo/offer/{id}"})
    public String moreOffer(@PathVariable String id,
                            HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        String ret = "/home";
        try {

            if (id != null) {
                ProductOffer productOffer = productOfferRepository.findFirstById(Long.parseLong(pathVariableEncrypt.decrypt(id)));
                model.addAttribute("offer", productOffer);
                ret = "user/more_info_offer";
            }

        } catch (Exception e) {
            LOG.error("Error getting details of product ", e);
        }

        return ret;
    }

    @GetMapping(value = {"moreinfo/api/{id}"})
    public String moreInfoAPI(@PathVariable String id,
                              HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {

        String ret = "/home";
        try {

            if (id != null) {
                Product product = productRepository.findFirstById(Long.parseLong(pathVariableEncrypt.decrypt(id)));
                model.addAttribute("product", product);
                ret = "user/more_info_api";
            }

        } catch (Exception e) {
            LOG.error("Error getting details of product ", e);
        }

        return ret;
    }

    @GetMapping(value = "/getApiDetailPage/{apiId}")
    public String getProductDetailPage(ModelMap model, @PathVariable("apiId") String apiId) {

        String ret = "/home";
        try {

            if (apiId != null) {
                Product product = productRepository.findFirstById(Long.parseLong(pathVariableEncrypt.decrypt(apiId)));
                model.addAttribute("product", product);
                /*ret = "apiDetailPage";*/
            }

        } catch (Exception e) {
            LOG.error("Error getting details of product ", e);
        }

        return "apiDetailPage";
    }

    @RequestMapping(value = "/download/invoiceNew/{orderId}")
    public String pdfTest(Model model, @PathVariable Optional<String> orderId, HttpServletResponse response) throws Exception {

        boolean flagForApiAvailablity = false;

        Order order = orderRepository.findById(Long.valueOf(orderId.get())).get();
        List<OrderDetail> productDetails = order.getOrderDetailList();

        String orderNetPriceInWords = UserUtil.getMoneyIntoWords(Float.toString(order.getNetPrice()));
        orderNetPriceInWords = orderNetPriceInWords.substring(0,1).toUpperCase() + orderNetPriceInWords.substring(1);
        orderNetPriceInWords = orderNetPriceInWords.substring(0, orderNetPriceInWords.length() - 9);

        /*Map<String, String> data = new HashMap<String, String>();
        data.put("name", "Vivek");
        pdfGenaratorUtil.createPdf("test/greeting", data, orderId);*/

        Map<String, String> stringData = new HashMap<String, String>();
        stringData.put("orderNetPriceInWords", orderNetPriceInWords);

        Map<String, Order> orderMap = new HashMap<String, Order>();
        orderMap.put("order", order);

        Map<String, User> userMap = new HashMap<String, User>();
        userMap.put("user", order.getDaasUser());

        Map<String, List<OrderDetail>> productDetailsMap = new HashMap<String, List<OrderDetail>>();
        productDetailsMap.put("productDetails", productDetails);

        flagForApiAvailablity = isAPIPresentInUsersOrder(productDetails);

        Map<String, Boolean> flagApiMap = new HashMap<String, Boolean>();
        flagApiMap.put("flagApiMapDetail", flagForApiAvailablity);

        pdfGenaratorUtil.createPdf("checkout/dass-invoice-view-download", stringData, order.getId().toString(), orderMap, userMap, productDetailsMap, response, flagApiMap);


        return "redirect:/home";

    }

    private boolean isAPIPresentInUsersOrder(List<OrderDetail> productDetails) {
        for(int i=0; i<productDetails.size(); i++){
            if(productDetails.get(i).getProduct().getProductCategoryDetail().getProductType().getProductTypeName().equals("Web Service")){
                return true;
            }
        }
        return false;
    }


//    @GetMapping(value = {"moreinfo/offer/{id}"})
//    public String moreInfoOffer(@PathVariable Long id,
//                              HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
//
//        String ret = "/home";
//        try {
//
//            if(id != null){
//                ProductOffer offer = productOfferRepository.findFirstById(id);
//                model.addAttribute("offer", offer);
//                ret = "user/more_info_offer";
//            }
//
//        } catch (Exception e) {
//            LOG.error("Error getting details of offer ", e);
//        }
//
//        return ret;
//    }


    @PostMapping(value = {"/password/edit"})
    public String passwordEditPost(@ModelAttribute("passwordForm") PasswordForm passwordForm, BindingResult result, HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model,
                                   @PageableDefault(page = 0, size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {

        //System.out.println(passwordForm.getCurrentPassword());
        boolean success = false;
        String ret = "user/change_password";
        try {

            User currentUser = userUtil.getCurrentUser();

            Set<ConstraintViolation<PasswordForm>> violations = validator.validate(passwordForm);
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                model.addAttribute("passwordForm", passwordForm);
                alerts.setError("required.fields.missing");
            } else {
                if (passwordEncoder.matches(passwordForm.getCurrentPassword(), currentUser.getPassword())
                        &&
                        passwordForm.getPassword().equals(passwordForm.getConfirmPassword())
                ) {
                    currentUser.setPassword(passwordEncoder.encode(passwordForm.getPassword()));
                    userRepository.save(currentUser);
                    success = true;
                    alerts.setSuccess("Password changed");
                } else {
                    alerts.setError("Wrong current password or confirm password do not match");
                }
            }

        } catch (Exception e) {
            LOG.error("Error saving user info", e);
            alerts.setError("general.error.msg");
        }
        model.addAttribute("active", "profile");
        model.addAttribute("success", success);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        return ret;
    }

    @GetMapping(value = {"/profile/edit"})
    public String passwordEdit(HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        String ret = "/home";
        try {
            User user = userUtil.getCurrentUser();
            if (user != null) {
                model.addAttribute("editUser", new EditUser());

                //model.addAttribute("active", (active.isPresent() && active.get().equalsIgnoreCase("user")) ? "user" : "profile");
                ret = "user/edit_profile";
            }
        } catch (Exception e) {
            LOG.error("Error getting details of users ", e);
        }
        model.addAttribute("success", false);
        System.out.println("");
        return ret;
    }

    @PostMapping(value = {"/profile/edit"})
    public String profileEditPost(@ModelAttribute("editUser") EditUser editUser, HttpServletRequest request, BindingResult result,
                                  RedirectAttributes redirectAttributes, ModelMap model) {
        System.out.println("");
        boolean success = false;
        String ret = "user/edit_profile";
        try {
            User user = userUtil.getCurrentUser();

            Set<ConstraintViolation<EditUser>> violations = validator.validate(editUser);
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                model.addAttribute("editUser", editUser);
                alerts.setError("required.fields.missing");
            }


        } catch (Exception e) {
            LOG.error("Error saving user info", e);
            alerts.setError("general.error.msg");
        }
        model.addAttribute("success", false);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        System.out.println("");
        return ret;
    }

    @GetMapping(value = "/aerror")
    public String error() {
        return "404";
    }


    /**
     * @param user
     * @param result
     * @param request
     * @param redirectAttributes
     * @param model
     * @return
     */
    @PostMapping(value = "register")
    public String postRegister(@Valid @ModelAttribute("user") User user, BindingResult result, HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        System.out.println("Inside out...");
        String ret = "redirect:/login";
        Cart cartForUser = new Cart();
        try {
            if (result.hasErrors()) {
                model.addAttribute("user", user);
                alerts.setError("Errors found. Check ▲");
                ret = "user/register";
            } else {
                try {
                    // Get default role
                    UserRole role = roleRepository.findByRole(serviceUtil.getDefaultRole());
                    Set<UserRole> userRoles = new HashSet<>();
                    userRoles.add(role);
                    user.setUserRoles(userRoles);
                    // Set encoded password
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    user.setUserRoles(userRoles);
                    user.setStatus(false);
                    // Save user
                    userRepository.save(user);
                    cartForUser.setDaasUser(user);
                    cartRepository.save(cartForUser);

                    //Sending verification link
                    eventPublisher.publishEvent(new RegistrationEvent(user));
                    alerts.setSuccess("registration.success");

                } catch (Exception e) {
                    LOG.error("Error saving user ", e);
                }
            }
        } catch (Exception e) {
            alerts.setError("user.save.error");
            model.addAttribute("user", user);
            LOG.error("Error saving user ", e);
            ret = "user/register";
        }
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();
        return ret;
    }

    @PostMapping(value = "register-new")
    public String postRegisterNew(@Valid @ModelAttribute("user") User user, BindingResult result, HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        String ret = "redirect:/login";
        Cart cartForUser = new Cart();
        try {
            if (result.hasErrors()) {
                model.addAttribute("user", user);
                alerts.setError("Required fields missing");
                ret = "user/register-new";
            } else {
                try {
                    // Get default role
                    UserRole role = roleRepository.findByRole(serviceUtil.getDefaultRole());
                    Set<UserRole> userRoles = new HashSet<>();
                    userRoles.add(role);
                    user.setUserRoles(userRoles);
                    // Set encoded password
                    user.setPassword(passwordEncoder.encode(user.getPassword()));
                    user.setUserRoles(userRoles);
                    // Save user
                    userRepository.save(user);
                    cartForUser.setDaasUser(user);
                    cartRepository.save(cartForUser);

                    //Sending verification link
                    eventPublisher.publishEvent(new RegistrationEvent(user));
                    alerts.setSuccess("registration.success");

                } catch (Exception e) {
                    LOG.error("Error saving user ", e);
                }
            }
        } catch (Exception e) {
            alerts.setError("user.save.error");
            model.addAttribute("user", user);
            LOG.error("Error saving user ", e);
            ret = "user/register-new";
        }
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();
        return ret;
    }


    @GetMapping(value = {"registration/email/verification"})
    public String verification(@RequestParam("token") String token, HttpServletRequest request, RedirectAttributes redirectAttributes, ModelMap model) {
        String ret = redirect + "registration";
        try {

            VerificationToken verificationToken = verificationRepository.findFirstByToken(token);
            if (verificationToken == null) { // if null redirect back
                alerts.setError("token.verification.error");
            } else {


                // Get user from verification token
                User verificationTokenUser = verificationToken.getUser();
                Calendar cal = Calendar.getInstance();

                // check if token is still valid
                // if not redirect back and ask to generate token again
                Duration diff = Duration.between(LocalDateTime.now(), verificationToken.getExpiryDate());
                if (diff.isNegative()) {
                    String[] args = new String[2];
                    args[0] = serviceUtil.getBaseUrl() + "/resendlink";
                    args[1] = "Resend token";
                    alerts.setError("token.expired", args);
                    //alerts.setAlertRedirectAttribute(redirectAttributes);
                } else {

                    // if verification successful set user status to enabled
                    //verificationTokenUser.setEnabled(true);
                    verificationTokenUser.setStatus(true);
                    userRepository.save(verificationTokenUser);


                    //alerts.setSuccess("token.verification.success");
                    model.addAttribute("loginCssClass", "active");
                    //authWithAuthManager(servletRequest, verificationToken.getUser());
                    ret = "redirect:/login?verification=success";
                }
            }
        } catch (Exception e) {

        }
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        return ret;
    }

    @GetMapping(value = {"forgot/password"})
    public String forgotPassword(@RequestParam("userEmail") String email, ModelMap model, RedirectAttributes redirectAttributes) {
        try {
            if (email != null && CommonUtil.isEmailIdValid(email)) {
                User user = userRepository.findFirstByEmail(email);
                if (user != null) {
                    ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findFirstByUser(user);
                    LocalDateTime expiryDateTime = LocalDateTime.now().plusMinutes(Long.parseLong(environment.getProperty("forgot.password.expiry.minutes")));
                    if (forgotPasswordToken == null) {
                        forgotPasswordToken = new ForgotPasswordToken();
                        forgotPasswordToken.setUser(user);
                    }
                    forgotPasswordToken.setToken(CommonUtil.generateToken());
                    forgotPasswordToken.setExpiryDate(expiryDateTime);
                    forgotPasswordToken.setStatus(true);
                    forgotPasswordRepository.save(forgotPasswordToken);
                    eventPublisher.publishEvent(new ForgotPasswordEvent(user, localeHelper.getCurrentLocale(), forgotPasswordToken));
                }
                alerts.setSuccess("forgot.password.link.sent");
            } else {
                alerts.setError("email.invalid.format");
            }
        } catch (Exception e) {
            LOG.error("Error generating forgot password link ", e);
        }
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();
        return "redirect:/login";
    }


    @GetMapping(value = {"forgot/password/token"})
    public String resetPassword(@RequestParam(value = "token", defaultValue = "-") String token,
                                ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "reset";
        ResetPasswordForm resetPasswordForm = new ResetPasswordForm();
        Boolean expired = false;
        try {
            resetPasswordForm.setToken(token);
            ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findFirstByTokenAndStatus(token, true);
            if (forgotPasswordToken != null) {
                User user = forgotPasswordToken.getUser();
                model.addAttribute("user", user);
                ret = baseTemplate + "reset";
                resetPasswordForm.setUid(pathVariableEncrypt.encrypt(user.getId().toString()));
            } else {
                expired = true;
                alerts.setError("forgot.password.link.expired");
            }
        } catch (Exception e) {
            LOG.error("Error resetting password", e);
        }


        model.addAttribute("expired", expired);
        model.addAttribute("token", token);
        model.addAttribute("resetPasswordForm", resetPasswordForm);
        alerts.setAlertModelAttribute(model);
        alerts.setAlertRedirectAttribute(redirectAttributes);
        alerts.clearAlert();
        return ret;
    }


    @PostMapping(value = {"forgot/password/token"})
    public String resetPasswordSubmit(@Valid @ModelAttribute("resetPasswordForm") ResetPasswordForm resetPasswordForm,
                                      BindingResult result,
                                      ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = baseTemplate + "reset";
        Boolean expired = false;
        try {
            if (result.hasErrors()) {
                alerts.setError("required.fields.missing");
            } else {

                if (resetPasswordForm.getPassword().equalsIgnoreCase(resetPasswordForm.getResetPassword())) {
                    ForgotPasswordToken forgotPasswordToken = forgotPasswordRepository.findFirstByTokenAndStatus(resetPasswordForm.getToken(), true);

                    Duration diff = Duration.between(LocalDateTime.now(), forgotPasswordToken.getExpiryDate());
                    if (diff.isNegative()) {
                        alerts.setError("forgot.password.link.expired");
                        expired = true;
                    } else {
                        if (forgotPasswordToken != null) {
                            User user = forgotPasswordToken.getUser();
                            if (user != null) {
                                user.setPassword(passwordEncoder.encode(resetPasswordForm.getPassword()));
                                userRepository.save(user);

                                forgotPasswordToken.setStatus(false);
                                forgotPasswordRepository.save(forgotPasswordToken);
                                alerts.setSuccess("password.reset.success");
                            } else {
                                alerts.setError("general.error.msg");
                            }
                        } else {
                            alerts.setError("forgot.password.link.expired");
                        }
                    }

                } else {
                    alerts.setError("password.retype.invalid");
                }
            }
        } catch (Exception e) {
            LOG.error("Error resetting password ", e);
        }
        model.addAttribute("expired", expired);
        alerts.setAlertModelAttribute(model);
        alerts.clearAlert();
        model.addAttribute("resetPasswordForm", resetPasswordForm);
        return ret;
    }


    @GetMapping(value = {"UI_flowpaper_desktop_flat"})
    public String getPdfhtml() {
        try {

        } catch (Exception e) {

        }
        return "UI_flowpaper_desktop_flat";
    }

    @GetMapping(value = {"UI_flowpaper_mobile"})
    public String getPdfhtmlMobile() {
        try {

        } catch (Exception e) {

        }
        return "UI_flowpaper_mobile";
    }

    @PostMapping("sendMessage")
    public String sendMessage(@ModelAttribute("daasmsg") DaasMsg daasmsg, ModelMap model){
        /*eventPublisher.publishEvent(new OCRPurchaseSuccessEvent(daasUser, order, orderDetail, orderDetailList));*/
        eventPublisher.publishEvent(new SendMessageEvent(daasmsg));
     return "user/send-message";
    }

}
