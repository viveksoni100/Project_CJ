function appendLog(val) {
    jQuery("#txt_eventlog").val(val + '\n' + jQuery("#txt_eventlog").val());
}

jQuery(function () {
    /**
     * Handles the event of external links getting clicked in the document.
     *
     * @example onExternalLinkClicked("http://www.google.com")
     *
     * @param String link
     */
    jQuery('#documentViewer').bind('onExternalLinkClicked', function (e, link) {

        window.open(link, '_flowpaper_exturl');
    });

    /**
     * Recieves progress information about the document being loaded
     *
     * @example onProgress( 100,10000 );
     *
     * @param int loaded
     * @param int total
     */
    jQuery('#documentViewer').bind('onProgress', function (e, loadedBytes, totalBytes) {

    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('#documentViewer').bind('onDocumentLoading', function (e) {

    });

    /**
     * Handles the event of a document is in progress of loading
     *
     */
    jQuery('#documentViewer').bind('onPageLoading', function (e, pageNumber) {
    });

    /**
     * Receives messages about the current page being changed
     *
     * @example onCurrentPageChanged( 10 );
     *
     * @param int pagenum
     */
    jQuery('#documentViewer').bind('onCurrentPageChanged', function (e, pagenum) {
        $("#currentPage").val(pagenum);
    });

    /**
     * Receives messages about the document being loaded
     *
     * @example onDocumentLoaded( 20 );
     *
     * @param int totalPages
     */
    jQuery('#documentViewer').bind('onDocumentLoaded', function (e, totalPages) {
        chainOfMethods();

    });

    /**
     * Receives messages about the page loaded
     *
     * @example onPageLoaded( 1 );
     *
     * @param int pageNumber
     */
    jQuery('#documentViewer').bind('onPageLoaded', function (e, pageNumber) {
    });

    /**
     * Receives messages about the page loaded
     *
     * @example onErrorLoadingPage( 1 );
     *
     * @param int pageNumber
     */
    jQuery('#documentViewer').bind('onErrorLoadingPage', function (e, pageNumber) {

    });

    /**
     * Receives error messages when a document is not loading properly
     *
     * @example onDocumentLoadedError( "Network error" );
     *
     * @param String errorMessage
     */
    jQuery('#documentViewer').bind('onDocumentLoadedError', function (e, errMessage) {

    });

    /**
     * Receives error messages when a document has finished printed
     *
     * @example onDocumentPrinted();
     *
     */
    jQuery('#documentViewer').bind('onDocumentPrinted', function (e) {

    });

    /**
     * Handles the event of annotations getting clicked.
     *
     * @example onMarkClicked(object)
     *
     * @param Object mark that was clicked
     */
    jQuery('#documentViewer').bind('onMarkClicked', function (e, mark) {

    });

    /**
     * Handles the event of annotations getting clicked.
     *
     * @example onMarkCreated(object)
     *
     * @param Object mark that was created
     */
    jQuery('#documentViewer').bind('onMarkCreated', function (e, mark) {

        createMark(e, mark);

    });

    /**
     * Handles the event of annotations getting clicked.
     *
     * @example onMarkDeleted(object)
     *
     * @param Object mark that was deleted
     */
    jQuery('#documentViewer').bind('onMarkDeleted', function (e, mark) {
        console.log("onMarkDeleted");
        deleteMark(e, mark);
    });

    /**
     * Handles the event of annotations getting clicked.
     *
     * @example onMarkChanged(object)
     *
     * @param Object mark that was changed
     */
    jQuery('#documentViewer').bind('onMarkChanged', function (e, mark) {
        console.log("onMarkChanged");
        createMark(e, mark);
    });

    /**
     * Handles the event of a pdf requiring a password
     *
     * @example onPasswordNeeded(updatePassword,reason)
     *
     * @param updatePassword callback function for setting the password
     */
    jQuery('#documentViewer').bind('onPasswordNeeded', function (e, updatePassword) {
        console.log("onPasswordNeeded");
    });


    jQuery('#documentViewer').bind('onSelectedMarkChanged', function (e, mark) {
        console.log("onSelectedMarkChanged");
        console.log(mark);
        //appendLog('onSelectedMarkChanged:' + mark);
    });

});


function chainOfMethods() {
    var viewer = $FlowPaper('documentViewer');
    var jsonString = $("#jsonString").html();
    if (jsonString == "")
        return;

    var jsonObj = JSON.parse(unescape(jsonString));

    $.each(jsonObj, function (key, data) {

        //console.log(key);
        switch (data.markType) {
            case "note":
                viewer.addMark({
                    type: 'note',
                    note: htmlDecode(data.note),
                    id: data.annotationId,
                    positionX: data.positionX,
                    positionY: data.positionY,
                    width: data.width,
                    height: data.height,
                    pageIndex: data.pageIndex,
                    collapsed: data.collapsed,
                    displayFormat: 'html'
                });
                break;
            case "drawing":
                viewer.addMark({
                    type: 'drawing',
                    selection_info: data.selectionInfo,
                    has_selection: data.hasSelection,
                    color: data.color,
                    id: data.annotationId,
                    note: htmlDecode(data.note),
                    positionX: data.positionX,
                    positionY: data.positionY,
                    width: data.width,
                    height: data.height,
                    pageIndex: data.pageIndex,
                    collapsed: data.collapsed,
                    displayFormat: 'html',
                    Rd: data.RD,
                    Uf: data.UF,
                    Wa: data.WA,
                    ya: data.YA,
                    ta: data.TA,
                    fb: data.FB,
                    selection_text: data.selectionText,
                    points: data.points,
                    pageHeight: data.pageHeight

                });
                break;

            case "strikeout":
                viewer.addMark({
                    type: 'strikeout',
                    selection_info: data.selectionInfo,
                    has_selection: data.hasSelection,
                    color: data.color,
                    id: data.annotationId,
                    note: htmlDecode(data.note),
                    positionX: data.positionX,
                    positionY: data.positionY,
                    width: data.width,
                    height: data.height,
                    pageIndex: data.pageIndex,
                    collapsed: data.collapsed,
                    displayFormat: 'html',
                    Rd: data.RD,
                    Uf: data.UF,
                    Wa: data.WA,
                    ya: data.YA,
                    ta: data.TA,
                    fb: data.FB,
                    selection_text: data.selectionText,
                    points: data.points,
                    pageHeight: data.pageHeight

                });
                break;
            case "highlight":
                viewer.addMark({
                    type: 'highlight',
                    selection_info: data.selectionInfo,
                    has_selection: data.hasSelection,
                    color: data.color,
                    id: data.annotationId
                });
                break;

            case "highlightnote":
                viewer.addMark({
                    type: 'highlight',
                    selection_info: data.selectionInfo,
                    has_selection: data.hasSelection,
                    color: data.color,
                    id: data.annotationId,
                    note: htmlDecode(data.note),
                    positionX: data.positionX,
                    positionY: data.positionY,
                    width: data.width,
                    height: data.height,
                    pageIndex: data.pageIndex,
                    collapsed: data.collapsed,
                    displayFormat: 'html',
                    Rd: data.RD,
                    Uf: data.UF,
                    Wa: data.WA,
                    ya: data.YA,
                    ta: data.TA,
                    fb: data.FB,
                    selection_text: data.selectionText,
                    points: data.points,
                    pageHeight: data.pageHeight
                });
                break;

            case "drawingnote":
                viewer.addMark({
                    type: 'drawing',
                    selection_info: data.selectionInfo,
                    has_selection: data.hasSelection,
                    color: data.color,
                    id: data.annotationId,
                    note: htmlDecode(data.note),
                    positionX: data.positionX,
                    positionY: data.positionY,
                    width: data.width,
                    height: data.height,
                    pageIndex: data.pageIndex,
                    collapsed: data.collapsed,
                    displayFormat: 'html',
                    Rd: data.RD,
                    Uf: data.UF,
                    Wa: data.WA,
                    ya: data.YA,
                    ta: data.TA,
                    fb: data.FB,
                    selection_text: data.selectionText,
                    points: data.points,
                    pageHeight: data.pageHeight

                });
                break;
        }

    })

}

function stringEscape(s) {
    return s ? s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/[\x00-\x1F\x80-\x9F]/g, hex) : s;

    function hex(c) {
        var v = '0' + c.charCodeAt(0).toString(16);
        return '\\x' + v.substr(v.length - 2);
    }
}

function markPosted(params, currentElement) {
    //alert(params.msg);
}

function markDeleted(params, currentElement) {
    if (!params.success) {
        $.alert({
            title: false,
            content: "<div class='alert alert-danger'>" + params.msg + "</div>",
            buttons: {
                ok: {
                    btnClass: 'btn-primary',
                    action: function () {
                        window.location.href = BASE_URL + '/subuser/publications/' + $("#pid").val() + "?pageNo=" + $("#currentPage").val();
                    }
                },
            }
        });

    }else{
        $.alert("<div class='alert alert-success'>Mark deleted</div>");
    }
}

function htmlDecode(input) {
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes[0].nodeValue;
}

function createMark(e, mark) {

    var currentElement = $("#sendPdfMark");
    setFormValues(e, mark);
    ajaxPost("POST", "/ajax/suser/pdfmark", $("#pdfMarkForm").serialize(), currentElement, false);
    console.log(mark);
}


function deleteMark(e, mark) {

    var currentElement = $("#sendPdfMarkDelete");
    setFormValues(e, mark);
    ajaxPost("POST", "/ajax/suser/pdfmark/delete", $("#pdfMarkForm").serialize(), currentElement, false);
    console.log(mark);
}


function setFormValues(e, mark) {
    $("#annotationId").val(mark.id);
    $("#markType").val(mark.type);
    $("#note").val(mark.note);
    $("#height").val(mark.height);
    $("#selectionInfo").val(mark.selection_info);
    $("#hasSelection").val(mark.has_selection);
    $("#color").val(mark.color);
    $("#positionX").val(mark.positionX);
    $("#positionY").val(mark.positionY);
    $("#width").val(mark.width);
    $("#pageIndex").val(mark.pageIndex);
    $("#displayFormat").val(mark.displayFormat);
    $("#collapsed").val(mark.collapsed);

    $("#WA").val(mark.Wa);
    $("#RD").val(mark.Rd);
    $("#UF").val(mark.Uf);
    $("#FB").val(mark.fb);
    $("#TA").val(mark.ta);
    $("#YA").val(mark.ya);
    $("#points").val(mark.points);
    $("#selectionText").val(mark.selection_text);
    $("#pageHeight").val(mark.pageHeight);
}


$(document).on("click", ".createnote", function (e) {
    confirmAjaxSubmit($(this));
});

function noteUpdated(params, currentElement, popup) {
    var parsed = $.parseHTML(params);
    var el = $(parsed).find("#closepopup");
    if (el.val() == "true") {
        popup.close();
        $.alert("<div class='alert alert-success'>" + currentElement.data("msg") + "</div>");
    }
}