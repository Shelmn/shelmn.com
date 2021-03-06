let express = require('express');
let app = express();
let http = require('http').Server(app);
let fs = require('fs');
let nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
const Nexmo = require('nexmo');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(__dirname+'/main/css/bootstrap'));
app.use('/', express.static(__dirname+'/main/css/screens'));
app.use('/', express.static(__dirname+'/main/html'));
app.use('/', express.static(__dirname+'/main/html/mobile'));
app.use('/', express.static(__dirname+'/main/css'));
app.use('/', express.static(__dirname+'/main/css/mobile'));
app.use('/', express.static(__dirname+'/main/img'));
app.use('/', express.static(__dirname+'/main/js'));
app.get('/', function (req, res) {
    let user = req.header('user-agent');
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(user)) {
        res.sendFile(__dirname+'/main/html/mobile/mobile.html');
        console.log("mob");
    } else {
        console.log("ok");
        res.sendFile(__dirname+'/main/html/home.html');
    }
});
app.get('/download', function (req, res) {
    res.download("pic.png");
    console.log("downloading......")
});

app.post('/mailSend', function (req, res) {
    mailGet(req.body);
    phoneGet(req.body.phone, req.body.msg);
    console.log(req.body)
})
app.post('/confirm', function (req, res) {
    confirm(req.body);
    console.log(req.body)
})
app.post('/email', function (req, res) {
    email(req.body);
    console.log(req.body)
})
function email(obj) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shelmn.com@gmail.com',
            pass: 'pidargrb'
        }
    });

    let mailOptions = {
        from: 'shelmn',
        to: obj.text,
        subject: 'Message from shelmn.herokuapp.com',
        text: 'You enter this email: '+obj.text,
    };
    console.log("sended");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
}
function confirm(obj) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shelmn.com@gmail.com',
            pass: 'pidargrb'
        }
    });

    let mailOptions = {
        from: 'shelmn',
        to: obj.mail,
        subject: 'Message from shelmn.herokuapp.com',
        text: 'You enter this data: \n'+" Name: "+obj.name+"\n Phone: "+obj.phone+"\n Your tariff: "+obj.tariff,
    };
    console.log("sended");
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
}
function mailGet (obj) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shelmn.com@gmail.com',
                pass: 'pidargrb'
            }
        });

        let mailOptions = {
            from: 'shelmn',
            to: obj.mail,
            subject: 'Message from shelmn.herokuapp.com',
            text: 'You enter this data: \n'+" Name: "+obj.name+"\n Phone: "+obj.phone+"\n Message: "+obj.msg,
        };
        console.log("sended");
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        });
    };

function phoneGet(phone, msg) {
    const nexmo = new Nexmo({
        apiKey: '64d44bfc',
        apiSecret: '6RTUIdzVMIeTjq3B'
    });

    const from = "Shelmn";
    const to = phone;
    const text = "You text this text: "+msg+"\n";

    nexmo.message.sendSms(from, to, text, (error, response) => {
        if(error) {
            throw error;
        } else if(response.messages[0].status != '0') {
            console.error(response);
            throw 'Nexmo returned back a non-zero status';
        } else {
            console.log(response);
        }
    });
}

http.listen(process.env.PORT || 5000, () => console.log('server started on 5000 port'));