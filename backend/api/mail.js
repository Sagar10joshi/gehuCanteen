import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})

async function sendOtp(email, otp) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD // Use the app password here
        }
    });

    let mailOptions = {
        from: 'OTP Service : GehuCanteen Bhimtal <coderjoshi15@gmail.com>',
        to: `${email}`,
        // to: 'joshisagar0596@gmail.com',
        subject: 'Your OTP for GehuCanteen Registration',
        //you can type your message here
        text: `Thank you for registering on GehuCanteen! Please use the OTP (One-Time Password) provided below:

Your OTP: ${otp}

This OTP will expire in [2 minutes]. Please enter it to verify your email address and activate your account.

Thank you for choosing GehuCanteen! `,
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export {sendOtp};
