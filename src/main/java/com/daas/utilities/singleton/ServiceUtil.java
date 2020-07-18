package com.daas.utilities.singleton;

import com.daas.constants.Constants;
import com.daas.entities.DaaS.*;
import com.daas.entities.user.VerificationToken;
import com.daas.repositories.daas.*;
import com.daas.utilities.base.BaseServiceUtil;
import com.daas.utilities.session.UserUtil;
import com.daas.entities.user.User;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.net.ssl.HandshakeCompletedEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * IMPORTANT NOTE : Please never use this class for specific user operations like updating or getting stored values in this class as this class is singleton class
 * and it will be used across the users and you may end getting wrong values ...
 * Thank you
 */

public class ServiceUtil extends BaseServiceUtil {

    public final static Logger LOG = LogManager.getLogger(ServiceUtil.class.getName());


    @Autowired
    private UserUtil userUtil;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Autowired
    private ProductCategoryDetailRepository productCategoryDetailRepository;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductOfferRepository productOfferRepository;


    public Boolean sendPurchaseSuccessEmail(User daasUser, Order order, OrderDetail orderDetail, List<OrderDetail> orderDetailList) {

        try {

            return userUtil.sendPurchaseSuccessEmail(daasUser, order, orderDetail, orderDetailList);

        } catch (Exception e) {
            LOG.error("Error sending purchase success email", e);
        }

        return false;
    }

    public Boolean sendAPI90PerMail(User user, Order order, OrderDetail orderDetail){

        try {

            return userUtil.sendAPI90PerMail(user, order, orderDetail);

        } catch (Exception e) {
            LOG.error("Error sending api90percent success email", e);
        }

        return false;
    }

    public Boolean sendMessageEventMail(DaasMsg daasMsg) {

        try {

            return userUtil.sendMessageEventMail(daasMsg);

        } catch (Exception e) {
            LOG.error("Error sending send message email", e);
        }

        return false;
    }

    public Boolean sendOCRPurchaseSuccessEmail(User daasUser, Order order, OrderDetail orderDetail, List<OrderDetail> orderDetailList) {

        List<OrderDetail> productDataList = new ArrayList<>();
        List<OrderDetail> productApiList = new ArrayList<>();

        try {

            for (int i = 0; i < orderDetailList.size(); i++) {

                Product product = orderDetailList.get(i).getProduct();
                String productTypeSrt = product.getProductCategoryDetail().getProductType().getProductTypeName();

                if (productTypeSrt.equalsIgnoreCase("Customs Data")) {
                    productDataList.add(orderDetailList.get(i));
                }

                if (productTypeSrt.equalsIgnoreCase("Web Service")) {
                    productApiList.add(orderDetailList.get(i));
                }

            }

            return userUtil.sendOCRPurchaseSuccessEmail(daasUser, order, orderDetail, orderDetailList, productDataList, productApiList);

        } catch (Exception e) {
            LOG.error("Error sending purchase success email", e);
        }

        return false;
    }

    public Boolean sendProductUpdateSuccessEmail(List<String> usersListEmailSrt, Product productData){

        try {

            return userUtil.sendProductUpdateSuccessEmail(usersListEmailSrt, productData);

        } catch (Exception e) {
            LOG.error("Error sending purchase success email", e);
        }

        return false;
    }

    public Boolean sendVerificationLink(User user) {
        try {
            String token = CommonUtil.generateToken();

            VerificationToken verificationToken = new VerificationToken();
            verificationToken.setExpiryDate(CommonUtil.getExpiryDate(30));
            verificationToken.setToken(token);
            verificationToken.setUser(user);
            verificationRepository.save(verificationToken);

            return userUtil.sendVerificationLink(user, verificationToken);
        } catch (Exception e) {
            LOG.error("Error sending verification link email", e);
        }
        return false;
    }

    public String getDefaultRole() {
        try {
            return environment.getRequiredProperty("default.role");
        } catch (Exception e) {

        }
        return Constants.ROLE_USER;
    }

