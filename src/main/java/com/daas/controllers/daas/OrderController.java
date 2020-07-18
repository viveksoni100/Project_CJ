package com.daas.controllers.daas;

import com.daas.DTO.OrderWithDetail;
import com.daas.components.encrypter.PathVariableEncrypt;
import com.daas.entities.DaaS.*;
import com.daas.repositories.daas.ProductOfferRepository;
import com.daas.repositories.daas.ProductVersionRepository;
import com.daas.utilities.PdfGenaratorUtil;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import com.daas.entities.user.User;
import com.daas.repositories.daas.OrderRepository;
import com.daas.repositories.daas.ProductRepository;
import com.daas.utilities.session.UserUtil;
import com.sun.scenario.effect.ImageData;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;
import org.xhtmlrenderer.resource.XMLResource;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.util.*;
import java.util.List;

@Controller
@RequestMapping(value = "")
public class OrderController {

    public final static Logger LOG = LogManager.getLogger(OrderController.class.getName());
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PathVariableEncrypt pathVariableEncrypt;

    @Autowired
    private ProductOfferRepository productOfferRepository;

    @Autowired
    private ProductVersionRepository productVersionRepository;

    @Autowired
    private UserUtil userUtil;

    @Autowired
    private PdfGenaratorUtil pdfGenaratorUtil;

    @Autowired
    private TemplateEngine templateEngine;

    @Value("${daas.filepath}")
    private String filepath;

    @RequestMapping("/orderhistory")
    @Transactional
    public String orderHistory(Model model, HttpServletResponse httpResponse) throws IOException {
        User daasUser = userUtil.getCurrentUser();
        /*User daasUser = daasUserRepository.findById(1L).get();*/
        List<OrderDetail> orderList = new ArrayList<OrderDetail>();
        List<Order> order = orderRepository.findAllByDaasUser(daasUser);
        List<ProductOffer> productOffers = productOfferRepository.findAll();
        List<OrderWithDetail> orderWithDetails = new ArrayList<>();

        if (order != null) {
            OrderWithDetail orderWithDetail = null;
            for (Order o : order) {
                orderList.addAll(o.getOrderDetailList());
                for (OrderDetail orderDetail: o.getOrderDetailList()) {
                    orderWithDetail = new OrderWithDetail();
                    orderWithDetail.setId(o.getId());
                    orderWithDetail.setTransactionNumber(o.getTransactionNumber());
                    orderWithDetail.setPurchaseDate(o.getPurchaseDate());
                    orderWithDetail.setProductName(orderDetail.getProductName());
                    orderWithDetail.setProductQty(orderDetail.getProductQty());
                    orderWithDetail.setOriginalPrice(orderDetail.getOriginalPrice());
                    orderWithDetail.setNetPrice(orderDetail.getNetPrice());
                    orderWithDetail.setProductExpiryDate(orderDetail.getProductExpiryDate());
                    orderWithDetails.add(orderWithDetail);
                }
            }
        }

        model.addAttribute("orderWithDetails", orderWithDetails);
        model.addAttribute("orders", order);
        model.addAttribute("productOffers", productOffers);
        model.addAttribute("orderHistory", orderList);
        return "orderHistory";
    }

    @RequestMapping("/orderdetail")
    public String getOrderDetails(@RequestParam("orderId") int id, Model model) {
        User daasUser = userUtil.getCurrentUser();
        List<Order> orders = orderRepository.findAllByDaasUser(daasUser);
        //System.out.println("Order Id"+id);
        Order order = null;
        for (Order ord : orders) {
            if (ord.getId() == id) {
                order = ord;
            }
        }
        List<OrderDetail> orderDetails = new ArrayList<>();
        if (order != null) {
            orderDetails = order.getOrderDetailList();
            model.addAttribute("orderDetails", orderDetails);
        }
        return "orderDetails";
    }

