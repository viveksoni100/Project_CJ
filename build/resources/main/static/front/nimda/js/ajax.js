var csrfParameter = $("meta[name='_csrf_parameter']").attr("content");
var csrfToken = $("meta[name='_csrf']").attr("content");
var csrfHeader = $("meta[name='_csrf_header']").attr("content");
var data = {};
var headers = {};
headers[csrfHeader] = csrfToken;

function ajaxGet(method, url, data, currentElement, loading) {
    if (jQuery.type(currentElement.data("before")) != "undefined") {
        callGlobalMethodUsingVariable(currentElement.data("before"), "", $(this));
    }
    $.ajax({
        type: "GET",
        dataType: currentElement.data("content-type"),
        url: BASE_URL + url,
        data: data,
        timeout: 100000,
        closeIcon: true,
        headers: headers,
        success: function (res) {
            if (jQuery.type(currentElement.data("replacecontent")) != "undefined") {
                $("#" + currentElement.data("replacediv")).html(res);
            }
            if (jQuery.type(currentElement.data("after")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
            }
        },
        error: function (e) {
            if (jQuery.type(currentElement.data("after")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("after"), e, currentElement);
            }
        },
        done: function (e) {
            if (jQuery.type(currentElement.data("after")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("after"), e, currentElement);
            }
        }
    });
}

function ajaxPost(method, url, data, currentElement, loading) {

    data['csrfParameter'] = $("meta[name='_csrf_parameter']").attr("content");
    data['csrfToken'] = $("meta[name='_csrf']").attr("content");
    data['csrfHeader'] = $("meta[name='_csrf_header']").attr("content");


    if (jQuery.type(currentElement.data("before")) != "undefined") {
        callGlobalMethodUsingVariable(currentElement.data("before"), "", "");
    }
    $.ajax({
        type: "POST",
        dataType: currentElement.data("content-type"),
        url: BASE_URL + url,
        data: data,
        closeIcon: true,
        timeout: 100000,
        headers: headers,
        success: function (res) {
            if (jQuery.type(currentElement.data("replacecontent")) != "undefined")
                $("#" + currentElement.data("replacediv")).html(res);
            if (jQuery.type(currentElement.data("after")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
            }

        },
        error: function (e) {

        },
        done: function (e) {

        }
    });
}

function ajaxGetForm(url, currentElement, loading) {


    $.confirm({
        title: currentElement.data("title"),
        icon: 'fa fa-pencil',
        columnClass: (currentElement.data("size") != "") ? currentElement.data("size") : "large",
        backgroundDismiss: false,
        closeIcon: true,
        content: "URL:" + BASE_URL + currentElement.data("url"),
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {

                    var cntnt = this;
                    this.showLoading();
                    $.ajax({
                        type: "POST",
                        /*contentType: "application/json",*/
                        dataType: 'html',
                        url: BASE_URL + currentElement.data("submiturl"),
                        data: this.$content.find('form').serialize(),
                        timeout: 100000,
                        headers: headers,
                        success: function (res) {
                            cntnt.hideLoading();
                            cntnt.setContent(res, true);
                            if (jQuery.type(currentElement.data("close")) != "undefined") {
                                callGlobalMethodUsingVariableClose(currentElement.data("close"), res, currentElement, cntnt);
                            }
                            if (jQuery.type(currentElement.data("after")) != "undefined") {
                                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
                            }
                            //$.alert("<div class='alert alert-success'>Saved!!!</div>");

                        },
                        error: function (e) {
                            cntnt.hideLoading();
                            cntnt.setContent(e.responseText, true);
                            console.log("ERROR: ", e);
                        },
                        done: function (e) {
                            cntnt.hideLoading();
                            console.log("DONE");
                        }
                    });
                    return false;
                }
            },
            close: function () {
                //window.location.href = BASE_URL + RELOAD_URL;
                location.reload();
            }
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            /*this.$content.find('.edit-inline-btcrate').on('keyup', function (e) {
                var finalMaxLimit = (parseFloat($(this).val().replace(/,/g, "")) * parseFloat(advertiseMax)) / parseFloat(advertiseRate);
                jc.$content.find('.edit-inline-maximum').val(Math.round(finalMaxLimit));
            });*/
            this.$content.find('form').on('submit', function (e) {

                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });
        }
    });


}

function callGlobalMethodUsingVariable(methodName, res, thisElement) {
    window[methodName].apply(null, [res, thisElement]);
}

function callGlobalMethodUsingVariableClose(methodName, res, thisElement, popup) {
    window[methodName].apply(null, [res, thisElement, popup]);
}

$(document).on("submit", ".no-submit", function (e) {
    e.preventDefault();
});


