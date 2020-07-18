package com.daas.controllers.daas;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.daas.entities.DaaS.*;
import com.daas.entities.user.User;
import com.daas.events.event.daas.OCRPurchaseSuccessEvent;
import com.daas.events.event.daas.PurchaseSuccessEvent;
import com.daas.repositories.daas.*;
import com.daas.repositories.iface.user.StripeUsersRepository;
import com.daas.repositories.iface.user.UserRepository;
import com.daas.utilities.session.UserUtil;
import com.daas.entities.user.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.stripe.param.checkout.SessionCreateParams.LineItem;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import pl.allegro.finance.tradukisto.MoneyConverters;
import sun.misc.FloatingDecimal;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Controller
@RequestMapping("/stripe")
public class StripeController {

    public static final Logger logger = LogManager.getLogger(StripeController.class.getName());

    @Value("${base.url}")
    private String baseURL;

    @Value("${stripe.public.key}")
    private String publishableKey;
    @Value("${stripe.secret.key}")
    private String secretKey;

    /*@Value("${stripeGTD.public.key}")
    private String publishableKey;
    @Value("${stripeGTD.secret.key}")
    private String secretKey;*/

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private StripeUsersRepository stripeUsersRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductVersionRepository productVersionRepository;

    @Autowired
    private CartDetailRepository cartDetailRepository;

    @Autowired
    protected ApplicationEventPublisher eventPublisher;

    @Transactional
    @RequestMapping("/getSCheckoutPage")
    public String getStripeCheckoutPage(Model model) throws StripeException {

        /*Stripe.apiKey = "sk_test_kfQBJauZkXiXn1YNELy00zC200XaEVhSJL";*/
        Stripe.apiKey = secretKey;

        User daasUser = userUtil.getCurrentUser();
        if(daasUser==null){
            return "redirect:/login";
        }
        Cart cart = cartRepository.findByDaasUser(daasUser);
        List<CartDetail> cartDetails = cart.getCartDetails();
        /*  List<Product> productList = cart.getProductList();*/

/*
        User user = userUtil.getCurrentUser();
        StripeUsers stripeUser = stripeUsersRepository.findFirstByUser(user);
        Date date = new Date();
*/

        /*for single product*/
        /*SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setName(productList.get(0).getProductName())
                                .setDescription(productList.get(0).getProductDescription())
                                .setAmount((long) productList.get(0).getProductPrice() * 100)
                                .setCurrency("usd")
                                .setQuantity(1L)
                                .build())
                .setSuccessUrl("http://127.0.0.1:8880/home?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://127.0.0.1:8880/getCartPage")
                .build();*/

        /*for multi product*/
        List<LineItem> listLineItems = new ArrayList<LineItem>();
/*.setDescription(cartDetail.getProduct().getProductDescription())*/
/*.setAmount((long) ((cartDetail.getTotalPrice() / cartDetail.getQuantity()) * 100))*/

        /*considering all api calls as a unit*/
/*.setAmount((long) Math.round((cartDetail.getTotalPrice() / cartDetail.getQuantity()) * 100))*/
/*.setQuantity(cartDetail.getQuantity())*/
        float netPrice = 0;
        for (CartDetail cartDetail : cartDetails) {
            /*Float fAmount = cartDetail.getTotalPrice() / cartDetail.getQuantity();
            long lAmount = fAmount.longValue();*/
            listLineItems.add(new LineItem.Builder()
                    .setName(cartDetail.getProduct().getProductName())
                    .setDescription(" ")
                    .setAmount((long) cartDetail.getTotalPrice() * 100)
                    .setCurrency("usd")
                    .setQuantity(1L)
                    .build()
            );
            netPrice += cartDetail.getTotalPrice();

        }

/*        for (int i = 0; i < productList.size(); i++) {
            listLineItems.add(new LineItem.Builder()
                    .setName(productList.get(i).getProductName())
                    .setDescription(productList.get(i).getProductDescription())
                    .setAmount((long) productList.get(i).getProductPrice() * 100)
                    .setCurrency("usd")
                    .setQuantity(1L)
                    .build()
            );
            netPrice = netPrice + productList.get(i).getProductPrice();
        }*/

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .addAllLineItem(listLineItems)
                .setSuccessUrl(baseURL + "/stripe/placingorder?session_id={CHECKOUT_SESSION_ID}&user_id=" + daasUser.getId()
                        + "&net_price=" + netPrice + "")
                .setCancelUrl(baseURL + "/getCartPage")
                .setCustomerEmail(daasUser.getEmail())
                .build();


        Session session = Session.create(params);

        model.addAttribute("sessionId", session);
        model.addAttribute("stripePublicKey", publishableKey);
        /*model.addAttribute("stripePublicKey", "pk_test_7hMTOVOfhHIxmmlIVI2B5yek00Emz0FSjK");*/
        System.out.println("");
        return "checkout/stripe-checkout-page";
    }

