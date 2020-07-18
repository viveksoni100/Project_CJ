package com.daas.components.ajax;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
public class AjaxResponse<E> extends BaseAjaxResponse {


    private boolean success;
    private String msg;
    private List<E> obj;


    public AjaxResponse() {
        this.msg = "Error";
        this.success = false;
        this.obj = new ArrayList<>();
    }



    public void success(String msg, List<E> obj) {
        this.success = true;
        this.msg = msg;
        this.obj = obj;
    }

    public void success(String msg) {
        this.success = true;
        this.msg = msg;
    }

    public void error(String msg) {
        this.msg = msg;
        this.success = false;
    }
    public void error(String msg, List<E> obj) {
        this.success = false;
        this.msg = msg;
        this.obj = obj;
    }
}
