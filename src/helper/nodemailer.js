const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SERVICE_SMPT,
    auth: {
        user: process.env.MAIL_SMPT,
        pass: process.env.PASSWORD_SMPT,
    },
});

    const mailOptions = {
    from: process.env.MAIL_SMPT,
    to: options.email,
    subject: options.subject,
    text: options.message,
};

    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;