    //@Transactional
    @GetMapping("/placingorder")
    public String placingOrder(@RequestParam(value = "session_id", required = false) String sessionId,
                               @RequestParam(value = "user_id", required = false) Long userId,
                               @RequestParam(value = "net_price", required = false) float netPrice,
                               Model model) throws StripeException {

        User daasUser = userUtil.getCurrentUser();
        Cart cart = cartRepository.findByDaasUser(daasUser);
        List<CartDetail> cartDetails = cart.getCartDetails();
        /*  List<Product> productList = cart.getProductList();*/

        boolean isOrderPlaced = false;

        if (!(daasUser.getId() == userId)) {
            logger.error("user mismatch...");
        }

        //doing entry in dass_order

        Random randNumber = new Random();
        int transNum = randNumber.nextInt(999999999);

        Order order = new Order();
        order.setEmailId(daasUser.getEmail());
        order.setNetPrice(netPrice);       //price including discount
        order.setDaasUser(daasUser);
        order.setPurchaseDate(LocalDateTime.now());
        order.setTransactionNumber((long) transNum);
        // order.setStripeSessionId(sessionId);
        /*order.setDiscount(0);   //fill this if discount is applied*/
        /*order.setGrossPrice(0);     //price excluding discount - uncomment it if there is discount*/
        /*order.setOfferAppliedId();  //uncomment if required*/
        /*order.setTax();*/


        isOrderPlaced = true;

        //doing entry in dass_order_detail
        List<OrderDetail> orderDetailList = new ArrayList<OrderDetail>();

        isOrderPlaced = false;
        OrderDetail orderDetail = null;
        for (CartDetail cartDetail : cartDetails) {
            orderDetail = new OrderDetail();

            ProductVersion productVersion = productVersionRepository.findFirstByProductsOrderByProductVersionDesc(cartDetail.getProduct());
            LocalDateTime productExpiryDate = order.getPurchaseDate().plusYears(1);
            orderDetail.setDataVersion(productVersion.getProductVersion());
            orderDetail.setProductName(cartDetail.getProduct().getProductName());
            orderDetail.setProductQty(cartDetail.getQuantity());   //for zip
            /*orderDetail.setOrderId(order);  //why 'order'*/
            orderDetail.setProductExpiryDate(productExpiryDate);
            orderDetail.setProduct(cartDetail.getProduct());


            ProductOffer offer = cartDetail.getProductOffer();
            if (offer != null) {
                orderDetail.setOriginalPrice(cartDetail.getProduct().getProductPrice()*cartDetail.getQuantity());
                orderDetail.setDiscount(offer.getDiscountRate());
                orderDetail.setNetPrice(cartDetail.getTotalPrice());
                orderDetail.setOfferAppliedId(offer.getId());
            }else{
                orderDetail.setOriginalPrice(cartDetail.getTotalPrice());
                orderDetail.setDiscount(0);
                orderDetail.setNetPrice(cartDetail.getTotalPrice());
                orderDetail.setOfferAppliedId(null);
            }

            orderDetailList.add(orderDetail);
            cartDetailRepository.delete(cartDetail);
        }
        order.setOrderDetailList(orderDetailList);

/*        for (int i = 0; i < productList.size(); i++) {

            orderDetail = new OrderDetail();

            ProductVersion productVersion = productVersionRepository.findFirstByProductsOrderByProductVersionDesc(productList.get(i));
            LocalDateTime productExpiryDate = order.getPurchaseDate().plusYears(1);

            orderDetail.setDataVersion(productVersion.getProductVersion());
            orderDetail.setOriginalPrice(productList.get(i).getProductPrice());
            orderDetail.setProductName(productList.get(i).getProductName());
            orderDetail.setProductQty(1);   //for zip
            orderDetail.setOrderId(order);
            orderDetail.setProductExpiryDate(productExpiryDate);
            //orderDetail.setDiscount(0);
            //orderDetail.setNetPrice(0);   //after discount is applied
            //orderDetail.setOfferAppliedId(0);
            //orderDetail.setSlabPrice(0);    //for api
            //orderDetail.setUsedApiCallCount(0);
            //orderDetail.setSbuCode(null);

        }*/

        orderRepository.save(order);
        /*        orderDetailRepository.save(orderDetail);*/
        isOrderPlaced = true;

        //Sending an email for PurchaseSuccess
        eventPublisher.publishEvent(new PurchaseSuccessEvent(daasUser, order, orderDetail, orderDetailList));
        //Sending an email to ocr-admin
        eventPublisher.publishEvent(new OCRPurchaseSuccessEvent(daasUser, order, orderDetail, orderDetailList));

        /*      List<Product> tempProductList = productList;*/

        //code for deleting/emptying the user cart
        if (!(isOrderPlaced == false)) {
            /*for(CartDetail cartDetail : cartDetails){
                System.out.println(cartDetail.getProduct().getProductName());
                cartDetailRepository.delete(cartDetail);
            }*/
            clearCart(cart);
            /*Cart cart1 = cartRepository.findByDaasUser(daasUser);
            cartDetailRepository.deleteAllByCart(cart1);*/
            /*cartDetailRepository.deleteByCartId(cart.getId());*//*
             *//*cartDetailRepository.deleteByCart(cart);*//*
            for (int i = 0; i < cartDetails.size(); i++) {
                cartDetailRepository.deleteById(cartDetails.get(i).getId());
            }*/
        }


        String orderNetPriceInWords = getMoneyIntoWords(Float.toString(order.getNetPrice()));
        orderNetPriceInWords = orderNetPriceInWords.substring(0,1).toUpperCase() + orderNetPriceInWords.substring(1);
        orderNetPriceInWords = orderNetPriceInWords.substring(0, orderNetPriceInWords.length() - 9);

        model.addAttribute("orderNetPriceInWords", orderNetPriceInWords);
        model.addAttribute("order", order); //for transaction_Number, purchase_date, grand_total
        model.addAttribute("orderDetail", orderDetail); //for expiry_date
        model.addAttribute("productDetails", orderDetailList);   //for item, sbu-code/id, quantity, Subtotal  //What's this for????????????????????

        return "checkout/invoice-success";

    }