    @RequestMapping("/subscription")
    public String subscription(Model model, HttpServletResponse httpResponse) throws IOException {

        User daasUser = userUtil.getCurrentUser();
        List<OrderDetail> orderList = new ArrayList<OrderDetail>();
        List<Order> order = orderRepository.findAllByDaasUser(daasUser);

        if (order != null) {
            for (Order o : order) {
                orderList.addAll(o.getOrderDetailList());
            }
        }

        List<OrderDetail> productDataList = new ArrayList<>();
        List<OrderDetail> productApiList = new ArrayList<>();

        for (int i = 0; i < orderList.size(); i++) {

            Product product = orderList.get(i).getProduct();
            String productTypeSrt = product.getProductCategoryDetail().getProductType().getProductTypeName();

            if (productTypeSrt.equalsIgnoreCase("Customs Data")) {
                productDataList.add(orderList.get(i));
            }

            if (productTypeSrt.equalsIgnoreCase("Web Service")) {
                productApiList.add(orderList.get(i));
            }

        }

        model.addAttribute("order", order);
        model.addAttribute("orderHistory", orderList);
        model.addAttribute("productDataList", productDataList);
        model.addAttribute("productApiList", productApiList);

        return "subscriptionDetail";
    }

    @RequestMapping("/subscriptionAPI")
    public String subscriptionAPI(Model model, HttpServletResponse httpResponse) throws IOException {

        User daasUser = userUtil.getCurrentUser();
        List<OrderDetail> orderList = new ArrayList<OrderDetail>();
        List<Order> order = orderRepository.findAllByDaasUser(daasUser);

        if (order != null) {
            for (Order o : order) {
                orderList.addAll(o.getOrderDetailList());
            }
        }

        List<OrderDetail> productDataList = new ArrayList<>();
        List<OrderDetail> productApiList = new ArrayList<>();

        for (int i = 0; i < orderList.size(); i++) {

            Product product = orderList.get(i).getProduct();
            String productTypeSrt = product.getProductCategoryDetail().getProductType().getProductTypeName();

            if (productTypeSrt.equalsIgnoreCase("Customs Data")) {
                productDataList.add(orderList.get(i));
            }

            if (productTypeSrt.equalsIgnoreCase("Web Service")) {
                productApiList.add(orderList.get(i));
            }

        }

        model.addAttribute("order", order);
        model.addAttribute("orderHistory", orderList);
        model.addAttribute("productDataList", productDataList);
        model.addAttribute("productApiList", productApiList);

        return "subscriptionDetailAPI";
    }


