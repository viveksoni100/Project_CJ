package com.daas.components.ajax;

import org.springframework.data.domain.Page;

public class AjaxPagingResponse<E> extends BaseAjaxResponse {


    public boolean status;

    public Page<E> data;


    public AjaxPagingResponse() {
        this.status = false;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Page<E> getData() {
        return data;
    }

    public void setData(Page<E> data) {
        this.data = data;
    }
}
