const nodemailer = require("nodemailer");

const { MY_EMAIL, MY_PASSWORD } = process.env

const sendEmail = async ({email, link, name}) => {

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            secure: true,
            port: 465,
            auth: {
                user: MY_EMAIL,
                pass: MY_PASSWORD,
            },
            tls: {
                rejectUnauthorized: true
            },
        });
        await transporter.sendMail({
            from: MY_EMAIL, 
            to: email, 
            subject: "Forgot password", 
            html: `<p> Hi ${name}.</p>
                <p> In order to create a new password, please <a href="${link}"> click here </a>. </p>
                <p>If you did not forget your password, please ignore this email. </p>`,
        });
        return 200
    } 
    catch (error) {
        console.log(error)
        return 400
    }
}

module.exports = { sendEmail }