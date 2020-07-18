package com.daas.utilities;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import com.lowagie.text.DocumentException;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

@Component
public class PdfGenaratorUtil {

    @Autowired
    private TemplateEngine templateEngine;

    public void createPdf(String templateName, Map map, String orderId, Map orderMap, Map userMap, Map productDetailsMap, HttpServletResponse response, Map flagApiMap) throws Exception {
        System.out.println("inside out...");

        response.setContentType("application/pdf;");
        String fileName = "GTD_Invoice_" + orderId;
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ".pdf");

        Assert.notNull(templateName, "The templateName can not be null");
        Context ctx = new Context();
        if (map != null) {
            Iterator itMap = map.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }
        if (orderMap != null) {
            Iterator itMap = orderMap.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }
        if (userMap != null) {
            Iterator itMap = userMap.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }
        if (productDetailsMap != null) {
            Iterator itMap = productDetailsMap.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }
        if (flagApiMap != null) {
            Iterator itMap = flagApiMap.entrySet().iterator();
            while (itMap.hasNext()) {
                Map.Entry pair = (Map.Entry) itMap.next();
                ctx.setVariable(pair.getKey().toString(), pair.getValue());
            }
        }

        /*reportContent = processedHtml*/

        String processedHtml = templateEngine.process(templateName, ctx);

        ServletOutputStream sos = null;
        FileOutputStream os = null;

        try {

            /*String home = System.getProperty("user.home");
            final File outputFile = new File(home+"/Downloads/" + fileName + ".pdf");
            outputFile.createNewFile();
            os = new FileOutputStream(outputFile);*/

            sos = response.getOutputStream();

            ITextRenderer renderer = new ITextRenderer();
            renderer.setDocumentFromString(processedHtml);
            renderer.layout();
            /*renderer.createPDF(os, false);*/
            renderer.createPDF(sos);
            renderer.finishPDF();
            System.out.println("PDF created successfully");

        } finally {
            if (sos != null) {
                try {
                    sos.close();
                } catch (IOException e) { /*ignore*/ }
            }
        }
        System.out.println("outside in...");
    }
}
