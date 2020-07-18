package com.daas.entities.forms;

import com.daas.entities.pdf.PdfMark;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class PdfMarkForm extends AbstractBaseForm {


    @NotEmpty
    @NotBlank
    private String annotationId;

    private String markType;

    private String note;

    private String selectionInfo;

    private String hasSelection = "false";

    private String color;

    private String positionX;

    private String positionY;

    private String width;

    private String height;

    private String pageIndex;

    private String collapsed = "false";

    private String displayFormat;

    private String pid;

    private String WA;

    private String UF;

    private String RD;

    private String FB;

    private String TA;

    private String YA;


    private String selectionText;

    private String points;


    private String pageHeight;

    public void setPdfMark(PdfMark pdfMark) {
        pdfMark.setAnnotationId(this.annotationId);
        pdfMark.setCollapsed((this.collapsed != null && this.collapsed.equalsIgnoreCase("true")) ? true : false);
        pdfMark.setWidth(this.width);
        pdfMark.setHeight(this.height);
        pdfMark.setColor(this.color);
        pdfMark.setDisplayFormat(this.displayFormat);
        pdfMark.setHasSelection((this.hasSelection != null && this.hasSelection.equalsIgnoreCase("true")) ? true : false);
        pdfMark.setMarkType(this.markType);
        pdfMark.setNote((this.note != null && !this.note.trim().equalsIgnoreCase("")) ? this.note : " ");
        pdfMark.setPositionX(this.positionX);
        pdfMark.setPositionY(this.positionY);
        pdfMark.setPageIndex(this.pageIndex);
        pdfMark.setSelectionInfo(this.selectionInfo);
        pdfMark.setYA(this.YA);
        pdfMark.setTA(this.TA);
        pdfMark.setUF(this.UF);
        pdfMark.setFB(this.FB);
        pdfMark.setRD(this.RD);
        pdfMark.setWA(this.WA);
        pdfMark.setPoints(this.points);
        pdfMark.setPageHeight(this.pageHeight);
        pdfMark.setSelectionText(this.selectionText);
    }
}