    public String getDefaultSubuserRole() {
        try {
            return environment.getRequiredProperty("default.role");
        } catch (Exception e) {

        }
        return Constants.ROLE_SUB_USER;
    }


    public Integer getSubscriptionAmount(String type, Integer count) {
        Integer amountPerUser = (type.equalsIgnoreCase("y")) ? Integer.parseInt(this.getConfig("PER_USER_AMOUNT_YEARLY")) : Integer.parseInt(this.getConfig("PER_USER_AMOUNT_MONTHLY"));
        return count * (amountPerUser) * 100;
    }

    public String randomString() {
        try {
            int leftLimit = 97; // letter 'a'
            int rightLimit = 122; // letter 'z'
            int targetStringLength = 10;
            Random random = new Random();
            StringBuilder buffer = new StringBuilder(targetStringLength);
            for (int i = 0; i < targetStringLength; i++) {
                int randomLimitedInt = leftLimit + (int)
                        (random.nextFloat() * (rightLimit - leftLimit + 1));
                buffer.append((char) randomLimitedInt);
            }
            return buffer.toString();
        } catch (Exception e) {

        }
        return null;
    }

    public boolean isAvailableInCart(Product product, HttpServletRequest request) {
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

        for (int i = 0; i < cartDetails.size(); i++) {
            if (cartDetails.get(i).getProduct().getId().equals(product.getId())) {
                return true;
            }
        }
        return false;
    }

    public int getCartEntriesCount(HttpServletRequest request) {
        User daasUser = null;
        if(userUtil.getCurrentUser()!=null && userUtil.getCurrentUser().getId()!=1)
            daasUser = userUtil.getCurrentUser();
        Cart cart = null;
        List<CartDetail> cartDetails = null;
        if (daasUser != null) {
            cart = cartRepository.findByDaasUser(daasUser);
        } else {
            HttpSession session = request.getSession();
            String currentSession = session.getId();
            cart = cartRepository.findCartBySessionId(currentSession);
        }
        if (cart == null) {
            cartDetails = new ArrayList<>();
            return cartDetails.size();
        } else {
            cartDetails = cart.getCartDetails();
            return cartDetails.size();
        }
    }

    public boolean isAvailableInOrder(Product product) {

        User daasUser = userUtil.getCurrentUser();
        Order order = orderRepository.findFirstByDaasUser(daasUser);
        List<OrderDetail> orderDetail = null;

        if (order == null) {
            orderDetail = new ArrayList<OrderDetail>();
        } else {
            orderDetail = order.getOrderDetailList();
        }

        for (int i = 0; i < orderDetail.size(); i++) {
            if (orderDetail.get(i).getProduct().getId().equals(product.getId())) {
                return true;
            }
        }
        return false;
    }

    public boolean isExpiryDatePassed(Product product) {

        User daasUser = userUtil.getCurrentUser();
        Order order = orderRepository.findFirstByDaasUser(daasUser);
        List<OrderDetail> orderDetail = null;

        LocalDateTime localDateTime = LocalDateTime.now();

        if (order == null) {
            orderDetail = new ArrayList<OrderDetail>();
        } else {
            orderDetail = order.getOrderDetailList();
        }

        for (int i = 0; i < orderDetail.size(); i++) {
            if (localDateTime.isAfter(orderDetail.get(i).getProductExpiryDate())) {
                return true;
            }
        }
        return false;
    }

    public boolean isThumbnailNull(Product product) {

        if (product.getProductThumbnailName() == null) {
            return true;
        }

        return false;
    }

    public boolean isOfferAvailedForCart() {
        System.out.println("inside...");
        User daasUser = userUtil.getCurrentUser();
        Cart cart = cartRepository.findByDaasUser(daasUser);
        if (cart != null) {
            List<CartDetail> cartDetailList = cart.getCartDetails();
            for (CartDetail c : cartDetailList) {
                if (c.getProductOffer() != null) {
                    System.out.println(c.getProductOffer());
                }
            }
        }
        System.out.println("outside...");
        return false;
    }

