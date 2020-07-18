package com.daas.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.daas.entities.pdf.PdfMark;
import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsCategory;
import com.daas.entities.user.SubUser;
import com.daas.utilities.singleton.CommonUtil;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.FileNameMap;
import java.net.URLConnection;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Controller
@RequestMapping(value = {"/subuser"})
@PreAuthorize(value = "hasRole('ROLE_SUBUSER')")
public class SubuserController extends AbstractBaseController {

    public final static Logger LOG = LogManager.getLogger(SubuserController.class.getName());

    @GetMapping(value = {"/publications/{id}"})
    public String home(@PathVariable("id") String id, ModelMap model, HttpServletRequest request) {
        String pdfMarkList = "";
        byte[] bt = null;
        Integer pageNo = 1;
        try {
            SubUser subUser = userUtil.getCurrentSubuser();

            if (subUser == null) {
                return "401";
            }
            pageNo = (request.getParameter("pageNo") != null && CommonUtil.isDouble(request.getParameter("pageNo"))) ? CommonUtil.strToDouble(request.getParameter("pageNo")).intValue() : 1;
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            ObjectMapper mapper = new ObjectMapper();
            Set<PdfMark> pdfMarks = pdfMarkRepository.publicationsListBySubUser(true, publications, subUser.getParentUser(), subUser);
            if (pdfMarks != null && pdfMarks.size() > 0) {
                pdfMarkList = mapper.writeValueAsString(pdfMarks);
                //pdfMarkList = pdfMarkList.replace("\\\"", "\"");
                //pdfMarkList = StringEscapeUtils.escapeHtml4(pdfMarkList);
            }
            model.addAttribute("publications", publications);
        } catch (Exception e) {

        }
        model.addAttribute("pid", id);
        model.addAttribute("pageNo", pageNo);
        model.addAttribute("pdfMarks", pdfMarkList);

        return "pdf";
    }

    @GetMapping(value = {"/publications/toc/{id}"})
    public void toc(@PathVariable("id") String id, ModelMap model, HttpServletRequest request,  HttpServletResponse response) {

        Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
        if (publications != null) {
            Path file = Paths.get(environment.getProperty("publication.path.toc") + "/" + publications.getLabelPublicationUploadToc());
            FileNameMap fileNameMap = URLConnection.getFileNameMap();
            String ftype = fileNameMap.getContentTypeFor(environment.getProperty("publication.path.toc") + "/" + publications.getLabelPublicationUploadToc());
            response.addHeader("Content-Type", ftype);
            response.addHeader("Content-Disposition", "inline; filename=" + publications.getLabelPublicationUploadToc());
            try {
                Files.copy(file, response.getOutputStream());
                response.getOutputStream().flush();
            } catch (IOException ex) {
                LOG.error("Error gettign document ", ex);
            } catch (Exception e) {
                LOG.error("Error gettign document ", e);
            }
        } else {
            LOG.error("Error getting documnet ");
        }


        /*Integer pageNo = 1;
        try {
            SubUser subUser = userUtil.getCurrentSubuser();

            if (subUser == null) {
                return "401";
            }
            pageNo = (request.getParameter("pageNo") != null && CommonUtil.isDouble(request.getParameter("pageNo"))) ? CommonUtil.strToDouble(request.getParameter("pageNo")).intValue() : 1;
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            publications.getLabelPublicationUploadToc();
            model.addAttribute("publications", publications);
            // environment.getProperty("publication.path.toc") + publications.getLabelPublicationUploadToc();
            model.addAttribute("tocFilePath", environment.getProperty("publication.path.toc") + publications.getLabelPublicationUploadToc());
        } catch (Exception e) {

        }
        model.addAttribute("pid", id);
        model.addAttribute("pageNo", pageNo);
        return "404";*/
    }

