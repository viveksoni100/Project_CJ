
function printInvoice(container) {
    html2canvas($(container)[0], {allowTaint: true}).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png", 1.0);
        console.log(imgData);
        console.log($(container).data("url"));
        var data = {};
        data['image'] = imgData;
        // var divToPrint = document.getElementById("badge-html");
        newWin = window.open();
        //newWin.document.write(divToPrint.outerHTML);
        var windowContent = '<!DOCTYPE html>';
        windowContent += '<html>'
        windowContent += '<head><title>Print canvas</title></head>';
        windowContent += '<body>'
        windowContent += '<img src="' + imgData + '">';
        windowContent += '</body>';
        windowContent += '</html>';
        newWin.document.write(windowContent);
        //console.log(newWin);
        setTimeout(function () {
            newWin.print();
        }, 2000);

        //newWin.close();

        //ajaxPost("POST", $(container).data("url"), data, $(container), false);
    });

}