function confirmAjaxUrl(currentElement) {
    cnfbox = $.confirm({
        title: currentElement.data('title'),
        icon: 'fa fa-pencil',
        columnClass: (currentElement.data("size") != "") ? currentElement.data("size") : "large",
        backgroundDismiss: false,
        closeIcon: true,
        content: "URL:" + BASE_URL + currentElement.data("url"),
        buttons: {
            close: function () {
            }
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            /*this.$content.find('.edit-inline-btcrate').on('keyup', function (e) {
                var finalMaxLimit = (parseFloat($(this).val().replace(/,/g, "")) * parseFloat(advertiseMax)) / parseFloat(advertiseRate);
                jc.$content.find('.edit-inline-maximum').val(Math.round(finalMaxLimit));
            });*/
            /*this.$content.find('form').on('submit', function (e) {

                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });*/
            if (jQuery.type(currentElement.data("after")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("after"), "", currentElement);
            }
        },
        onClose: function () {
            // before the modal is hidden.
            if (jQuery.type(currentElement.data("pclose")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("pclose"), "", currentElement);
            }
        }
    });
}


function confirmAjaxSubmit(currentElement) {
    cnfbox = $.confirm({
        title: currentElement.data('title'),
        icon: 'fa fa-pencil',
        columnClass: (currentElement.data("size") != "") ? currentElement.data("size") : "large",
        backgroundDismiss: false,
        closeIcon: true,
        content: "URL:" + BASE_URL + currentElement.data("url"),
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {

                    var cntnt = this;
                    this.showLoading();
                    $.ajax({
                        type: "POST",
                        /*contentType: "application/json",*/
                        dataType: (currentElement.data("contenttype") != "") ? currentElement.data("contenttype") : "html",
                        url: BASE_URL + currentElement.data("submiturl"),
                        data: this.$content.find('form').serialize(),
                        timeout: 100000,
                        headers: headers,
                        success: function (res) {
                            cntnt.hideLoading();
                            cntnt.setContent(res, true);
                            if (jQuery.type(currentElement.data("after")) != "undefined") {
                                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
                            }
                            if (jQuery.type(currentElement.data("close")) != "undefined") {
                                callGlobalMethodUsingVariableClose(currentElement.data("close"), res, currentElement, cntnt);
                            }
                            //$.alert("<div class='alert alert-success'>Saved!!!</div>");

                        },
                        error: function (e) {
                            cntnt.hideLoading();
                            cntnt.setContent(e.responseText, true);
                            console.log("ERROR: ", e);
                            if (jQuery.type(currentElement.data("after")) != "undefined") {
                                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
                            }
                        },
                        done: function (e) {
                            cntnt.hideLoading();
                            console.log("DONE");
                            if (jQuery.type(currentElement.data("after")) != "undefined") {
                                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
                            }
                        }
                    });
                    return false;
                }
            },
            close: function () {
                //window.location.href = window.location.href;
                //location.reload();
                cnfbox.close();
            }
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            if (jQuery.type(currentElement.data("onload")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("onload"), "", currentElement);
            }
            /*this.$content.find('.edit-inline-btcrate').on('keyup', function (e) {
                var finalMaxLimit = (parseFloat($(this).val().replace(/,/g, "")) * parseFloat(advertiseMax)) / parseFloat(advertiseRate);
                jc.$content.find('.edit-inline-maximum').val(Math.round(finalMaxLimit));
            });*/
            /*this.$content.find('form').on('submit', function (e) {

                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });*/
            /* if (jQuery.type(currentElement.data("after")) != "undefined") {
                 callGlobalMethodUsingVariable(currentElement.data("after"), "", currentElement);
             }*/
        }
    });
}




function confirmAjaxSubmitNoButton(currentElement) {
    cnfbox = $.confirm({
        title: currentElement.data('title'),
        icon: 'fa fa-pencil',
        columnClass: (currentElement.data("size") != "") ? currentElement.data("size") : "large",
        backgroundDismiss: false,
        closeIcon: true,
        content: "URL:" + BASE_URL + currentElement.data("url"),
        buttons: {

            close: function () {
                //window.location.href = window.location.href;
                //location.reload();
                cnfbox.close();
            }
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            if (jQuery.type(currentElement.data("onload")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("onload"), "", currentElement);
            }
            /*this.$content.find('.edit-inline-btcrate').on('keyup', function (e) {
                var finalMaxLimit = (parseFloat($(this).val().replace(/,/g, "")) * parseFloat(advertiseMax)) / parseFloat(advertiseRate);
                jc.$content.find('.edit-inline-maximum').val(Math.round(finalMaxLimit));
            });*/
            /*this.$content.find('form').on('submit', function (e) {

                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });*/
            /* if (jQuery.type(currentElement.data("after")) != "undefined") {
                 callGlobalMethodUsingVariable(currentElement.data("after"), "", currentElement);
             }*/
        }
    });
}


