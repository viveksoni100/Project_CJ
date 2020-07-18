package com.daas.entities.forms;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PdfPersonalNoteForm extends AbstractBaseForm {
    private String note;
    private String publicationsId;
}
