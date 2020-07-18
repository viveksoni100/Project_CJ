package com.daas.controllers.ajax;

import com.daas.components.ajax.AjaxResponse;
import com.daas.controllers.AbstractBaseController;
import com.daas.entities.forms.PdfMarkForm;
import com.daas.entities.pdf.PdfMark;
import com.daas.entities.publications.Publications;
import com.daas.entities.publications.PublicationsNote;
import com.daas.entities.user.SubUser;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.ConstraintViolation;
import java.util.Set;


@Controller
@RequestMapping(value = {"/ajax/suser"})
@PreAuthorize("hasRole('ROLE_SUBUSER')")
@CrossOrigin(value = "*")
public class AjaxSubuserController extends AbstractBaseController {

    public final static Logger LOG = LogManager.getLogger(AjaxSubuserController.class.getName());

    @PostMapping(value = {"/pdfmark"})
    @ResponseBody
    public AjaxResponse categoryForm(@RequestBody @ModelAttribute("pdfMarkForm") PdfMarkForm form) {
        AjaxResponse response = new AjaxResponse();
        try {
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(form.getPid()));
            PdfMark pdfMark;
            if ((pdfMark = pdfMarkRepository.findFirstByAnnotationId(form.getAnnotationId())) == null) {
                pdfMark = new PdfMark();
                pdfMark.setSubUser(userUtil.getCurrentSubuser());
            }

            //StringEscapeUtils.escapeHtml4(form.getNote());
            pdfMark.setPublications(publications);
            form.setPdfMark(pdfMark);
            if (form.getPositionX() != null && !form.getPositionX().trim().equalsIgnoreCase("")) {
                pdfMark.setMarkType((form.getMarkType().trim().equalsIgnoreCase("highlight")) ? "highlightnote" : "drawingnote");
            }
            pdfMarkRepository.save(pdfMark);
            response.success("Note updated");
        } catch (Exception e) {

        }
        return response;
    }


    @PostMapping(value = {"/pdfmark/delete"})
    @ResponseBody
    public AjaxResponse deleteMark(@RequestBody @ModelAttribute("pdfMarkForm") PdfMarkForm form) {
        AjaxResponse response = new AjaxResponse();
        try {
            PdfMark pdfMark = pdfMarkRepository.findFirstByAnnotationId(form.getAnnotationId());
            if (pdfMark.getSubUser().getId().equals(userUtil.getCurrentSubuser().getId())) {
                pdfMarkRepository.delete(pdfMark);
                response.success("Mark deleted");
            } else {
                response.error("You are not the owner of this mark. it has been deleted temporarily, it will reappear after reloading page.");
            }

        } catch (Exception e) {
            LOG.error("Error deleting note", e);
            response.error("System error. Try again later");
        }
        return response;
    }


    @GetMapping(value = {"/note/{pid}"})
    public String getNote(@PathVariable("pid") String pid, ModelMap model) {
        PublicationsNote publicationsNote = new PublicationsNote();
        try {
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(pid));
            SubUser currentSubUser = userUtil.getCurrentSubuser();
            PublicationsNote note = publicationsNoteRepository.findFirstByPublicationsAndSubUser(publications, currentSubUser);
            if (note != null) {
                publicationsNote = note;
            }
        } catch (Exception e) {

        }
        model.addAttribute("publicationsNote", publicationsNote);
        model.addAttribute("success", false);
        return "ajax/subuser/note";
    }

    @PostMapping(value = {"/note/submit/{pid}"})
    public String setNote(@ModelAttribute("publicationsNote") PublicationsNote publicationsNote, BindingResult result, @PathVariable("pid") String pid, ModelMap model) {
        Boolean success = false;
        try {
            Publications publications = publicationsRepository.findFirstById(pathVariableEncrypt.decryptId(pid));
            SubUser currentSubUser = userUtil.getCurrentSubuser();
            PublicationsNote note = publicationsNoteRepository.findFirstByPublicationsAndSubUser(publications, currentSubUser);
            if (note != null)
                publicationsNote.setId(note.getId());
            publicationsNote.setSubUser(currentSubUser);
            publicationsNote.setPublications(publications);

            Set<ConstraintViolation<PublicationsNote>> violations = validator.validate(publicationsNote);
            if (violations.size() > 0) {
                for (ConstraintViolation violation : violations) {
                    result.rejectValue(violation.getPropertyPath().toString(), "", violation.getMessage());
                }
                alerts.setError("required.fields.missing");
            } else {
                publicationsNoteRepository.save(publicationsNote);
                alerts.setSuccess("publication.create.success");
                success = true;
            }

        } catch (Exception e) {
            LOG.error("Error setting up note", e);
        }
        model.addAttribute("success", success);
        model.addAttribute("publicationsNote", publicationsNote);
        return "ajax/subuser/note";
    }




}
