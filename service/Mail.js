
const nodemailer = require('nodemailer');

async function sendMail(email, code) {
    let testEmailAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'reddred6789@gmail.com',
            pass: "whiskysilver550"
        }
    });

    let result = await transporter.sendMail({
        from: 'Администрация Mytest.com <reddred6789@gmail.com>',
        to: `${email}`,
        subject: "Подтверждение из сайта Mytest.com",
        text: "Вы изменяете данные",
        html: `Для подтверждения данных введите ${code}`
    });

    console.log(result);
}
module.exports = {
    sendMail
}
