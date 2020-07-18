(function(){
    $("#cart").on("click", function() {
        /*console.log("cart on click is working...");*/
        $(".shopping-cart").fadeToggle( "fast");
        $.ajax({
            url: 'listShoppingCart'
        });
        /*console.log("ajax call thai bhai...");*/
    });
})();