function confirmAjaxSubmit1(currentElement) {
    cnfbox = $.confirm({
        title: currentElement.data('title'),
        icon: 'fa fa-pencil',
        columnClass: (currentElement.data("size") != "") ? currentElement.data("size") : "large",
        backgroundDismiss: false,
        closeIcon: true,
        content: "URL:" + BASE_URL + currentElement.data("url"),
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {

                    var cntnt = this;
                    this.showLoading();
                    $.ajax({
                        type: "POST",
                        /*contentType: "application/json",*/
                        dataType: (currentElement.data("contenttype") != "") ? currentElement.data("contenttype") : "html",
                        url: BASE_URL + currentElement.data("submiturl"),
                        data: this.$content.find('form').serialize(),
                        timeout: 100000,
                        headers: headers,
                        success: function (res) {
                            cntnt.hideLoading();
                            cntnt.setContent(res, true);
                            if (jQuery.type(currentElement.data("after")) != "undefined") {
                                callGlobalMethodUsingVariable(currentElement.data("after"), res, currentElement);
                            }
                            //$.alert("<div class='alert alert-success'>Saved!!!</div>");

                        },
                        error: function (e) {
                            cntnt.hideLoading();
                            cntnt.setContent(e.responseText, true);
                            console.log("ERROR: ", e);
                        },
                        done: function (e) {
                            cntnt.hideLoading();
                            console.log("DONE");
                        }
                    });
                    return false;
                }
            },
            close: function () {
                window.location.href = window.location.href;
                //location.reload();
            }
        },
        onContentReady: function () {
            // bind to events
            var jc = this;
            /*this.$content.find('.edit-inline-btcrate').on('keyup', function (e) {
                var finalMaxLimit = (parseFloat($(this).val().replace(/,/g, "")) * parseFloat(advertiseMax)) / parseFloat(advertiseRate);
                jc.$content.find('.edit-inline-maximum').val(Math.round(finalMaxLimit));
            });*/
            /*this.$content.find('form').on('submit', function (e) {

                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it
            });*/
            if (jQuery.type(currentElement.data("onload")) != "undefined") {
                callGlobalMethodUsingVariable(currentElement.data("onload"), "", currentElement);
            }
        }
    });
}

$.fn.toggleCheck = function () {
    if (this.tagName === 'INPUT') {
        $(this).prop('checked', !($(this).is(':checked')));
    }

};

$(document).on("click", ".alphabet a", function (e) {
    $(".alphabet a").removeClass("active");
    $(this).addClass("active");
});


function closeConfirmPopup(params, currentElement, popup) {
    var parsed = $.parseHTML(params);
    var el = $(parsed).find("#closepopup");
    if (el.val() == "true") {
        popup.close();
        return true;
    }
    return false;
}

function closeConfirmPopupWithAlert(params, currentElement, popup) {
    var parsed = $.parseHTML(params);
    var el = $(parsed).find("#closepopup");
    if (el.val() == "true") {
        popup.close();
        $.alert({
            title: false,
            content: "<div class='alert alert-success'>Data saved</div>",
            buttons: {
                ok: {
                    btnClass: 'btn-primary',
                    action: function () {
                        if (jQuery.type(currentElement.data("reload")) != "undefined") {
                            window.location.href=window.location.href;
                        }
                    }
                },
            }
        });
        return true;
    }
    return false;
}
function closeConfirmPopupWithAlertMessage(params, currentElement, popup, msg, type) {
    msg = currentElement.data("msg");
    console.log(msg);
    if (type=="html") {
        var parsed = $.parseHTML(params);
        var el = $(parsed).find("#closepopup");
        if (el.val() == "true") {
            popup.close();
            $.alert({
                title: false,
                content: "<div class='alert alert-success'>" + msg + "</div>",
                buttons: {
                    ok: {
                        btnClass: 'btn-primary',
                        action: function () {
                            if (jQuery.type(currentElement.data("reload")) != "undefined") {
                                window.location.href = window.location.href;
                            }
                        }
                    },
                }
            });
            return true;
        }
        return false;
    }else{

        if (params.success) {

            $.alert({
                title: false,
                content: "<div class='alert alert-success'>" + msg + "</div>",
                buttons: {
                    ok: {
                        btnClass: 'btn-primary',
                        action: function () {
                            if (jQuery.type(currentElement.data("reload")) != "undefined") {
                                window.location.href = window.location.href;
                            }
                        }
                    },
                }
            });
            popup.close();

            return true;
        }
        return false;
    }


}
function reloadPage(){
    window.location.href=window.location.href;
}