    @RequestMapping(value = "/downloadRequest/{productId}", method = RequestMethod.GET)
    /*@ResponseBody*/
    public void downloadfile(Model model, @PathVariable Long productId, HttpServletResponse response) {
        System.out.println("andar avyu...");
        User daasuser = userUtil.getCurrentUser();
        List<Order> userOrderList = orderRepository.findAllByDaasUser(daasuser);
        Product product = productRepository.findFirstById(productId);


        try {
            FileSystem fileSystem = FileSystems.getDefault();
            if (userOrderList != null && product != null) {
                List<Product> productPurchased = new ArrayList<>();
                for (Order order : userOrderList) {
                    List<OrderDetail> orderDetails = order.getOrderDetailList();
                    for (OrderDetail od : orderDetails) {
                        LocalDateTime timenow = LocalDateTime.now();
                        LocalDateTime expiry = od.getProductExpiryDate();
                        if (product.equals(od.getProduct()) && (expiry.isAfter(timenow))) {

                            Path path = Paths.get(filepath + product.getProductId() + fileSystem.getSeparator() + product.getDataFileName());

                            if (Files.exists(path)) {
                                File file = path.toFile();
                                Tika tika = new Tika();
                                response.setContentType(tika.detect(file));
                                String headerkey = "Content-Disposition";
                                String filename = product.getDataFileName();
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
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        /*  return null;*/
    }

    @RequestMapping(value = "/downloadRequestFromVersionHistory/{proVersionId}", method = RequestMethod.GET)
    /*@ResponseBody*/
    public void downloadfilefromversionhistory(Model model, @PathVariable String proVersionId, HttpServletResponse response) {

        System.out.println("in download file from version history...");

        Optional<ProductVersion> productVersion = productVersionRepository.findById(pathVariableEncrypt.decryptId(proVersionId));
        Product product = productRepository.findFirstById(productVersion.get().getProducts().getId());

        try {
            FileSystem fileSystem = FileSystems.getDefault();

                            String FileName = Float.toString(productVersion.get().getProductVersion()) + "_" + productVersion.get().getProducts().getProductId() + ".zip";
                            Path path = Paths.get(filepath + product.getProductId() + fileSystem.getSeparator() + FileName);
                            /*Path path = Paths.get(filepath + product.getProductId() + fileSystem.getSeparator() + product.getDataFileName());*/

                            if (Files.exists(path)) {
                                File file = path.toFile();
                                Tika tika = new Tika();
                                response.setContentType(tika.detect(file));
                                String headerkey = "Content-Disposition";
                                /*String filename = product.getDataFileName();*/
                                String filename = FileName;
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
        /*  return null;*/
        System.out.println("done 6e...");
    }

    @GetMapping(value = {"/view/invoice/{orderId}"})
    public String viewInvoice(Model model, @PathVariable Optional<String> orderId){

        Order order = orderRepository.findById(Long.valueOf(orderId.get())).get();
        List<OrderDetail> productDetails = order.getOrderDetailList();

        String orderNetPriceInWords = UserUtil.getMoneyIntoWords(Float.toString(order.getNetPrice()));
        orderNetPriceInWords = orderNetPriceInWords.substring(0,1).toUpperCase() + orderNetPriceInWords.substring(1);
        orderNetPriceInWords = orderNetPriceInWords.substring(0, orderNetPriceInWords.length() - 9);

        model.addAttribute("order", order);
        model.addAttribute("user", order.getDaasUser());
        model.addAttribute("productDetails", productDetails);
        model.addAttribute("orderNetPriceInWords", orderNetPriceInWords);

        return "checkout/dass-invoice-view";
    }

    /*@GetMapping(value = {"/download/invoiceNew/{orderId}"})
    public ResponseEntity<Resource> invoiceNew(@PathVariable Optional<String> orderId, HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("inside out...");
        ByteArrayInputStream bis = generatePDFInvoiceNew(orderId.get(), "test/greeting");

        //Note : use application/octetstream to directly download invoice
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=GTD_Invoice_"+orderId.get()+".pdf")
                .body(new InputStreamResource(bis));

    }
    private ByteArrayInputStream generatePDFInvoiceNew(String orderId, String templateName) throws DocumentException, FileNotFoundException, com.lowagie.text.DocumentException {

        *//*vivek*//*
        System.out.println("pdf generation is started...");
        Context ctx = new Context();
        String processedHtml = templateEngine.process(templateName, ctx);

        org.w3c.dom.Document document = XMLResource.load( new ByteArrayInputStream(processedHtml.getBytes())).getDocument();

        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocument( document, null );
        renderer.layout();

        FileOutputStream fos = new FileOutputStream("I_am_the_storm.pdf");
        renderer.createPDF(fos);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        *//*PdfWriter.getInstance(document, out);*//*
        System.out.println("done 6e...");

        return new ByteArrayInputStream(out.toByteArray());
    }*/

    @GetMapping(value = {"/download/invoice/{orderId}"})
    public ResponseEntity<Resource> invoice(@PathVariable Optional<String> orderId, HttpServletRequest request, HttpServletResponse response) throws Exception {

        System.out.println("In invoice");

//        Resource resource = fileStorageService.loadFileAsResource("/home/anand/projects/java/DAAS/daas_latest/daas/src/main/resources/transaction_dispute_form.pdf");
        ByteArrayInputStream bis = generatePDFInvoice(orderId.get());

        //Note : use application/octetstream to directly download invoice
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=GTD_Invoice_"+orderId.get()+".pdf")
                .body(new InputStreamResource(bis));

    }

    private ByteArrayInputStream generatePDFInvoice(String orderId) {

        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            Optional<Order> orderOptional = orderRepository.findById(Long.valueOf(orderId));
            Order order = orderOptional.get();
            List<OrderDetail> orderDetails = order.getOrderDetailList();

            PdfWriter.getInstance(document, out);

            document.open();
            // Add Text to PDF file ->
            Font font = FontFactory.getFont(FontFactory.COURIER, 14, BaseColor.BLACK);
            Font fontInvoice = FontFactory.getFont("Open Sans", 30);
            fontInvoice.setColor(255, 0, 0);

            Font fontInvoiceNumber = FontFactory.getFont("Open Sans", 10);
            fontInvoiceNumber.setColor(91, 91, 91);

            Font fontTableTitle = FontFactory.getFont("Open Sans", 12, Font.BOLD);
            fontInvoiceNumber.setColor(91, 91, 91);

            Font fontTableDetail = FontFactory.getFont("Open Sans", 12);
            fontTableDetail.setColor(91, 91, 91);

            Font fontGrandTotal = FontFactory.getFont("Open Sans", 12, Font.BOLD);
            fontTableDetail.setColor(91, 91, 91);

            Image img = Image.getInstance(getClass().getClassLoader().getResource("daas-logo-pdf.png"));
            //Image img = Image.getInstance("daas-logo-pdf.png");
            img.setAlignment(Element.ALIGN_LEFT);
            document.add(img);
            document.add(Chunk.NEWLINE);

            Paragraph invoice = new Paragraph("Invoice", fontInvoice);
            invoice.setAlignment(Element.ALIGN_RIGHT);
            document.add(invoice);
            document.add(Chunk.NEWLINE);

            Paragraph invoiceNumber = new Paragraph("Invoice Number : " + order.getId(), fontInvoiceNumber);
            invoiceNumber.setAlignment(Element.ALIGN_RIGHT);
            document.add(invoiceNumber);

            Paragraph transactionNumber = new Paragraph("Transaction ID  : " + order.getTransactionNumber().toString(), fontInvoiceNumber);
            transactionNumber.setAlignment(Element.ALIGN_RIGHT);
            document.add(transactionNumber);

            Paragraph purchaseDate = new Paragraph("Purchase Date  : " + order.getPurchaseDate().toString().substring(0, 10), fontInvoiceNumber);
            purchaseDate.setAlignment(Element.ALIGN_RIGHT);
            document.add(purchaseDate);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);
            document.add(Chunk.NEWLINE);

            Paragraph tableTitle = new Paragraph( "Product Name\t\t\t\tQuantity\t\t\tSubtotal", fontTableTitle);
            tableTitle.setAlignment(Element.ALIGN_CENTER);
            document.add(tableTitle);

            for (int i = 0; i < orderDetails.size(); i++) {
                Paragraph lines = new Paragraph("______________________________________________________________________________", fontTableTitle);
                lines.setAlignment(Element.ALIGN_CENTER);
                document.add(lines);
                document.add(Chunk.NEWLINE);

                Paragraph productName = new Paragraph("Product Name : " + orderDetails.get(i).getProductName(), fontTableDetail);
                productName.setAlignment(Element.ALIGN_LEFT);
                document.add(productName);
                Paragraph productQty = new Paragraph("Product Qty : " + orderDetails.get(i).getProductQty(), fontTableDetail);
                productQty.setAlignment(Element.ALIGN_LEFT);
                document.add(productQty);
                Paragraph productPrice = new Paragraph("Product Price : $" + orderDetails.get(i).getOriginalPrice(), fontTableDetail);
                productPrice.setAlignment(Element.ALIGN_LEFT);
                document.add(productPrice);
                Paragraph discountRate = new Paragraph("Discount Rate : " + orderDetails.get(i).getDiscount() + "%", fontTableDetail);
                productPrice.setAlignment(Element.ALIGN_LEFT);
                document.add(discountRate);
                Paragraph netPrice = new Paragraph("Net Price : " + orderDetails.get(i).getNetPrice() + "%", fontTableDetail);
                productPrice.setAlignment(Element.ALIGN_LEFT);
                document.add(netPrice);

            }

            Paragraph linesEnd = new Paragraph("______________________________________________________________________________", fontTableTitle);
            linesEnd.setAlignment(Element.ALIGN_CENTER);
            document.add(linesEnd);

            Paragraph SubTotal = new Paragraph("Grand Total   $" + order.getNetPrice(), fontTableDetail);
            SubTotal.setAlignment(Element.ALIGN_RIGHT);
            document.add(SubTotal);
            Paragraph grandTotal = new Paragraph("Grand Total (Incl.Tax)   $" + order.getGrossPrice(), fontGrandTotal);
            grandTotal.setAlignment(Element.ALIGN_RIGHT);
            document.add(grandTotal);

            /*PdfPTable table = new PdfPTable(1);
            // Add PDF Table Header ->
            Stream.of("Invoice Number : " + order.getId())
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                        header.setBackgroundColor(BaseColor.LIGHT_GRAY);
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        header.setBorderWidth(2);
                        header.setPhrase(new Phrase(headerTitle, headFont));
                        table.addCell(header);
                    });


            PdfPCell idCell2 = new PdfPCell(new Phrase( "Transaction Number  : " + order.getTransactionNumber().toString()));
            idCell2.setPaddingLeft(4);
            idCell2.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell2.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell2);

            PdfPCell idCell3 = new PdfPCell(new Phrase( "Purchase Date       : " + order.getPurchaseDate().toString()));
            idCell3.setPaddingLeft(4);
            idCell3.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell3.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell3);

            PdfPCell idCell4 = new PdfPCell(new Phrase( "Customer Name       : " + order.getDaasUser().getFirstName() + " " + order.getDaasUser().getLastName()));
            idCell4.setPaddingLeft(4);
            idCell4.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell4.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell4);

            PdfPCell idCell5 = new PdfPCell(new Phrase( "Discount            : " + order.getDiscount()));
            idCell5.setPaddingLeft(4);
            idCell5.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell5.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell5);

            PdfPCell idCell6 = new PdfPCell(new Phrase( "Tax Applied         : " + order.getTax()));
            idCell6.setPaddingLeft(4);
            idCell6.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell6.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell6);

            PdfPCell idCell7 = new PdfPCell(new Phrase( "Net Price           : " + order.getNetPrice()));
            idCell7.setPaddingLeft(4);
            idCell7.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell7.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell7);

            PdfPCell idCell8 = new PdfPCell(new Phrase( "Gross Price         : " + order.getGrossPrice()));
            idCell8.setPaddingLeft(4);
            idCell8.setVerticalAlignment(Element.ALIGN_MIDDLE);
            idCell8.setHorizontalAlignment(Element.ALIGN_CENTER);
            table.addCell(idCell8);

            order.getOrderDetailList().forEach(orderDetail -> {
                PdfPCell idCell9 = new PdfPCell(new Phrase( "Product Name        : " + orderDetail.getProductName()));
                idCell9.setPaddingLeft(4);
                idCell9.setVerticalAlignment(Element.ALIGN_MIDDLE);
                idCell9.setHorizontalAlignment(Element.ALIGN_CENTER);
                table.addCell(idCell9);
            });

            document.add(table);*/

            document.close();
        } catch (DocumentException e) {
            LOG.error(e.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }


}
