$(document).ready(function () {

    // animasi counter angka
    $(".counter").each(function () {
        let target = $(this).data("target");

        $(this).prop("Counter", 0).animate({
            Counter: target
        }, {
            duration: 3000,
            easing: "swing",
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

});