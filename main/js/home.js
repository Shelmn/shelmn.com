$(document).ready(function() {
    $(".block1__body__btn_a").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 1000);
        return false;
    });
    $(".sitemap").click(function() {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        var nav = $(".nav");
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 2000);
        return false;
    });
    $(".block1__header__nav__borderedLink").click(function() {
        var elementClick = $(this).attr("href");
        var btn = $('.block7__btnContainer__btn');
        btn.hide();
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 2300);
        setTimeout(
            function () {
                btn.show("fast");
            },2400
        );
        return false;
    });
    let tariff = "";
    $('.block6__body__priceBlock__price_basic').click(function () {
        $('.modal_tariff').text("BASIC");
        $('.modal_price').text("$199");
        tariff = "BASIC ($199/month)";
    });
    $('.block6__body__priceBlock__price_plus').click(function () {
        $('.modal_tariff').text("PLUS");
        $('.modal_price').text("$399");
        tariff = "PLUS ($399/month)";
    });
    $('.block6__body__priceBlock__price_premium').click(function () {
        $('.modal_tariff').text("PREMIUM");
        $('.modal_price').text("$699");
        tariff = "PREMIUM ($699/month)";
    });
    $("#confirm").click(function () {
        let valid = false;
        let name = $('#name');
        let email = $('#email');
        let phone = $('#phone');
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let regPhone = /^[0-9\-\+]{9,15}$/;
        if (name.val().length < 2) {
            name.css("border-color","red");
            valid = false;
        } else {
            name.css("border-color","#c1d3d2");
            valid = true;
        }
        if (regEmail.test(email.val())) {
            email.css("border-color","#c1d3d2");
            valid = true;
        } else {
            email.css("border-color","red");
            valid = false;
        }
        if (regPhone.test(phone.val())) {
            phone.css("border-color","#c1d3d2");
            valid = true;
        } else {
            phone.css("border-color","red");
            valid = false;
        }
        let person = {
            name: name.val(),
            mail: email.val(),
            phone: phone.val(),
            tariff: tariff
        };
        if(valid) {
                $.post("/confirm", person);
                console.log('post')
        }
    });
    $('#bottom_input_btn').click(
        function () {
            let success = false;
            let email = $('#bottom_input');
            let text = email.val();
            let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (regEmail.test(text)) {
                email.css("border","none");
                success = true;
            } else {
                email.css("border","1px solid red");
                success = false;
            }
            let obj = {
                text: text
            };
            if (success) {
                $.post("/email", obj);
                console.log(obj)
            }
        }
    );
});