    public String getMoneyIntoWords(String input){
        MoneyConverters moneyConverters = MoneyConverters.ENGLISH_BANKING_MONEY_VALUE;
        return moneyConverters.asWords(new BigDecimal(input));
    }

    public void clearCart(Cart cart){
        cartDetailRepository.deleteAllByCart(cart);
    }

    /*@GetMapping(value = "/printInvoice")
    public String getInvoicePrinted(@RequestParam("orderId") Long id) throws DocumentException, FileNotFoundException {
        String pdfFilename = "Order" + id + ".pdf";
        OutputStream file = new FileOutputStream(new File(pdfFilename));
        Document document = new Document();

        PdfWriter.getInstance(document, file);
        User daasUser = userUtil.getCurrentUser();
        Optional<Order> order = orderRepository.findById(id);
        //List<OrderDetail> orderDetails = order.getOrderDetailList();
        //PdfDocument pdfDocument = new PdfDocument(new PdfWriter("Order"+id+".pdf"));
        Document layoutDocument = new Document(pdfDocument);
        layoutDocument.add(new Paragraph("INVOICE").setBold().setUnderline().setTextAlignment(TextAlignment.CENTER));
        layoutDocument.add(new Paragraph("Transaction ID : " + order.getTransactionNumber()).setTextAlignment(TextAlignment.RIGHT).setMultipliedLeading(0.2f));
        layoutDocument.add(new Paragraph("Purchase Date : " + order.getPurchaseDate()).setTextAlignment(TextAlignment.RIGHT).setMultipliedLeading(.2f));
        layoutDocument.add(new Paragraph("Expiry Date : " + order.getPurchaseDate().plusYears(1)).setTextAlignment(TextAlignment.RIGHT).setMultipliedLeading(.2f));
        Table table = new Table(new float[]{10,60,10,20});
        table.addCell(new Paragraph("Item Id").setBold());
        table.addCell(new Paragraph("Item Name").setBold());
        table.addCell(new Paragraph("Quantity").setBold());
        table.addCell(new Paragraph("Amount").setBold());
        for(OrderDetail ord : orderDetails){

        }
        return "home";
    }*/

}