$('#btn').click(
    function () {
        let valid = false;
        let name = $('#name');
        let email = $('#email');
        let phone = $('#phone');
        let message = $('#message');
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
            msg: message.val()
        };
        console.log(person);
        if(valid) {
            $.post("/mailSend", person);
            console.log('post')
        }
    }
);

