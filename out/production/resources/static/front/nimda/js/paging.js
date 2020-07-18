$(document).on('click', '.page-alpha, .page-link, .page-sort', function (e) {
    e.preventDefault();
    paging(e, $(this));
});
$(document).on('submit', '.paging', function (e) {
    e.preventDefault();
    paging(e, $(this));
});
$(document).on('change', '.size', function (e) {
    e.preventDefault();
    paging(e, $(this));
});

function paging(event, ele) {
    var csrfParameter = $("meta[name='_csrf_parameter']").attr("content");
    var csrfToken = $("meta[name='_csrf']").attr("content");
    var csrfHeader = $("meta[name='_csrf_header']").attr("content");
    var data = {};
    var headers = {};
    var page = 0;
    var sort = "";
    var dir = "asc";
    var alpha = "";
    var size = $("#size").val();
    var currentEle = ele;
    var currentPage = parseInt($(".current-page-id").val());
    var totalPages = parseInt($(".total-pages").val());
    if (ele.hasClass("page-link")) {
        page = ele.data('page') - 1;
    }

    if (ele.hasClass("paging")) {
        page = 0;
    }
    if (ele.hasClass("page-alpha")) {
        alpha = ele.data('alphabet');
        $(".current-page-id").val(parseInt(ele.data('page')) - 1);
    }
    if (ele.hasClass("prev-page")) {
        if (totalPages == currentPage) {
            page = currentPage - 2;
        } else {
            page = currentPage - 1;
        }

        if (page < 0)
            return false;
        $(".current-page-id").val(currentPage - 1);
    } else if (ele.hasClass("next-page")) {
        page = currentPage + 1;

        if (totalPages - 1 <= currentPage) {
            return false;
        }
        $(".current-page-id").val(currentPage + 1);

    } else {
        $(".current-page-id").val(parseInt(ele.data('page')) - 1);
    }

    var s = false;
    var d;
    var sf = "";
    if (ele.hasClass("page-sort")) {
        s = true;
        sort = ele.data('sort');
        dir = ele.data("dir");
        if (ele.data("dir").toLowerCase() == "asc") {
            ele.data("dir", "desc");
            d = "up";
        } else {
            ele.data("dir", "asc");
            d = "down";
        }
        sf = ele.text().trim();

    }
    // data[csrfParameter] = csrfToken;
    //console.log($('#' + ele.data("formname")).serialize());
    headers[csrfHeader] = csrfToken;
    $.ajax({
        type: "GET",
        dataType: 'html',
        url: BASE_URL + ele.data("baseurl"),
        data: $('#' + ele.data("formname")).serialize() + "&alpha=" + alpha + "&page=" + page + "&sort=" + sort + "," + dir + "&size=" + size,
        timeout: 100000,
        headers: headers,
        success: function (res) {
            //$("#" + currentEle.data('replacediv')).html($(res).find("tbody").html());
            $("#" + currentEle.data('replacediv')).html(res);
            if (s)
                $(".page-sort:contains('" + sf + "')").addClass("fa fa-arrow-" + d);

        },
        error: function (e) {
            $("#" + currentEle.data('replacediv')).html("<div class='alert-danger alert'>Error fetching data</div>");
        },
        done: function (e) {
            $("#" + currentEle.data('replacediv')).html(res);
        }
    });
}


function refreshGrid() {
    $(".page-item-1").click();
}