    public boolean isOfferAvailed(ProductOffer offer) {
        User daasUser = userUtil.getCurrentUser();
        Cart cart = cartRepository.findByDaasUser(daasUser);
        if (cart != null) {
            List<CartDetail> cartDetailList = cart.getCartDetails();
            for (CartDetail c : cartDetailList) {
                if (c.getProductOffer() != null) {
                    if (c.getProductOffer().getId() == offer.getId()) {
                        return true;
                    }
                }
            }
            List<Order> orderList = orderRepository.findAllByDaasUser(daasUser);
            List<OrderDetail> orderDetailList = new ArrayList<>();
            if (orderList != null) {
                for (Order o : orderList) {
                    orderDetailList.addAll(o.getOrderDetailList());
                }
            }
            for (OrderDetail o : orderDetailList) {
                if (o.getOfferAppliedId() == offer.getId()) {
                    return true;
                }
            }

        } else {
            return false;
        }
        return false;
    }

    public boolean isOfferAvailed(ProductOffer offer, HttpServletRequest request) {
        //User daasUser = userUtil.getCurrentUser();
        HttpSession session = request.getSession();
        String currentSession = session.getId();
        Cart cart = cartRepository.findCartBySessionId(currentSession);
        if (cart != null) {
            List<CartDetail> cartDetailList = cart.getCartDetails();
            for (CartDetail c : cartDetailList) {
                if (c.getProductOffer() != null) {
                    if (c.getProductOffer().getId() == offer.getId()) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public List<ProductSlabDetail> getProductSlabDetails(Product product){

        List<ProductSlabDetail> productSlabDetails = product.getProductSlab().getProductSlabDetailList();

        return productSlabDetails;

    }

    public Long getRemainingApiCalls(OrderDetail orderDetail){

        Long usedApiCallCount = orderDetail.getUsedApiCallCount();

        if(orderDetail.getUsedApiCallCount() == null){
            usedApiCallCount = 0L;
        }

        Long remainingApiCount = orderDetail.getProductQty() - usedApiCallCount;

        return remainingApiCount;

    }

    public String getDataType(CartDetail cartDetail){

        return cartDetail.getProduct().getProductCategoryDetail().getProductType().getProductTypeName();

    }

    public String isApiOrData(OrderDetail orderDetail){

        return orderDetail.getProduct().getProductCategoryDetail().getProductType().getProductTypeName();

    }

    public boolean isThereAnyRecordRelatedToCategoryAndDataType(Long categoryId,String dataType){

        ProductType productType = null;
        if(dataType.equals("Customs Data")){
            productType = productTypeRepository.findFirstByProductTypeName("Customs Data");
        }
        else {
            productType = productTypeRepository.findFirstByProductTypeName("Web Service");
        }


        ProductCategoryDetail category = productCategoryDetailRepository.findFirstById(categoryId);
        ProductCategory productCategory = category.getProductCategory();
        List<ProductCategoryDetail> productCategoryList = productCategoryDetailRepository.findAllByProductCategoryAndProductType(productCategory,productType);
        Long count = productRepository.countAllByProductCategoryDetailInAndStatusIsTrue(productCategoryList);
        return count >= 1;
    }

    public boolean isThereAnyOfferAvailable(){
        List<ProductOffer> productOfferList = productOfferRepository.findAllByStatusAndEndDateAfter(true, LocalDateTime.now());
        return productOfferList.size() >= 1;
    }

    public boolean isAPIPresentInUsersCart(List<CartDetail> cartDetails){
        for(int i=0; i<cartDetails.size(); i++){
            if(cartDetails.get(i).getProduct().getProductCategoryDetail().getProductType().getProductTypeName().equals("Web Service")){
                return true;
            }
        }
        return false;
    }

    public boolean isAPIPresentInUsersOrder(List<OrderDetail> orderDetailList){
        for(int i=0; i<orderDetailList.size(); i++){
            if(orderDetailList.get(i).getProduct().getProductCategoryDetail().getProductType().getProductTypeName().equals("Web Service")){
                return true;
            }
        }
        return false;
    }

}