    @GetMapping(value = {"/publications/tocdetail/{id}"})
    public void toc(@PathVariable("id") String id, ModelMap model, HttpServletRequest request) {

        HttpServletResponse response = null;
        /*Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (publications != null) {
                Path file = Paths.get(environment.getProperty("publication.path.thumb") + "/" + publications.getLabelPublicationThumbnail());
                FileNameMap fileNameMap = URLConnection.getFileNameMap();
                String ftype = fileNameMap.getContentTypeFor(environment.getProperty("publication.path.thumb") + "/" + publications.getLabelPublicationThumbnail());
                response.addHeader("Content-Type", ftype);
                response.addHeader("Content-Disposition", "inline; filename=" + publications.getLabelPublicationThumbnail());
                try {
                    Files.copy(file, response.getOutputStream());
                    response.getOutputStream().flush();
                } catch (IOException ex) {
                    LOG.error("Error gettign document ", ex);
                } catch (Exception e) {
                    LOG.error("Error gettign document ", e);
                }
            } else {
                LOG.error("Error getting documnet ");
            }*/
        try {

            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (publications != null) {
                Path file = Paths.get(environment.getProperty("publication.path.toc") + "/" + publications.getLabelPublicationUploadToc());
                FileNameMap fileNameMap = URLConnection.getFileNameMap();
                String ftype = fileNameMap.getContentTypeFor(environment.getProperty("publication.path.toc") + "/" + publications.getLabelPublicationUploadToc());
                response.addHeader("Content-Type", ftype);
                response.addHeader("Content-Disposition", "inline; filename=" + publications.getLabelPublicationUploadToc());

                List<Path> imageFiles = new ArrayList<>();
                try (final PDDocument document = PDDocument.load(new File(environment.getProperty("publication.path.toc") + publications.getLabelPublicationUploadToc()))){
                    PDFRenderer pdfRenderer = new PDFRenderer(document);
                    for (int page = 0; page < document.getNumberOfPages(); ++page)
                    {
                        BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 300, ImageType.RGB);
                        String fileName = "/tmp/" + "image-" + publications.getLabelPublicationUploadToc() + page + ".png";
                        ImageIOUtil.writeImage(bim, fileName, 300);
                        imageFiles.add(Paths.get(fileName));
                    }
                } catch (IOException e){
                    System.err.println("Exception while trying to create pdf document - " + e);
                }

                ServletOutputStream outputStream = response.getOutputStream();

                try {
                    for (Path imageFile : imageFiles) {


                        try {
                            Files.copy(imageFile, response.getOutputStream());
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                    //Files.copy(file, response.getOutputStream());
                    response.getOutputStream().flush();
                } catch (IOException ex) {
                    LOG.error("Error gettign document ", ex);
                } catch (Exception e) {
                    LOG.error("Error gettign document ", e);
                }
            } else {
                LOG.error("Error getting documnet ");
            }
        } catch (Exception e) {
            LOG.error("Error while displaying toc details ", e);
        }
    }

    @GetMapping(value = {"/publications/list", "/publications/list/{id}"})
    public String publications(
            @PathVariable Optional<String> id,
            @PageableDefault(page = 0, size = 9, sort = "createdAt", direction = Sort.Direction.ASC) Pageable pageable,
            HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes) {
        String ret = "books/publications";
        try {
            Page<Publications> publications;
            if (id.isPresent()) {
                List<PublicationsCategory> categories = new ArrayList<>();
                PublicationsCategory category = publicationsCategoryRepository.findFirstById(pathVariableEncrypt.decryptId(id.get()));
                categories.add(category);
                publications = publicationsRepository.findAllByCategoriesInAndStatusAndPublicationTitleLike(categories, true, "%", pageable);
                model.addAttribute("pagingUrl", "/ajax/suser/paging/publications/" + id.get());
            } else {
                publications = publicationsRepository.findAllByPublicationTitleLikeAndStatus("%", true, pageable);
                model.addAttribute("pagingUrl", "/ajax/suser/paging/publications");
            }
            model.addAttribute("publications", publications);

            model.addAttribute("pageable", pageable);
        } catch (Exception e) {


        }
        return ret;
    }


    @GetMapping(value = {"/publications/pdf/{id}"})
    public void getPdf(@PathVariable("id") String id, ModelMap model, HttpServletResponse response, HttpServletRequest request) {

        try {

            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));

            if (publications != null) {
                Path file = Paths.get(environment.getProperty("publication.path.image") + "/" + publications.getLabelPublicationOriginalImage());
                FileNameMap fileNameMap = URLConnection.getFileNameMap();
                String ftype = fileNameMap.getContentTypeFor(environment.getProperty("publication.path.image") + "/" + publications.getLabelPublicationOriginalImage());
                response.addHeader("Content-Type", ftype);
                String type = (request.getParameter("type") != null) ? request.getParameter("type") : "inline";
                response.addHeader("Content-Disposition", type + "; filename=" + publications.getLabelPublicationOriginalImage());
                try {
                    Files.copy(file, response.getOutputStream());
                    response.getOutputStream().flush();
                } catch (IOException ex) {
                    LOG.error("Error gettign document ", ex);
                } catch (Exception e) {
                    LOG.error("Error gettign document ", e);
                }
            } else {
                LOG.error("Error getting document ");
            }
        } catch (Exception e) {
            LOG.error("Error getting visitor image ", e);
        }
    }

    @GetMapping(value = {"/publications/img/{id}"})
    public void getImg(@PathVariable("id") String id, ModelMap model, HttpServletResponse response) {
        try {

            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(id));
            if (publications != null) {
                Path file = Paths.get(environment.getProperty("publication.path.thumb") + "/" + publications.getLabelPublicationThumbnail());
                FileNameMap fileNameMap = URLConnection.getFileNameMap();
                String ftype = fileNameMap.getContentTypeFor(environment.getProperty("publication.path.thumb") + "/" + publications.getLabelPublicationThumbnail());
                response.addHeader("Content-Type", ftype);
                response.addHeader("Content-Disposition", "inline; filename=" + publications.getLabelPublicationThumbnail());
                try {
                    Files.copy(file, response.getOutputStream());
                    response.getOutputStream().flush();
                } catch (IOException ex) {
                    LOG.error("Error gettign document ", ex);
                } catch (Exception e) {
                    LOG.error("Error gettign document ", e);
                }
            } else {
                LOG.error("Error getting documnet ");
            }
        } catch (Exception e) {
            LOG.error("Error getting visitor image ", e);
        }
    }
}
