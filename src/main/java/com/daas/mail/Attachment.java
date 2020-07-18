package com.daas.mail;

import lombok.Getter;
import lombok.Setter;

import java.io.File;


@Getter
@Setter
public class Attachment {

    public Attachment(File file, String type, String contentType, String cid) {
        this.file = file;
        this.type = type;
        this.contentType = contentType;
        this.cid = cid;
    }



    public File file;

    public String type;

    public String contentType;

    public String cid;


}
